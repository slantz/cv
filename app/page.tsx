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
import {fetchCVDocuments} from "@/lib/fetch-cv-documents";

export default async function Page() {
  const cv = await fetchCVDocuments();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://kblnsk.me/",
            "name": "Alex | Senior Software Engineer & Engineering Leader",
            "description": "Senior Software Engineer and Engineering Leader with 12+ years in full-stack development and 6+ years leading teams. Specialized in Web3, blockchain, and scalable systems.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://kblnsk.me/#projects",
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
        <Header
          social={cv.about.social}
        />
        <main className="container mx-auto py-12 px-4 relative z-10">
          <HeroSection
            title={cv.about.title}
            description={cv.about.description}
          />
          <SkillsLangContactSection
            subtitle={cv.about.subtitle}
            skills={cv.about.skills}
            languages={cv.about.languages}
            contact={cv.about.contact}
          />
          <AchievementsSection
            achievements={cv.about.achievements}
          />
          <EssaySection />
        </main>
        <Footer />
        <AdminLoginModalTrigger />
      </div>
    </>
  )
}
