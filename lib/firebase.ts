"use client"

import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics, isSupported } from "firebase/analytics"
import { getAuth, signInWithPopup, GithubAuthProvider, signOut as firebaseSignOut } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase only on the client side
let app
let db
let auth
let analytics

if (typeof window !== "undefined") {
  try {
    // Check if Firebase is already initialized
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

    // Initialize Firestore
    db = getFirestore(app)

    // Initialize Auth
    auth = getAuth(app)

    // Initialize Analytics
    const initAnalytics = async () => {
      try {
        const analyticsSupported = await isSupported()
        if (analyticsSupported) {
          analytics = getAnalytics(app)
        }
      } catch (error) {
        console.error("Firebase Analytics error:", error)
      }
    }

    initAnalytics()
  } catch (error) {
    console.error("Firebase initialization error:", error)
  }
}

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

export { app, db, auth, analytics }
