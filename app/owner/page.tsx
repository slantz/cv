"use client"

import { useState, useEffect } from "react"
import { Mail, User, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signOut } from "@/lib/firebase-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type {GithubUser} from "@/types/core";

export default function AdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<GithubUser | null>(null)

  useEffect(() => {
    // Check if user is authenticated and admin
    const checkAuth = async () => {
      try {
        // First check if user is logged in
        const authResponse = await fetch("/api/auth/me")
        if (!authResponse.ok) {
          router.push("/auth/login?from=/owner")
          return
        }

        const userData = await authResponse.json()
        setUser(userData.user)

        if (!userData.isAdmin) {
          router.push("/auth/unauthorized")
          return
        }

        setIsAdmin(true)
      } catch (err) {
        console.error("Auth check error:", err)
        router.push("/auth/login?from=/owner")
      }
    }

    checkAuth()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // If not yet verified as admin, show loading
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent mb-4" />
          <p>Verifying admin access...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">CV Website Admin</h1>
            <Link href="/">
              <Button variant="outline" size="sm" className="ml-4">
                <Home className="h-4 w-4 mr-2" />
                Back to Website
              </Button>
            </Link>
          </div>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL || "/placeholder.svg"}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.displayName}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Website
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500 focus:text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <p className="text-gray-300 mb-8">
          Use this page to manage your CV content. Add sections and details that will be displayed on your website.
        </p>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Firebase Structure</h2>
          <p className="text-gray-400 mb-4">
            Your CV data is stored in Firebase Firestore with the following structure:
          </p>

          <div className="bg-gray-900 p-4 rounded border border-gray-700 font-mono text-sm overflow-x-auto">
            <pre>
              {`cv-data/
  ├── about/
  │   ├── title: string
  │   ├── description: string
  │   ├── subtitle: { major, duration, years }
  │   ├── achievements: Array<{ text: string }>
  │   ├── contact: Array<{ title, type, value, tracking?, link? }>
  │   ├── languages: Array<{ name, proficiency, level }>
  │   ├── skills: Array<{ key, order, level, details }>
  │   ├── social:
  │   │   ├── github: { link: { type, value, link }, tracking }
  │   │   ├── linkedin: { ... }
  │   │   ├── medium: { ... }
  │   │   ├── stackOverflow: { ... }
  │   │   ├── discord: { ... }
  │   │   └── telegram: { ... }
  │   └── meta: { order, title, subtitle }

  ├── education/
  │   ├── meta: { order, title, subtitle }
  │   └── data: Array<EssaySection>

  ├── employment/
  │   ├── meta: { order, title, subtitle }
  │   └── data: Array<EssaySection>

  ├── projects/
  │   ├── meta: { order, title, subtitle }
  │   └── data: Array<EssaySection>

  ├── own-projects/
  │   ├── meta: { order, title, subtitle }
  │   └── data: Array<EssaySection>

  └── publications/
      ├── meta: { order, title, subtitle }
      └── data: Array<EssaySection>

contact-messages/
  ├── {messageId}/
  │   ├── name: string
  │   ├── email: string
  │   ├── subject: string
  │   ├── message: string
  │   ├── timestamp: timestamp
  │   └── read: boolean
`}
            </pre>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link href="/owner/contact-messages" className="block">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500/50 transition-colors group">
              <div className="bg-cyan-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-900/30 transition-colors">
                <Mail className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Contact Messages</h3>
              <p className="text-gray-400">View and manage messages from visitors who used your contact form</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
