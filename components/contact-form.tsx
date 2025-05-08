"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, CheckCircle, AlertCircle, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Portal } from "@/components/ui/portal"
import { event } from "@/lib/analytics"

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

type FormStatus = "idle" | "submitting" | "success" | "error"

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")
    setErrorMessage("")

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error("Please fill in all required fields.")
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address.")
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Something went wrong. Please try again.")
      }

      event({
        action: "contact_form_submit",
        category: "engagement",
        label: "Contact Form Submission",
      })

      setFormStatus("success")

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setFormStatus("idle")
        onClose()
      }, 10000)
    } catch (error) {
      console.error("Error submitting contact form:", error)
      setFormStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred.")

      event({
        action: "contact_form_error",
        category: "error",
        label: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && formStatus !== "submitting") {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 pointer-events-none" />

              <div className="relative p-6">
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
                    disabled={formStatus === "submitting"}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>

                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-cyan-900/40 flex items-center justify-center mb-4 border border-cyan-500/30">
                    <Send className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">Get in Touch</h2>
                  <p className="text-gray-400 text-sm">Send me a message and I'll get back to you soon</p>
                </div>

                {formStatus === "success" ? (
                  <div className="flex flex-col items-center py-6">
                    <div className="w-16 h-16 rounded-full bg-green-900/20 flex items-center justify-center mb-4 border border-green-500/30">
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 text-center">
                      Thank you for reaching out. I'll respond to your message as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                          disabled={formStatus === "submitting"}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your Email *"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                          disabled={formStatus === "submitting"}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Input
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                          disabled={formStatus === "submitting"}
                        />
                      </div>

                      <div className="space-y-2">
                        <Textarea
                          name="message"
                          placeholder="Your Message *"
                          value={formData.message}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20 min-h-[120px]"
                          disabled={formStatus === "submitting"}
                          required
                        />
                      </div>

                      {formStatus === "error" && (
                        <div className="flex items-center text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{errorMessage || "An error occurred. Please try again."}</span>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                        disabled={formStatus === "submitting"}
                      >
                        {formStatus === "submitting" ? (
                          <span className="flex items-center justify-center">
                            <Loader className="animate-spin mr-2 h-4 w-4" />
                            <span>Sending...</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center text-white">
                            <Send className="mr-2 h-4 w-4" />
                            <span>Send Message</span>
                          </span>
                        )}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">* Required fields</p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  )
}
