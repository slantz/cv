import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const blockedPatterns = [
  // WordPress & common CMS files
  "/wp-",
  "/xmlrpc.php",
  "/cms",
  "/admin",
  "/wp-admin",
  "/wp-login.php",
  "/blog",
  "/wordpress",
  "/typo3",
  "/drupal",
  "/joomla",

  // Vulnerability scanners & paths
  "/.env",
  "/.git",
  "/.htaccess",
  "/config",
  "/phpmyadmin",
  "/server-status",
  "/vendor",
  "/backup",

  // Additional aggressive bot targets
  "/shop",
  "/web",
  "/webmail",
  "/mail",
  "/test",
  "/old",
  "/wp1/",
  "/wp2/",
  "/cms/wp-",
  "/cms/wp-includes/",
  "/web/wp-",
  "/2020",
  "/2021",
  "/2019",

  // Known scanning file types and filenames
  "wlwmanifest.xml",
  "license.txt",
  ".bak",
  ".old",
  ".sql",
  ".ini",
  ".cfg",
  ".log",
  ".env",
]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase()

  const isBlocked = blockedPatterns.some((pattern) =>
    pathname.includes(pattern)
  )

  if (isBlocked) {
    // Return unusual status code to deter bots
    const statusCode = pathname.includes("wp-") ? 451 : 418
    return new NextResponse(statusCode === 418 ? "🫖" : "Nope.", {
      status: statusCode,
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"]
}
