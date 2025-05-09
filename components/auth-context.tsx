"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Set up auth state observer
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      // Check if user is an admin
      if (user) {
        try {
          // Get the user's ID token
          const idToken = await user.getIdToken(true)

          // Call the server to check if the user is an admin
          const response = await fetch("/api/auth/check-admin", {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          })

          if (response.ok) {
            const { isAdmin } = await response.json()
            setIsAdmin(isAdmin)
          } else {
            setIsAdmin(false)
          }
        } catch (error) {
          console.error("Error checking admin status:", error)
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }

      setIsLoading(false)
    })

    // Clean up observer on unmount
    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, isLoading, isAdmin }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
