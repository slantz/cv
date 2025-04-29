import "server-only";

import {cert, getApps, initializeApp} from "firebase-admin/app"
import {getFirestore} from "firebase-admin/firestore"
import {getAuth} from "firebase-admin/auth"

export function getFirebaseAdminApp() {
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

      // Initialize the app with full admin capabilities
      const app = initializeApp(
        {
          credential: cert(serviceAccount),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        },
        "cvAdminApp",
      )

      console.log("Firebase Admin SDK initialized successfully")
      return app
    } catch (error) {
      console.error("Error initializing Firebase Admin SDK:", error)
      return null
    }
  }

  // Return the existing admin app
  const app = apps.find((app) => app.name === "cvAdminApp") || apps[0]
  console.log("Using existing Firebase Admin app:", app.name)
  return app
}

// Export Firestore and Auth if admin app is initialized
export const getAdminDB = () => {
  const adminApp = getFirebaseAdminApp();
  return adminApp ? getFirestore(adminApp) : null;
}

export const getAdminAuth = () => {
  const adminApp = getFirebaseAdminApp();
  return adminApp ? getAuth(adminApp) : null
}

// Verify a Firebase ID token and return the decoded token
export async function verifyIdToken(token: string) {
  const adminAuth = getAdminAuth();

  if (!adminAuth) {
    throw new Error("Firebase Admin Auth is not initialized")
  }

  try {
    return await adminAuth.verifyIdToken(token)
  } catch (error) {
    console.error("Error verifying ID token:", error)
    throw error
  }
}

// Verify a session cookie
export async function verifySessionCookie(sessionCookie: string) {
  const adminAuth = getAdminAuth();

  if (!adminAuth) {
    throw new Error("Firebase Admin Auth is not initialized")
  }

  try {
    return await adminAuth.verifySessionCookie(sessionCookie, true)
  } catch (error) {
    console.error("Error verifying session cookie:", error)
    return null
  }
}

// Check if a user is authorized to access admin pages
export async function isAuthorizedAdmin(uid: string) {
  const adminDB = getAdminDB();

  if (!adminDB) {
    throw new Error("Firebase Admin Firestore is not initialized")
  }

  // In development mode, allow all authenticated users
  if (process.env.NODE_ENV === "development") {
    console.log("Development mode: Allowing all authenticated users")
    return true
  }

  try {
    // First check if the user's UID matches the allowed GitHub ID
    if (process.env.ALLOWED_GITHUB_ID === uid) {
      return true
    }

    // Then check the admins collection in Firestore
    const adminDoc = await adminDB.collection("admins").doc(uid).get()
    return adminDoc.exists
  } catch (error) {
    console.error("Error checking admin authorization:", error)
    return false
  }
}
