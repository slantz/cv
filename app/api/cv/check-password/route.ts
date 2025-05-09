import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const inputPassword = Buffer.from(body.password, 'base64').toString('utf8')

  if (!inputPassword) {
    return NextResponse.json({ success: false, message: "Missing password" }, { status: 400 })
  }

  if (inputPassword === process.env.CV_PASSWORD) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 })
  }
}
