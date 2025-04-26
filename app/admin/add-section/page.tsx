"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Save, Trash, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function AddSectionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | "warning"; text: string } | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // Form data for a new section
  const [sectionData, setSectionData] = useState({
    title: "",
    description: "",
    order: 0,
  })

  // Form data for details
  const [details, setDetails] = useState([
    {
      title: "",
      description: "",
      tags: "",
      order: 0,
    },
  ])

  useEffect(() => {
    // Check if user is authenticated and admin
    const checkAuth = async () => {
      try {
        // First check if user is logged in
        const authResponse = await fetch("/api/auth/me")
        if (!authResponse.ok) {
          router.push("/auth/login?from=/admin/add-section")
          return
        }

        const userData = await authResponse.json()

        if (!userData.isAdmin) {
          router.push("/auth/unauthorized")
          return
        }

        setIsAdmin(true)
      } catch (err) {
        console.error("Auth check error:", err)
        router.push("/auth/login?from=/admin/add-section")
      }
    }

    checkAuth()
  }, [router])

  const addDetail = () => {
    setDetails([
      ...details,
      {
        title: "",
        description: "",
        tags: "",
        order: details.length,
      },
    ])
  }

  const removeDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index))
  }

  const updateDetail = (index: number, field: string, value: string) => {
    const newDetails = [...details]
    newDetails[index] = { ...newDetails[index], [field]: value }
    setDetails(newDetails)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    setMessage(null)

    try {
      // Prepare the data
      const formattedDetails = details.map((detail) => ({
        title: detail.title,
        description: detail.description,
        tags: detail.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        order: Number(detail.order),
      }))

      // Send the data to the API
      const response = await fetch("/api/admin/cv-sections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: sectionData.title,
          description: sectionData.description,
          order: Number(sectionData.order),
          details: formattedDetails,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to add section: ${response.statusText}`)
      }

      setMessage({
        type: "success",
        text: "Section added successfully!",
      })

      // Redirect back to admin page after successful submission
      setTimeout(() => {
        router.push("/admin")
      }, 1500)
    } catch (error) {
      console.error("Error adding section:", error)
      setMessage({
        type: "error",
        text: "Failed to add section. Please try again.",
      })
    } finally {
      setIsLoading(false)
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
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">Add CV Section</h1>
          <p className="text-gray-300">Create a new section for your CV</p>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {message && (
              <div
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  message.type === "success"
                    ? "bg-green-900/20 text-green-400"
                    : message.type === "warning"
                      ? "bg-yellow-900/20 text-yellow-400"
                      : "bg-red-900/20 text-red-400"
                }`}
              >
                {message.type === "warning" && <AlertTriangle className="h-5 w-5 flex-shrink-0" />}
                {message.text}
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Section Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-gray-300">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={sectionData.title}
                    onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="order" className="text-sm font-medium text-gray-300">
                    Order
                  </label>
                  <Input
                    id="order"
                    type="number"
                    value={sectionData.order}
                    onChange={(e) => setSectionData({ ...sectionData, order: Number.parseInt(e.target.value) })}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-300">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={sectionData.description}
                  onChange={(e) => setSectionData({ ...sectionData, description: e.target.value })}
                  required
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Details</h3>
                <Button type="button" variant="outline" size="sm" onClick={addDetail}>
                  <Plus className="h-4 w-4 mr-1" /> Add Detail
                </Button>
              </div>

              {details.map((detail, index) => (
                <div key={index} className="p-4 border border-gray-800 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-300">Detail {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDetail(index)}
                      disabled={details.length === 1}
                    >
                      <Trash className="h-4 w-4 text-red-400" />
                      <span className="sr-only">Remove Detail</span>
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor={`detail-${index}-title`} className="text-sm font-medium text-gray-300">
                      Title
                    </label>
                    <Input
                      id={`detail-${index}-title`}
                      value={detail.title}
                      onChange={(e) => updateDetail(index, "title", e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor={`detail-${index}-description`} className="text-sm font-medium text-gray-300">
                      Description
                    </label>
                    <Textarea
                      id={`detail-${index}-description`}
                      value={detail.description}
                      onChange={(e) => updateDetail(index, "description", e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor={`detail-${index}-tags`} className="text-sm font-medium text-gray-300">
                      Tags (comma separated)
                    </label>
                    <Input
                      id={`detail-${index}-tags`}
                      value={detail.tags}
                      onChange={(e) => updateDetail(index, "tags", e.target.value)}
                      placeholder="React, TypeScript, Web3"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-purple-500 to-pink-600">
                {isLoading ? (
                  <span className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Section
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
