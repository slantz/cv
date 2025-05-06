"use client"

import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import type {CVData} from "@/types/core";

interface LanguageCardProps {
  languages: CVData['about']['languages']
  className?: string
}

interface Language {
  name: string
  level: number
  proficiency: string
}

export function LanguageCard({ languages, className }: LanguageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-5 h-full ${className}`}
    >
      <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
        Languages
      </h3>

      <div className="space-y-4">
        {languages.map((language, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan-900/40 flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all">
                  <Globe className="h-3 w-3 text-cyan-400" />
                </div>
                <span className="text-sm font-medium text-white capitalize">{language.name}</span>
              </div>
              <span className="text-xs text-gray-400">{language.proficiency}</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full"
                style={{ width: `${(language.level / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
