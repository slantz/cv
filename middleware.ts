// This file runs on the server, so it's okay to import firebase-admin here
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifySessionCookie, isAuthorizedAdmin } from "@/lib/firebase-admin"

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // If it's not an admin path, don't do anything
  if (!path.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Get the Firebase Auth session cookie
  const sessionCookie = request.cookies.get("__session")?.value

  // If there's no session, redirect to the auth page
  if (!sessionCookie) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("from", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  try {
    // Verify the session cookie
    const decodedClaims = await verifySessionCookie(sessionCookie)

    if (!decodedClaims) {
      // Invalid session, redirect to login
      const url = new URL("/auth/login", request.url)
      url.searchParams.set("from", encodeURI(request.url))
      return NextResponse.redirect(url)
    }

    // Check if the user is authorized to access admin pages
    const isAdmin = await isAuthorizedAdmin(decodedClaims.uid)

    if (!isAdmin) {
      // User is not an admin, redirect to unauthorized page
      return NextResponse.redirect(new URL("/auth/unauthorized", request.url))
    }

    // User is authenticated and authorized, allow the request
    return NextResponse.next()
  } catch (error) {
    console.error("Error in middleware:", error)

    // Error verifying session, redirect to login
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("from", encodeURI(request.url))
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
