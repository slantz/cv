"use client"

import { GithubAuthProvider, signInWithPopup, signOut as firebaseSignOut, getAuth } from "firebase/auth"
import { app } from "@/lib/firebase"

// Initialize Firebase Auth
const auth = getAuth(app)

// List of GitHub IDs that are allowed to access admin pages
// In a real app, you might want to store this in Firestore
const ALLOWED_GITHUB_IDS = [
  process.env.NEXT_PUBLIC_ALLOWED_GITHUB_ID || "", // Add your GitHub ID here
]

// Sign in with GitHub
export const signInWithGitHub = async () => {
  const provider = new GithubAuthProvider()
  provider.addScope("read:user")

  try {
    const result = await signInWithPopup(auth, provider)

    // Get GitHub user info from the credential
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken

    // Get additional GitHub user data if needed
    if (token) {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
        },
      })

      if (response.ok) {
        const githubUser = await response.json()
        // You can store additional GitHub user data in Firestore here if needed
        console.log("GitHub user data:", githubUser)
      }
    }

    return result.user
  } catch (error: any) {
    console.error("Error signing in with GitHub:", error)
    throw error
  }
}

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

// Check if a user is authorized to access admin pages
export const isAuthorizedAdmin = async (user: any) => {
  if (!user) return false

  // In development mode, allow all authenticated users
  if (process.env.NODE_ENV === "development") {
    console.log("Development mode: Allowing all authenticated users")
    return true
  }

  try {
    // Get the GitHub provider data
    const githubProvider = user.providerData.find((provider: any) => provider.providerId === "github.com")

    if (!githubProvider) return false

    // Check if the user's GitHub ID is in the allowed list
    // Note: Firebase Auth doesn't directly provide the GitHub ID,
    // so we're using the UID from the GitHub provider data
    if (ALLOWED_GITHUB_IDS.includes(githubProvider.uid)) {
      return true
    }

    // If needed, you could also check a Firestore collection for authorized users

    return false
  } catch (error) {
    console.error("Error checking admin authorization:", error)
    return false
  }
}

// Get the current auth instance
export { auth }
