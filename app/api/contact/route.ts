import { type NextRequest, NextResponse } from "next/server"
import { getAdminDB } from "@/lib/firebase-admin"
import {ensureResource} from "@/lib/firebase-utils";

export async function POST(req: NextRequest) {
  const db = ensureResource(getAdminDB(), "Firestore not initialized")

  if (db instanceof NextResponse) return db

  const body = await req.json()
  const { name, email, subject, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 })
  }

  try {
    await db.collection("contact-messages").add({
      name,
      email,
      subject: subject || "",
      message,
      read: false,
      timestamp: new Date(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ success: false, message: "Internal error" }, { status: 500 })
  }
}
