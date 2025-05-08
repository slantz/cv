import { type NextRequest, NextResponse } from "next/server"
import {getAdminStorage} from "@/lib/firebase-admin"

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url)
  const inputPassword = Buffer.from(searchParams.get("key") ?? 'bm8gcGFzcw==', 'base64').toString('utf8')
  const CV_FILE_PATH = process.env.CV_FILE_PATH

  if (!CV_FILE_PATH) {
    return NextResponse.json({ success: false, message: "Alex has forgotten to set up the file path, no idea where to download it from" }, { status: 418 })
  }

  if (!inputPassword || inputPassword !== process.env.CV_PASSWORD) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  const storage = getAdminStorage()

  if (!storage) {
    return NextResponse.json({ success: false, message: "Firebase storage not initialized" }, { status: 500 })
  }

  try {
    const bucket = storage.bucket()
    const file = bucket.file(CV_FILE_PATH)

    const [metadata] = await file.getMetadata()
    const stream = file.createReadStream()

    return new NextResponse(stream as any, {
      status: 200,
      headers: {
        "Content-Type": metadata.contentType || "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(metadata.name || process.env.CV_FILE_DOWNLOAD_NAME || 'cv')}"`,
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("Error generating signed URL for CV:", error)
    return NextResponse.json({ success: false, message: "Failed to get CV file" }, { status: 500 })
  }
}
