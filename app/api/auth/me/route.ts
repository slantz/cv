import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { adminAuth, verifySessionCookie, isAuthorizedAdmin } from "@/lib/firebase-admin"

export async function GET(request: NextRequest) {
  try {
    // Get the session cookie
    const sessionCookie = (await cookies()).get("__session")?.value

    if (!sessionCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify the session cookie
    const decodedClaims = await verifySessionCookie(sessionCookie)

    if (!decodedClaims) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    // Get the user data
    if (!adminAuth) {
      return NextResponse.json({ error: "Firebase Admin Auth is not initialized" }, { status: 500 })
    }

    const user = await adminAuth.getUser(decodedClaims.uid)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if the user is an admin
    const isAdmin = await isAuthorizedAdmin(decodedClaims.uid)

    // Return the user data and admin status
    return NextResponse.json({
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      isAdmin,
    })
  } catch (error) {
    console.error("Error getting user data:", error)
    return NextResponse.json({ error: "Failed to get user data" }, { status: 500 })
  }
}
