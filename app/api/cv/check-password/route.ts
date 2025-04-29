import { type NextRequest, NextResponse } from 'next/server'

type ResponseData = {
  message: string
}

export async function GET(
  req: NextRequest,
) {
  return NextResponse.json<ResponseData>({ message: 'Hello from Next.js!' })
}
