"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkillBadgeProps {
  name: string
  level?: number
  className?: string
}

export function SkillBadge({ name, level = 5, className }: SkillBadgeProps) {
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

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        "bg-gradient-to-r",
        colorClass,
        "text-white shadow-sm",
        className,
      )}
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
    </motion.div>
  )
}
