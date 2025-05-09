"use client"

import { useState, useEffect } from "react"

export function useAdminHotkey() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [keySequence, setKeySequence] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard shortcuts if no input elements are focused
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        document.activeElement instanceof HTMLSelectElement
      ) {
        return
      }

      // Add the key to the sequence
      const newSequence = keySequence + e.key.toLowerCase()
      setKeySequence(newSequence)

      // Check if the sequence contains "admin"
      if (newSequence.includes("alexisadmin")) {
        setIsLoginModalOpen(true)
        setKeySequence("")
      }

      // Reset the sequence after 2 seconds of inactivity
      setTimeout(() => {
        setKeySequence("")
      }, 2000)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [keySequence])

  return {
    isLoginModalOpen,
    setIsLoginModalOpen,
  }
}
