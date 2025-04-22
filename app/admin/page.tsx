"use client"

import { FirebaseAdmin } from "@/components/firebase-admin"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">CV Website Admin</h1>
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
  │       │   └── order: number`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Click the "+" button in the bottom right to add a new section</li>
            <li>Fill in the section details including title, description, and order</li>
            <li>Add one or more detail items for each section</li>
            <li>For each detail, provide a title, description, and optional tags</li>
            <li>Click "Save Section" to add the section to your CV</li>
          </ol>
        </div>
      </div>

      <FirebaseAdmin />
    </div>
  )
}
