"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import {useOutsideClick} from "@/hooks/use-outside-click";

interface SkillBadgeProps {
  name: string
  level?: number
  className?: string
  details?: string[]
}

export function SkillBadge({ name, level = 5, className, details }: SkillBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const modalRef = useOutsideClick<HTMLDivElement>(() => {
    setIsExpanded(false)
  }, isExpanded)

  // Ensure level is between 1-5
  const normalizedLevel = Math.max(1, Math.min(5, level))

  // Colors based on level
  const colors = [
    "from-gray-400 to-gray-500", // Level 1
    "from-blue-400 to-cyan-500", // Level 2
    "from-cyan-400 to-teal-500", // Level 3
    "from-purple-400 to-pink-500", // Level 4
    "from-pink-400 to-purple-600", // Level 5
  ]

  const colorClass = colors[normalizedLevel - 1]

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium cursor-pointer",
          "bg-gradient-to-r",
          colorClass,
          "text-white shadow-sm uppercase",
          className,
        )}
        onClick={toggleExpand}
      >
        {name}
        <div className="ml-1.5 flex">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn("w-1 h-1 rounded-full ml-0.5", i < normalizedLevel ? "bg-white" : "bg-white/30")}
            />
          ))}
        </div>

        {details && details.length > 0 && (
          <div className="ml-1">
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isExpanded && details && details.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
          >
            <div ref={modalRef} className="p-3">
              <h4 className="font-medium text-sm mb-2 text-white capitalize">{name} Skills</h4>
              <div className="space-y-2">
                {details.map((group, groupIndex) => (
                  <div key={groupIndex} className="space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {group.split(":").map(skill => skill.trim()).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`inline-block px-2 py-0.5 text-xs rounded-md ${
                            skillIndex === 0 ? "bg-gray-700 text-white" : "bg-gray-700/50 text-gray-300"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    {groupIndex < details.length - 1 && <div className="border-t border-gray-700/50 my-1"></div>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
