// Server-side Firebase initialization for data fetching on the main page
import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

// Initialize Firebase Admin for server-side data fetching
function getFirebaseAdminApp() {
  const apps = getApps()

  if (!apps.length) {
    // Check if we have the service account credentials
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      console.warn("Firebase Admin SDK not initialized: FIREBASE_SERVICE_ACCOUNT_KEY not found")
      return null
    }

    try {
      // Parse the service account JSON
      const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64").toString())

      // Initialize the app with limited scope for data fetching
      return initializeApp(
        {
          credential: cert(serviceAccount),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        },
        "serverApp",
      )
    } catch (error) {
      console.error("Error initializing Firebase Admin for server:", error)
      return null
    }
  }

  // Return the existing app
  return apps.find((app) => app.name === "serverApp") || apps[0]
}

// Get the Firebase Admin app
const adminApp = getFirebaseAdminApp()

// Export Firestore for server-side data fetching
export const serverDb = adminApp ? getFirestore(adminApp) : null

// Function to fetch CV data from Firestore on the server
export async function fetchCVDataFromServer() {
  if (!serverDb) {
    console.warn("Server Firestore not initialized, cannot fetch CV data")
    return null
  }

  try {
    // Query the cv-sections collection, ordered by the 'order' field
    const sectionsSnapshot = await serverDb.collection("cv-sections").orderBy("order", "asc").get()

    if (sectionsSnapshot.empty) {
      console.log("No CV data found in Firestore")
      return []
    }

    const sections = []

    // Process each section document
    for (const sectionDoc of sectionsSnapshot.docs) {
      const sectionData = sectionDoc.data()

      // Query the details subcollection for this section
      const detailsSnapshot = await serverDb
        .collection(`cv-sections/${sectionDoc.id}/details`)
        .orderBy("order", "asc")
        .get()

      const details = detailsSnapshot.docs.map((detailDoc) => {
        return detailDoc.data()
      })

      // Add the section with its details to our array
      sections.push({
        id: sectionDoc.id,
        title: sectionData.title,
        description: sectionData.description,
        order: sectionData.order,
        details: details,
      })
    }

    return sections
  } catch (error) {
    console.error("Error fetching CV data from server:", error)
    return null
  }
}
