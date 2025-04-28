import { type NextRequest, NextResponse } from 'next/server'

type ResponseData = {
  message: string
}

export async function GET(
  req: NextRequest,
) {
  return NextResponse.json({ message: 'Hello from Next.js!' })
}
