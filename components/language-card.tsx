"use client"

import { motion } from "framer-motion"
import { Globe } from "lucide-react"

interface LanguageCardProps {
  className?: string
}

interface Language {
  name: string
  level: number
  proficiency: string
}

export function LanguageCard({ className }: LanguageCardProps) {
  // Sample language data - in a real app, this could come from your Firebase database
  const languages: Language[] = [
    { name: "English", level: 5, proficiency: "Native" },
    { name: "Spanish", level: 4, proficiency: "Fluent" },
    { name: "French", level: 3, proficiency: "Intermediate" },
    { name: "German", level: 2, proficiency: "Basic" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-5 ${className}`}
    >
      <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 mb-3">
        Languages
      </h3>

      <div className="space-y-4">
        {languages.map((language, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-900/40 flex items-center justify-center border border-green-500/30 group-hover:border-green-500/60 transition-all">
                  <Globe className="h-3 w-3 text-green-400" />
                </div>
                <span className="text-sm font-medium text-white">{language.name}</span>
              </div>
              <span className="text-xs text-gray-400">{language.proficiency}</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                style={{ width: `${(language.level / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
