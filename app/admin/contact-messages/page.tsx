"use client"

import { useState, useEffect } from "react"
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Trash, Mail, MailOpen, ArrowLeft, AlertTriangle, Loader } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-context"

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: any
  read: boolean
}

export default function ContactMessagesPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [firebaseAvailable, setFirebaseAvailable] = useState(false)

  useEffect(() => {
    // Check if Firebase is available
    if (typeof window !== "undefined" && db) {
      setFirebaseAvailable(true)
      fetchMessages()
    } else {
      setFirebaseAvailable(false)
      setLoading(false)
      setError("Firebase is not available. Cannot load contact messages.")
    }
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    setError(null)

    try {
      const q = query(collection(db, "contact-messages"), orderBy("timestamp", "desc"))

      const querySnapshot = await getDocs(q)

      const fetchedMessages: ContactMessage[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        fetchedMessages.push({
          id: doc.id,
          name: data.name || "",
          email: data.email || "",
          subject: data.subject || "",
          message: data.message || "",
          timestamp: data.timestamp,
          read: data.read || false,
        })
      })

      setMessages(fetchedMessages)
    } catch (err) {
      console.error("Error fetching messages:", err)
      setError("Failed to load messages. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    if (!firebaseAvailable) return

    try {
      const messageRef = doc(db, "contact-messages", id)
      await updateDoc(messageRef, {
        read: true,
      })

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
    if (!firebaseAvailable) return

    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const messageRef = doc(db, "contact-messages", id)
      await deleteDoc(messageRef)

      // Update local state
      setMessages(messages.filter((msg) => msg.id !== id))

      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    } catch (err) {
      console.error("Error deleting message:", err)
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown date"

    try {
      const date = timestamp.toDate()
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } catch (err) {
      return "Invalid date"
    }
  }

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    if (!message.read) {
      markAsRead(message.id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">Contact Messages</h1>
          <p className="text-gray-300">Manage messages from your contact form</p>
        </div>

        {!firebaseAvailable ? (
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">Firebase Unavailable</h2>
            <p className="text-gray-300 mb-4">
              Firebase connection is not available. Contact messages cannot be loaded.
            </p>
            <p className="text-gray-400 text-sm">
              Please check your Firebase configuration and ensure your environment variables are set correctly.
            </p>
          </div>
        ) : loading ? (
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
                          <span className="text-xs text-gray-400">{formatDate(message.timestamp)}</span>
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
                        <div className="text-sm text-gray-400">{formatDate(selectedMessage.timestamp)}</div>
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
