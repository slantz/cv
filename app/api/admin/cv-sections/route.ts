import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAdminDB, verifySessionCookie, isAuthorizedAdmin } from "@/lib/firebase-admin"

// GET handler to fetch all CV sections
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const sessionCookie = (await cookies()).get("__session")?.value
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decodedClaims = await verifySessionCookie(sessionCookie)
    if (!decodedClaims) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const isAdmin = await isAuthorizedAdmin(decodedClaims.uid)
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const adminDB = getAdminDB();

    // Fetch CV sections
    if (!adminDB) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 })
    }

    const sectionsSnapshot = await adminDB.collection("cv-sections").orderBy("order", "asc").get()

    const sections = []

    // Process each section document
    for (const sectionDoc of sectionsSnapshot.docs) {
      const sectionData = sectionDoc.data()

      // Query the details subcollection for this section
      const detailsSnapshot = await adminDB
        .collection(`cv-sections/${sectionDoc.id}/details`)
        .orderBy("order", "asc")
        .get()

      const details = detailsSnapshot.docs.map((detailDoc) => {
        return {
          id: detailDoc.id,
          ...detailDoc.data(),
        }
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

    return NextResponse.json(sections)
  } catch (error) {
    console.error("Error fetching CV sections:", error)
    return NextResponse.json({ error: "Failed to fetch CV sections" }, { status: 500 })
  }
}

// POST handler to add a new CV section
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const sessionCookie = (await cookies()).get("__session")?.value
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decodedClaims = await verifySessionCookie(sessionCookie)
    if (!decodedClaims) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const isAdmin = await isAuthorizedAdmin(decodedClaims.uid)
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const adminDB = getAdminDB();

    // Add new CV section
    if (!adminDB) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 })
    }

    const data = await request.json()

    // Validate data
    if (!data.title || !data.description || data.order === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Add the section document
    const sectionRef = await adminDB.collection("cv-sections").add({
      title: data.title,
      description: data.description,
      order: Number(data.order),
    })

    // Add each detail as a subdocument
    if (data.details && Array.isArray(data.details)) {
      for (const [index, detail] of data.details.entries()) {
        await adminDB
          .collection(`cv-sections/${sectionRef.id}/details`)
          .doc(`detail-${index}`)
          .set({
            title: detail.title,
            description: detail.description,
            tags: detail.tags || [],
            order: index,
          })
      }
    }

    return NextResponse.json({
      success: true,
      id: sectionRef.id,
    })
  } catch (error) {
    console.error("Error adding CV section:", error)
    return NextResponse.json({ error: "Failed to add CV section" }, { status: 500 })
  }
}
