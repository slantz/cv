"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function KeyboardShortcuts() {
  const router = useRouter()

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

      // Add keyboard shortcuts
      switch (e.key) {
        case "h":
          // Scroll to top (home)
          window.scrollTo({ top: 0, behavior: "smooth" })
          break
        case "c":
          // Scroll to contact section
          const contactButton = document.querySelector('[data-shortcut="contact"]')
          if (contactButton) {
            contactButton.scrollIntoView({ behavior: "smooth" })
            // Simulate click after scrolling
            setTimeout(() => {
              ;(contactButton as HTMLElement).click()
            }, 500)
          }
          break
        case "d":
          // Open CV download modal
          const downloadButton = document.querySelector('[data-shortcut="download"]')
          if (downloadButton) {
            ;(downloadButton as HTMLElement).click()
          }
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [router])

  return null
}
