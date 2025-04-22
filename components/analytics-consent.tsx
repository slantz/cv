"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Portal } from "@/components/ui/portal"

export default function AnalyticsConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem("analytics-consent")
    if (!hasConsent) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const acceptConsent = () => {
    localStorage.setItem("analytics-consent", "true")
    setShowConsent(false)

    // Reload the page to activate analytics after consent
    window.location.reload()
  }

  const declineConsent = () => {
    localStorage.setItem("analytics-consent", "false")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <Portal>
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-1">Cookie Consent</h3>
              <p className="text-sm text-gray-300">
                This website uses cookies to analyze traffic and enhance your browsing experience.
              </p>
            </div>
            <div className="flex gap-2 self-end sm:self-center">
              <Button
                variant="outline"
                size="sm"
                onClick={declineConsent}
                className="text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-gray-300"
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={acceptConsent}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-none"
              >
                Accept
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowConsent(false)}
                className="text-gray-400 hover:bg-gray-800 hover:text-gray-300"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
