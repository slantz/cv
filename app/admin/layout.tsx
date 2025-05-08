"use client"

import type React from "react"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If auth is loaded and user is not an admin, redirect to unauthorized page
    if (!isLoading && user && !isAdmin) {
      router.push("/auth/unauthorized")
    }

    // If auth is loaded and user is not logged in, redirect to login page
    if (!isLoading && !user) {
      router.push("/auth/login?from=/admin")
    }
  }, [user, isLoading, isAdmin, router])

  // Show loading state while checking auth
  if (isLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent mb-4" />
          <p>Verifying admin access...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
