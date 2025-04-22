"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { collection, addDoc, doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Portal } from "@/components/ui/portal"
import { X, Plus, Save, Trash } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// This is a simple admin component for adding data to Firebase
// In a real application, you would want to secure this with authentication
export function FirebaseAdmin() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

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
      // Add the section document
      const sectionRef = await addDoc(collection(db, "cv-sections"), {
        title: sectionData.title,
        description: sectionData.description,
        order: Number(sectionData.order),
      })

      // Add each detail as a subdocument
      for (const [index, detail] of details.entries()) {
        await setDoc(doc(db, `cv-sections/${sectionRef.id}/details`, `detail-${index}`), {
          title: detail.title,
          description: detail.description,
          tags: detail.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          order: index,
        })
      }

      // Reset form
      setSectionData({
        title: "",
        description: "",
        order: 0,
      })
      setDetails([
        {
          title: "",
          description: "",
          tags: "",
          order: 0,
        },
      ])

      setMessage({
        type: "success",
        text: "Section added successfully!",
      })

      // Refresh the page to show the new data
      router.refresh()
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

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add CV Section</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Add CV Section</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {message && (
                    <div
                      className={`p-4 rounded-lg ${
                        message.type === "success" ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"
                      }`}
                    >
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
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}
