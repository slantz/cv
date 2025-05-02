"use client"

import {Avatar} from "@/components/avatar";
import {motion} from "framer-motion";
import {CVDownload} from "@/components/cv-download";
import {GlowButton} from "@/components/glow-button";
import {useTracking} from "@/hooks/use-tracking";
import {ContactForm} from "@/components/contact-form";
import {useState} from "react";

export function HeroSection() {
  const {trackButtonClick} = useTracking();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  return (
    <section className="max-w-5xl mx-auto mb-24 flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <Avatar />
      <div className="w-full md:w-1/2 text-center md:text-left">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight">
            Software Developer
          </h2>
          <p className="font-mono text-md md:text-lg text-gray-300 mb-8 leading-relaxed">
            Engineering Lead & Full-Stack Developer with {new Date().getFullYear() - new Date('2013').getFullYear()}+ years in JS/TS/Java
            and {new Date().getFullYear() - new Date('2019').getFullYear()}+ years leading teams. Delivered complex products (Cardano Spot,
            USDA, Opower, aboutyou.de / aboutyou-outlet.de), drove architecture,
            and mentored engineers. Active SPO in Apex Fusion Chain.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div data-shortcut="download">
              <CVDownload />
            </div>
            <div data-shortcut="contact">
              <GlowButton
                variant="secondary"
                onClick={() => {
                  trackButtonClick("contact_me")
                  setIsContactFormOpen(true)
                }}
              >
                <span className="flex items-center justify-center">
                  <span>Contact Me</span>
                </span>
              </GlowButton>
            </div>
          </div>
        </motion.div>
      </div>
      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </section>
  );
}
