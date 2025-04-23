"use client"

import { ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/firebase-auth"
import { useRouter } from "next/navigation"

export default function Unauthorized() {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
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
              <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center mb-4 border border-red-500/30">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
              <p className="text-gray-400">
                Your GitHub account is not authorized to access the admin area. Please contact the site administrator.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={handleSignOut} variant="destructive">
                Sign Out
              </Button>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
