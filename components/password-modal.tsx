"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Lock, Check, AlertCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Portal } from "@/components/ui/portal"
import { event } from "@/lib/analytics"

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (inputPassword: string) => void
}

export function PasswordModal({ isOpen, onClose, onSuccess }: PasswordModalProps) {
  const [inputPassword, setInputPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputPassword.trim()) {
      setError("Please enter the password")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      const res = await fetch("/api/cv/check-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: btoa(inputPassword) }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setIsSuccess(true)

        event({
          action: "cv_password_success",
          category: "authentication",
          label: "CV Download Password Success",
        })

        onSuccess(inputPassword)
        onClose()
        setInputPassword("")
        setIsSuccess(false)
      } else {
        setError(data.message || "Incorrect password. Please try again.")
        event({
          action: "cv_password_failure",
          category: "authentication",
          label: "CV Download Password Failure with Incorrect Password",
        })
      }
    } catch (err) {
      console.error("Error checking password:", err)
      setError("Something went wrong. Please try again.")
      event({
        action: "cv_password_failure",
        category: "server",
        label: `password check error ${err}`,
      })
    }

    setIsVerifying(false)
  }

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
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
              onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling to backdrop
            >
              <div id="password-modal-glow-effect" className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 pointer-events-none" />

              <div className="relative p-6">
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>

                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">Protected Content</h2>
                  <p className="text-gray-400 text-sm">Please request one-time password from Alex to download CV</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        type="password"
                        placeholder="Enter password"
                        value={inputPassword}
                        onChange={(e) => {
                          setInputPassword(e.target.value)
                          if (error) setError(null)
                        }}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                        disabled={isVerifying || isSuccess}
                        autoFocus
                      />

                      {error && (
                        <div className="flex items-center text-red-400 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className={`w-full text-white ${
                        isSuccess
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                      }`}
                      disabled={isVerifying || isSuccess}
                    >
                      {isVerifying ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          <span>Verifying...</span>
                        </span>
                      ) : isSuccess ? (
                        <span className="flex items-center justify-center">
                          <Check className="mr-2 h-4 w-4" />
                          <span>Success!</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download CV</span>
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  )
}
