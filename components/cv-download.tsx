"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { GlowButton } from "@/components/glow-button"
import { PasswordModal } from "@/components/password-modal"
import { event } from "@/lib/analytics"

interface CVDownloadProps {
  className?: string
}

export function CVDownload({ className }: CVDownloadProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
    event({
      action: "cv_download_attempt",
      category: "user_interaction",
      label: "CV Download Modal Opened",
    })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleDownloadSuccess = async (inputPassword: string) => {
    try {
      const res = await fetch(`/api/cv/get-cv-file?key=${btoa(encodeURIComponent(inputPassword))}`)

      if (!res.ok) {
        console.error("CV download failed")
        return
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)

      // Force download of the CV as a file with a meaningful name.
      // Alternatives:
      // - To open in a new tab without download: use `window.open(url, "_blank")` (shows blob URL, no filename)
      // - To use native browser download with correct filename: redirect to a signed Firebase Storage URL (exposes bucket URL temporarily),
      //   but in here we can set Content-Disposition": `attachment; filename=" from server and it will be used,
      //   otherwise now I need to expose filename as a public variable
      const a = document.createElement("a")
      a.href = url
      a.download = process.env.NEXT_PUBLIC_CV_FILE_DOWNLOAD_NAME || 'cv'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)

      event({
        action: "cv_download_success",
        category: "user_interaction",
        label: "CV Downloaded Successfully",
      })
    } catch (err) {
      console.error("Failed to download CV:", err)
    }
  }

  return (
    <>
      <GlowButton variant="primary" onClick={handleOpenModal} className={className}>
        <span className="flex items-center justify-center">
          <Download className="mr-2 h-4 w-4" />
          <span>Download Resume</span>
        </span>
      </GlowButton>

      <PasswordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleDownloadSuccess}
      />
    </>
  )
}
