"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash, Mail, MailOpen, ArrowLeft, AlertTriangle, Loader } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {formatFirestoreTimestampDate} from "@/lib/utils";
import type {FirestoreContactMessage} from "@/types/core";

export default function ContactMessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<FirestoreContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<FirestoreContactMessage | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is authenticated and admin
    const checkAuth = async () => {
      try {
        // First check if user is logged in
        const authResponse = await fetch("/api/auth/me")
        if (!authResponse.ok) {
          router.push("/auth/login?from=/owner/contact-messages")
          return
        }

        const userData = await authResponse.json()

        if (!userData.isAdmin) {
          router.push("/auth/unauthorized")
          return
        }

        setIsAdmin(true)

        // Now fetch messages
        await fetchMessages()
      } catch (err) {
        console.error("Auth check error:", err)
        router.push("/auth/login?from=/owner/contact-messages")
      }
    }

    checkAuth()
  }, [router])

  const fetchMessages = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/contact-messages")

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`)
      }

      const data = await response.json()
      setMessages(data)
    } catch (err) {
      console.error("Error fetching messages:", err)
      setError("Failed to load messages. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch("/api/admin/contact-messages", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          read: true,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update message")
      }

      // Update local state
      setMessages(messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)))

      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, read: true })
      }
    } catch (err) {
      console.error("Error marking message as read:", err)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const response = await fetch(`/api/admin/contact-messages?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete message")
      }

      // Update local state
      setMessages(messages.filter((msg) => msg.id !== id))

      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    } catch (err) {
      console.error("Error deleting message:", err)
    }
  }

  const viewMessage = (message: FirestoreContactMessage) => {
    setSelectedMessage(message)
    if (!message.read) {
      markAsRead(message.id)
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/owner" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">Contact Messages</h1>
          <p className="text-gray-300">Manage messages from your contact form</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center">
              <Loader className="h-8 w-8 text-cyan-400 animate-spin mb-4" />
              <p className="text-gray-400">Loading messages...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h2 className="font-medium text-lg">Messages ({messages.length})</h2>
              </div>

              <div className="divide-y divide-gray-700 max-h-[70vh] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="p-6 text-center text-gray-400">
                    <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No messages yet</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedMessage?.id === message.id ? "bg-gray-700" : "hover:bg-gray-700/50"
                      } ${!message.read ? "border-l-2 border-cyan-500" : ""}`}
                      onClick={() => viewMessage(message)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`font-medium ${!message.read ? "text-white" : "text-gray-300"}`}>
                          {message.name}
                        </h3>
                        <div className="flex items-center">
                          {!message.read && <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>}
                          <span className="text-xs text-gray-400">{formatFirestoreTimestampDate(message.timestamp)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{message.subject || "(No subject)"}</p>
                      <p className="text-xs text-gray-500 truncate mt-1">{message.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-gray-800 rounded-lg border border-gray-700 h-full flex flex-col">
                  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="font-medium text-lg truncate">{selectedMessage.subject || "(No subject)"}</h2>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 flex-grow overflow-y-auto">
                    <div className="mb-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg">{selectedMessage.name}</h3>
                          <a href={`mailto:${selectedMessage.email}`} className="text-cyan-400 hover:underline text-sm">
                            {selectedMessage.email}
                          </a>
                        </div>
                        <div className="text-sm text-gray-400">{formatFirestoreTimestampDate(selectedMessage.timestamp)}</div>
                      </div>

                      <div className="bg-gray-700/50 rounded-lg p-4 whitespace-pre-wrap">{selectedMessage.message}</div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() =>
                          (window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || "Your message"}`)
                        }
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Reply via Email
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg border border-gray-700 h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MailOpen className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-300 mb-2">No message selected</h3>
                    <p className="text-gray-400 max-w-md">Select a message from the list to view its contents</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
