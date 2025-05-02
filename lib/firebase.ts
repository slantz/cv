"use client"

import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// import { getAnalytics, isSupported } from "firebase/analytics"
import { getAuth } from "firebase/auth"

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

try {
  // Check if Firebase is already initialized
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

  // Initialize Firestore
  db = getFirestore(app)

  // Initialize Auth
  auth = getAuth(app)

  // Initialize Analytics
  // const initAnalytics = async () => {
  //   try {
  //     const analyticsSupported = await isSupported()
  //     if (analyticsSupported) {
  //       analytics = getAnalytics(app)
  //     }
  //   } catch (error) {
  //     console.error("Firebase Analytics error:", error)
  //   }
  // }
  //
  // initAnalytics()
} catch (error) {
  console.error("Firebase initialization error:", error)
}

export { app, db, auth, analytics }
