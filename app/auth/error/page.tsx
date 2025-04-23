"use client"

import { useSearchParams } from "next/navigation"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams?.get("error") || "Unknown error"

  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to access this resource.",
    Verification: "The verification link may have been used or is invalid.",
    Default: "An unexpected error occurred during authentication.",
  }

  const errorMessage = errorMessages[error] || errorMessages.Default

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
              <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center mb-4 border border-red-500/30">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Authentication Error</h1>
              <p className="text-gray-400">{errorMessage}</p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300">
              <p className="font-medium mb-2">Error Code: {error}</p>
              <p>
                If you believe this is a mistake, please contact the site administrator or try signing in again later.
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg inline-flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
