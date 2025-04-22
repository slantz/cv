import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import GoogleAnalytics from "@/components/google-analytics"
import AnalyticsConsent from "@/components/analytics-consent"
import { Suspense } from "react"

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: "John Doe | Web3 Developer & Blockchain Enthusiast",
  description:
    "Professional portfolio of John Doe, a Web3 developer specializing in blockchain technologies, smart contracts, and decentralized applications.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Replace with your actual Google Analytics Measurement ID
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${spaceGrotesk.variable} ${robotoMono.variable} font-sans antialiased bg-pool-richBlack`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange>
          <Suspense>
            {children}
            <AnalyticsConsent />
            <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
