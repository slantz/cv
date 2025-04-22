"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { GlowButton } from "@/components/glow-button"
import { PasswordModal } from "@/components/password-modal"
import { event } from "@/lib/analytics"

// In a real application, this would be stored securely on the server
// This is just for demonstration purposes
const CV_PASSWORD = "web3portfolio"

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

  const handleDownloadSuccess = () => {
    // In a real application, this would trigger the actual file download
    // For demonstration, we'll just log the success
    console.log("CV download authorized!")

    // Simulate file download by creating a temporary link
    const link = document.createElement("a")
    link.href = "/john-doe-cv.pdf" // This would be your actual CV file path
    link.download = "john-doe-cv.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    event({
      action: "cv_download_success",
      category: "user_interaction",
      label: "CV Downloaded Successfully",
    })
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
        password={CV_PASSWORD}
      />
    </>
  )
}
