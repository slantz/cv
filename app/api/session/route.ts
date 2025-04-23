import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { createSessionCookie, verifyIdToken } from "@/lib/firebase-admin"

// Create a session cookie from an ID token
export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    if (!idToken) {
      return NextResponse.json({ error: "ID token is required" }, { status: 400 })
    }

    // Verify the ID token
    const decodedToken = await verifyIdToken(idToken)

    // Create a session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await createSessionCookie(idToken, expiresIn)

    // Set the session cookie
    cookies().set("__session", sessionCookie, {
      maxAge: expiresIn / 1000, // Convert to seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating session:", error)
    return NextResponse.json({ error: "Failed to create session" }, { status: 401 })
  }
}

// Delete the session cookie
export async function DELETE() {
  cookies().delete("__session")
  return NextResponse.json({ success: true })
}
