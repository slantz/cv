import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { getAdminAuth } from "@/lib/firebase-admin"

// We need to store not secure cookie when developing locally with a production build, otherwise infinite redirect login loop is guaranteed.
function isLocalhost(req: NextRequest) {
  const host = req.headers.get("host") || ""
  return host.startsWith("localhost") || host.startsWith("192.168.") || host.startsWith("127.0.0.1")
}

// Create a session cookie from an ID token
export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    if (!idToken) {
      return NextResponse.json({ error: "ID token is required" }, { status: 400 })
    }

    const adminAuth = getAdminAuth();

    // Verify the ID token
    if (!adminAuth) {
      return NextResponse.json({ error: "Firebase Admin Auth is not initialized" }, { status: 500 })
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken)

    // Create a session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })
    const responseCookies = await cookies();

    // Set the session cookie
    responseCookies.set("__session", sessionCookie, {
      maxAge: expiresIn / 1000, // Convert to seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" && (request.headers.get("x-forwarded-proto") === "https" || request.url.startsWith("https://")),
      path: "/",
      sameSite: "lax",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating session:", error)
    return NextResponse.json({ error: "Failed to create session" }, { status: 401 })
  }
}

export async function DELETE() {
  (await cookies()).delete("__session")
  return NextResponse.json({ success: true })
}
