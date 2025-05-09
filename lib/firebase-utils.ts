import { NextResponse } from "next/server"

export function ensureResource<T>(
  resource: T | null,
  message: string,
  status: number = 500
): T | NextResponse {
  if (!resource) {
    return NextResponse.json({ success: false, message }, { status })
  }
  return resource
}
