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
import {parseTemplateDescriptionWithDates} from "@/lib/utils";

const schemaOrgJsonLd = (description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://kblnsk.me/",
  name: "Alex | Senior Software Engineer & Engineering Leader",
  description: parseTemplateDescriptionWithDates(description),
  potentialAction: {
    "@type": "SearchAction",
    target: "https://kblnsk.me/#projects",
    "query-input": "required name=search_term_string",
  },
});

export default async function Page() {
  const {about, ...cvWithoutAbout} = await fetchCVDocuments();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrgJsonLd(about.description)),
        }}
      />
      <PageView />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
        <KeyboardShortcuts />
        <AnimatedBackground />
        <div id="background-grid" className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <Header
          social={about.social}
        />
        <main className="container mx-auto py-12 px-4 relative z-10">
          <HeroSection
            title={about.title}
            description={about.description}
          />
          <SkillsLangContactSection
            subtitle={about.subtitle}
            skills={about.skills}
            languages={about.languages}
            contact={about.contact}
          />
          <AchievementsSection
            achievements={about.achievements}
          />
          <EssaySection data={cvWithoutAbout} />
        </main>
        <Footer
          social={about.social}
        />
        <AdminLoginModalTrigger />
      </div>
    </>
  )
}
