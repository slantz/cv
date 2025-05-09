"use client"

import { GithubAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

// Sign in with GitHub
export const signInWithGitHub = async () => {
  if (!auth) throw new Error("Firebase Auth is not initialized")

  const provider = new GithubAuthProvider()
  provider.addScope("read:user")

  try {
    const result = await signInWithPopup(auth, provider)

    // Get GitHub user info from the credential
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken

    // Get the ID token
    const idToken = await result.user.getIdToken()

    // Send the ID token to the server to create a session cookie
    await fetch("/api/auth/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    })

    // Get additional GitHub user data if needed
    // if (token) {
    //   const response = await fetch("https://api.github.com/user", {
    //     headers: {
    //       Authorization: `token ${token}`,
    //     },
    //   })
    //
    //   if (response.ok) {
    //     const githubUser = await response.json()
    //   }
    // }

    return result.user
  } catch (error: any) {
    console.error("Error signing in with GitHub:", error)
    throw error
  }
}

// Sign out
export const signOut = async () => {
  if (!auth) throw new Error("Firebase Auth is not initialized")

  try {
    await firebaseSignOut(auth)

    // Clear the session cookie
    await fetch("/api/auth/session", {
      method: "DELETE",
    })
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

// Get the current auth instance
export { auth }
