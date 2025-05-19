import type React from "react"
import type {Metadata, Viewport} from "next";
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
    "Engineering Lead & Full-Stack Developer with 12+ years of hands-on experience in JS/TS/Java and 6+ years leading teams. Delivered and scaled high-load systems including Cardano Spot, USDA, Opower, aboutyou.de, and AY Outlet. Led architecture, execution, and cross-functional mentoring. Deep expertise in microservices, SSR, blockchain infrastructure, and UI/UX systems. Active SPO in Apex Fusion Chain and contributor to Cardano ecosystem tools.",
  keywords: [
    "Senior Software Engineer",
    "Engineering Leader",
    "Full-Stack Developer",
    "Frontend Developer",
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
    "Next.js",
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
      "Engineering Lead with 12+ years in full-stack development and 6+ years leading teams. Specialized in Web3, blockchain, and scalable systems architecture.",
    type: "website",
    url: "https://kblnsk.me/",
    images: [
      {
        url: "https://kblnsk.me/seo_1200x630.webp",
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
      "Engineering Lead with 12+ years in full-stack development and 6+ years leading teams. Specialized in Web3, blockchain, and scalable systems architecture.",
    images: ["https://kblnsk.me/seo_1200x630.webp"],
  },
};

export const viewport: Viewport = {
  // width: 'device-width',
  // initialScale: 1,
  // maximumScale: 1,
  // userScalable: false,
  viewportFit: 'cover'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_MEASUREMENT_ID = String(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Preconnect to Google's APIs */}
        <link rel="preconnect" href="https://www.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://apis.google.com" crossOrigin="anonymous" />

        {/* (Optional) dns-prefetch fallback */}
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://apis.google.com" />
      </head>
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
