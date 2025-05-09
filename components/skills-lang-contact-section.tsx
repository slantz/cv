"use client"

import {SkillBadge} from "@/components/skill-badge";
import {LanguageCard} from "@/components/language-card";
import {ContactDetails} from "@/components/contact-details";
import {motion} from "framer-motion";
import {CVData} from "@/types/core";
import {parseTemplateString} from "@/lib/utils";

interface Props {
  subtitle: CVData['about']['subtitle'];
  skills: CVData['about']['skills'];
  languages: CVData['about']['languages'];
  contact: CVData['about']['contact'];
}

export function SkillsLangContactSection(props: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="max-w-5xl mx-auto mb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch mb-12">
        <div className="md:col-span-2 h-full">
          <div className="flex flex-col items-stretch justify-stretch">
            <div className="inline-block text-center px-6 py-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 mb-8">
              <h3 className="text-lg font-medium text-gray-300">
                <span className="text-purple-400 font-semibold">
                  {parseTemplateString(props.subtitle.duration, {
                    devExperienceYears: new Date().getFullYear() - new Date('2013').getFullYear(),
                  })}
                </span>
                <span>{props.subtitle.years}</span>
                <span className="text-cyan-400 font-semibold">{props.subtitle.major}</span>
              </h3>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 relative">
              {props.skills.sort((a,b) => a.order - b.order).map((skill) => (
                <SkillBadge
                  key={skill.key}
                  name={skill.key}
                  level={skill.level}
                  details={skill.details}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1 h-full">
          <LanguageCard languages={props.languages} />
        </div>

        <div className="md:col-span-1 h-full">
          <ContactDetails contact={props.contact} />
        </div>
      </div>
    </motion.div>
  );
}
