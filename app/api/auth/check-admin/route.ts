import { type NextRequest, NextResponse } from "next/server"
import { verifyIdToken, isAuthorizedAdmin } from "@/lib/firebase-admin"

export async function GET(request: NextRequest) {
  try {
    // Get the ID token from the Authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const idToken = authHeader.split("Bearer ")[1]

    // Verify the ID token
    const decodedToken = await verifyIdToken(idToken)

    // Check if the user is an admin
    const admin = await isAuthorizedAdmin(decodedToken.uid)

    return NextResponse.json({ isAdmin: admin })
  } catch (error) {
    console.error("Error checking admin status:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
