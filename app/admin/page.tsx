"use client"

import { FirebaseAdmin } from "@/components/firebase-admin"
import { Mail, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-context"

export default function AdminPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">CV Website Admin</h1>
          {user && (
            <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
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
              {`cv-sections/
  ├── {sectionId}/
  │   ├── title: string
  │   ├── description: string
  │   ├── order: number
  │   └── details/
  │       ├── {detailId}/
  │       │   ├── title: string
  │       │   ├── description: string
  │       │   ├── tags: string[]
  │       │   └── order: number
  
contact-messages/
  ├── {messageId}/
  │   ├── name: string
  │   ├── email: string
  │   ├── subject: string
  │   ├── message: string
  │   ├── timestamp: timestamp
  │   └── read: boolean`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Click the "+" button in the bottom right to add a new section</li>
            <li>Fill in the section details including title, description, and order</li>
            <li>Add one or more detail items for each section</li>
            <li>For each detail, provide a title, description, and optional tags</li>
            <li>Click "Save Section" to add the section to your CV</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link href="/admin/contact-messages" className="block">
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

      <FirebaseAdmin />
    </div>
  )
}
