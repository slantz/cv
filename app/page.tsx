"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {Github, Linkedin, ChevronDown, ChevronUp, AlertCircle, Send, MessageCircle} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCVData } from "@/hooks/use-cv-data"
import { AnimatedBackground } from "@/components/animated-background"
import { GlowButton } from "@/components/glow-button"
import { SkillBadge } from "@/components/skill-badge"
import { useAnalytics } from "@/hooks/use-analytics"
import { event } from "@/lib/analytics"
import { CVDownload } from "@/components/cv-download"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import {Logo} from "@/components/logo";
import {ContactDetails} from "@/components/contact-details";
import {Avatar} from "@/components/avatar";

export default function CVWebsite() {
  const { cvData, isLoading, error } = useCVData()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Initialize analytics
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
  useAnalytics(GA_MEASUREMENT_ID)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)

    // Track section expansion as an event
    if (expandedId !== id) {
      event({
        action: "expand_section",
        category: "user_interaction",
        label: id,
      })
    }
  }

  const trackButtonClick = (buttonName: string) => {
    event({
      action: "button_click",
      category: "user_interaction",
      label: buttonName,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      <KeyboardShortcuts />
      <AnimatedBackground />
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-purple-500 hover:border-purple-400 hover:bg-purple-950/20"
              onClick={() => trackButtonClick("linkedin")}
              asChild
            >
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-purple-400" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-pink-500 hover:border-pink-400 hover:bg-pink-950/20"
              onClick={() => trackButtonClick("github")}
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-pink-400" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 relative z-10">
        <section className="max-w-5xl mx-auto mb-24 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <Avatar />
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight">
                JS/TS/Java Dev/EM/Architect
              </h2>
              <p className="font-mono text-md md:text-lg text-gray-300 mb-8 leading-relaxed">
                Building the decentralized future with cutting-edge technologies and innovative solutions. Specializing
                in smart contracts, DeFi protocols, and Web3 frontends.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div data-shortcut="download">
                  <CVDownload />
                </div>
                <div data-shortcut="contact">
                  <GlowButton variant="secondary" onClick={() => trackButtonClick("contact_me")}>
                    <span className="flex items-center justify-center">
                      <span>Contact Me</span>
                    </span>
                  </GlowButton>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <div className="inline-block px-6 py-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 mb-12">
            <h3 className="text-xl font-medium text-gray-300">
              <span className="text-purple-400 font-semibold">{new Date().getFullYear() - new Date('2013').getFullYear()}+</span> Years Experience in{" "}
              <span className="text-cyan-400 font-semibold">Software Development</span>
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-16">
            <SkillBadge name="Solidity" level={5} />
            <SkillBadge name="Smart Contracts" level={5} />
            <SkillBadge name="React" level={5} />
            <SkillBadge name="TypeScript" level={4} />
            <SkillBadge name="Ethers.js" level={4} />
            <SkillBadge name="DeFi" level={4} />
            <SkillBadge name="NFTs" level={4} />
            <SkillBadge name="The Graph" level={3} />
            <SkillBadge name="Hardhat" level={4} />
            <SkillBadge name="Tokenomics" level={3} />
            <SkillBadge name="Layer 2" level={3} />
          </div>
        </motion.div>

        {/* Contact Details Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-6 h-full"
              >
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                  About Me
                </h3>
                <p className="text-gray-300 mb-4">
                  I'm a passionate Web3 developer with expertise in blockchain technologies and decentralized
                  applications. My journey in the crypto space began in 2017, and I've been building innovative
                  solutions ever since.
                </p>
                <p className="text-gray-300">
                  With a background in both frontend and smart contract development, I bridge the gap between user
                  experience and blockchain functionality. I'm particularly interested in DeFi protocols, NFT platforms,
                  and DAO governance systems.
                </p>
              </motion.div>
            </div>

            <ContactDetails />
          </div>
        </section>

        <section className="max-w-4xl mx-auto grid gap-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-pulse flex space-x-4">
                <div className="h-3 w-3 bg-purple-400 rounded-full"></div>
                <div className="h-3 w-3 bg-pink-400 rounded-full"></div>
                <div className="h-3 w-3 bg-cyan-400 rounded-full"></div>
              </div>
            </div>
          ) : error ? (
            <div className="rounded-xl overflow-hidden border border-red-500/50 bg-red-950/10 p-6 text-center">
              <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-red-400 mb-1">Error Loading Data</h3>
              <p className="text-gray-300">{error}</p>
              <p className="text-gray-400 text-sm mt-2">
                Please check your Firebase configuration and ensure your collections are set up correctly.
              </p>
            </div>
          ) : cvData.length === 0 ? (
            <div className="rounded-xl overflow-hidden border border-yellow-500/50 bg-yellow-950/10 p-6 text-center">
              <AlertCircle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-yellow-400 mb-1">No Data Found</h3>
              <p className="text-gray-300">No CV sections were found in your Firebase database.</p>
              <p className="text-gray-400 text-sm mt-2">
                Please add some data to your 'cv-sections' collection in Firebase.
              </p>
            </div>
          ) : (
            cvData.map((section, index) => (
              <motion.div
                key={section.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all duration-300 hover:-translate-y-1"
              >
                <motion.button
                  layout
                  onClick={() => toggleExpand(section.id)}
                  className="w-full p-6 flex justify-between items-center text-left"
                >
                  <div>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                      {section.title}
                    </h3>
                    <p className="text-gray-300 mt-1">{section.description}</p>
                  </div>
                  {expandedId === section.id ? (
                    <ChevronUp className="h-5 w-5 text-purple-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-400" />
                  )}
                </motion.button>

                <AnimatePresence>
                  {expandedId === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-gray-700"
                    >
                      <div className="p-6 bg-gray-800/80">
                        {section.details.length > 0 ? (
                          section.details.map((detail, index) => (
                            <div key={index} className="mb-4 last:mb-0">
                              <h4 className="font-semibold text-cyan-400">{detail.title}</h4>
                              <p className="text-sm text-gray-300 mt-1">{detail.description}</p>
                              {detail.tags && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {detail.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 text-center italic">No details available for this section.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </section>
      </main>

      <footer className="container mx-auto py-12 px-4 mt-32 relative z-10">
        <div className="max-w-5xl mx-auto border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} John Doe. Built with
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mx-1">
                passion
              </span>
              for Web3.
            </p>

            {/* Footer Contact Links */}
            <div className="flex gap-4">
              <a
                href="https://t.me/johndoe_web3"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick("telegram_footer")}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Telegram</span>
              </a>
              <a
                href="https://discord.com/users/johndoe#1234"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick("discord_footer")}
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">Discord</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick("linkedin_footer")}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick("github_footer")}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
