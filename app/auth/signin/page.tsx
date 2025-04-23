"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Github, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/"
  const error = searchParams?.get("error") || ""

  const handleSignIn = async () => {
    setIsLoading(true)
    await signIn("github", { callbackUrl })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <Github className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-gray-400 max-w-sm">
                Sign in with your GitHub account to access the admin dashboard. Only authorized GitHub accounts can
                access this area.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                {error === "AccessDenied"
                  ? "Access denied. Your GitHub account is not authorized to access this area."
                  : "An error occurred during sign in. Please try again."}
              </div>
            )}

            <Button
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Github className="mr-2 h-5 w-5" />
                  <span>Sign in with GitHub</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
