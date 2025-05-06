"use client"

import {Avatar} from "@/components/avatar";
import {motion} from "framer-motion";
import {CVDownload} from "@/components/cv-download";
import {GlowButton} from "@/components/glow-button";
import {useTracking} from "@/hooks/use-tracking";
import {ContactForm} from "@/components/contact-form";
import {useState} from "react";
import {CVData} from "@/types/core";
import {parseTemplateString} from "@/lib/utils";

interface Props {
  title: CVData['about']['title'];
  description: CVData['about']['description'];
}

export function HeroSection(props: Props) {
  const {trackButtonClick} = useTracking();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  return (
    <section className="max-w-5xl mx-auto mb-24 flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <Avatar />
      <div className="w-full md:w-1/2 text-center md:text-left">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight">
            {props.title}
          </h2>
          <p className="text-md md:text-lg text-gray-300 mb-8 leading-relaxed">
            {parseTemplateString(props.description, {
              devExperienceYears: new Date().getFullYear() - new Date('2013').getFullYear(),
              manageExperienceYears: new Date().getFullYear() - new Date('2019').getFullYear()
            })}
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
