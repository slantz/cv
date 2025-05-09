"use client"

import {useAnalytics} from "@/hooks/use-analytics";

export function PageView() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
  useAnalytics(GA_MEASUREMENT_ID)

  return null;
}
