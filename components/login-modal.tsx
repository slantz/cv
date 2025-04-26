"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, AlertCircle, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Portal } from "@/components/ui/portal"
import { signInWithGitHub } from "@/lib/firebase-auth"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await signInWithGitHub()
      onClose()
    } catch (error: any) {
      console.error("Login error:", error)

      if (error.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with the same email address but different sign-in credentials.")
      } else if (error.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled by closing the popup.")
      } else if (error.code === "auth/cancelled-popup-request") {
        // This is not really an error, just ignore it
        setError(null)
      } else {
        setError(error.message || "An error occurred during sign in. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
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
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 pointer-events-none" />

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
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                    <Github className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Admin Login</h2>
                  <p className="text-gray-400 max-w-sm">
                    Sign in with your GitHub account to access the admin dashboard. Only authorized GitHub accounts can
                    access this area.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm text-center flex items-center gap-2 justify-center">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin mr-2" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <Github className="mr-2 h-5 w-5" />
                      <span>Sign in with GitHub</span>
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  )
}
