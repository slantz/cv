import {Metadata} from "next";
import { AnimatedBackground } from "@/components/animated-background"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { AchievementsSection } from "@/components/achievements-section"
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";
import {HeroSection} from "@/components/ui/hero-section";
import {EssaySection} from "@/components/essay-section";
import {AdminLoginModalTrigger} from "@/components/admin-login-modal-trigger";
import {SkillsLangContactSection} from "@/components/skills-lang-contact-section";
import {PageView} from "@/components/page-view";

export const metadata: Metadata = {
  title: "Alex | Senior Software Engineer & Engineering Leader",
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
        url: "https://kblnsk.me/open_graph_1200x630.png",
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
    images: ["https://kblnsk.me/open_graph_1200x630.png"],
  },
};

export default function CVWebsitePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://yourwebsite.com/",
            "name": "Alex | Senior Software Engineer & Engineering Leader",
            "description": "Senior Software Engineer and Engineering Leader with 12+ years in full-stack development and 6+ years leading teams. Specialized in Web3, blockchain, and scalable systems.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://yourwebsite.com/#projects",
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />
      <PageView />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
        <KeyboardShortcuts />
        <AnimatedBackground />
        <div id="background-grid" className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <Header />
        <main className="container mx-auto py-12 px-4 relative z-10">
          <HeroSection />
          <SkillsLangContactSection />
          <AchievementsSection />
          <EssaySection />
        </main>
        <Footer />
        <AdminLoginModalTrigger />
      </div>
    </>
  )
}
