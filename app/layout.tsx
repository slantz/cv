import type React from "react"
import type {Metadata} from "next";
import { Space_Grotesk, Roboto_Mono, Outfit, Iceland, Orbitron } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import GoogleAnalytics from "@/components/google-analytics"
import AnalyticsConsent from "@/components/analytics-consent"
import { Suspense } from "react"
import { AuthProvider } from "@/components/auth-context"

export const revalidate = 86400; // 24 hours

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const outfit = Outfit({
  weight: ["300", "400", "600"],
  subsets: ['latin'],
  variable: '--font-outfit',
})

const iceland = Iceland({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-iceland',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: {
    default: "Alex | Senior Software Engineer & Engineering Leader",
    template: "%s | Alex | Senior Software Engineer & Engineering Leader"
  },
  description:
    "Senior Software Engineer and Engineering Leader with 12+ years in full-stack development (JS/TS/Java) and 6+ years in technical leadership. Specialized in Web3, blockchain, scalable systems, and launching products and teams from scratch.",
  keywords: [
    "Senior Software Engineer",
    "Engineering Leader",
    "Full-Stack Developer",
    "Web3 Developer",
    "Blockchain Architect",
    "Cardano Developer",
    "Technical Manager",
    "JavaScript",
    "TypeScript",
    "Java",
    "AWS",
    "Docker",
    "React",
    "Vue.js",
    "Cardano Spot",
    "APEX Fusion SPO",
    "USDA Stablecoin",
    "AboutYou Outlet",
  ],
  authors: [{ name: "Alex", url: "https://kblnsk.me/" }],
  alternates: {
    canonical: "https://kblnsk.me/",
  },
  openGraph: {
    title: "Alex | Senior Software Engineer & Engineering Leader",
    description:
      "12+ years in full-stack development and 6+ years leading engineering teams. Expert in Web3, blockchain solutions, and scalable systems architecture.",
    type: "website",
    url: "https://kblnsk.me/",
    images: [
      {
        url: "https://kblnsk.me/seo_1200x630.png",
        width: 1200,
        height: 630,
        alt: "Alex Portfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex | Senior Software Engineer & Engineering Leader",
    description:
      "Experienced Software Engineer and Team Leader specializing in Web3, blockchain, and scalable systems. Launching products and teams successfully across global companies.",
    images: ["https://kblnsk.me/seo_1200x630.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_MEASUREMENT_ID = String(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${robotoMono.variable} ${outfit.variable} ${iceland.variable} ${orbitron.variable} font-outfit antialiased bg-pool-richBlack`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <Suspense>
              {children}
              <AnalyticsConsent />
              <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
            </Suspense>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
