"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { pageview, hasAnalyticsConsent } from "@/lib/analytics"

export function useAnalytics(GA_MEASUREMENT_ID: string) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !hasAnalyticsConsent()) return

    // Construct the URL from pathname and search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Send pageview
    pageview(GA_MEASUREMENT_ID, url)
  }, [pathname, searchParams, GA_MEASUREMENT_ID])
}
