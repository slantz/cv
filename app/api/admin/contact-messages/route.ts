import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAdminDB, verifySessionCookie, isAuthorizedAdmin } from "@/lib/firebase-admin"

// GET handler to fetch all contact messages
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

    // Fetch contact messages
    if (!adminDB) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 })
    }

    const messagesSnapshot = await adminDB.collection("contact-messages").orderBy("timestamp", "desc").get()

    const messages = messagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return NextResponse.json({ error: "Failed to fetch contact messages" }, { status: 500 })
  }
}

// PATCH handler to update a contact message (e.g., mark as read)
export async function PATCH(request: NextRequest) {
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

    // Update contact message
    if (!adminDB) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 })
    }

    const data = await request.json()

    // Validate data
    if (!data.id) {
      return NextResponse.json({ error: "Missing message ID" }, { status: 400 })
    }

    // Update the message
    await adminDB
      .collection("contact-messages")
      .doc(data.id)
      .update({
        read: data.read === undefined ? true : data.read,
        ...data.updates,
      })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating contact message:", error)
    return NextResponse.json({ error: "Failed to update contact message" }, { status: 500 })
  }
}

// DELETE handler to delete a contact message
export async function DELETE(request: NextRequest) {
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

    // Delete contact message
    if (!adminDB) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 })
    }

    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing message ID" }, { status: 400 })
    }

    // Delete the message
    await adminDB.collection("contact-messages").doc(id).delete()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting contact message:", error)
    return NextResponse.json({ error: "Failed to delete contact message" }, { status: 500 })
  }
}
