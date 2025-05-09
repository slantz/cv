"use client"

import {useLayoutEffect, useRef, useState} from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import {useOutsideClick} from "@/hooks/use-outside-click";
import {useIsMobile} from "@/hooks/use-mobile";

interface SkillBadgeProps {
  name: string
  level?: number
  className?: string
  details?: string[]
}

export function SkillBadge({ name, level = 5, className, details }: SkillBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dropdownStyle, setDropdownStyle] = useState({ left: "0px" })
  const isMobile = useIsMobile()

  const outsideClickListenerRef = useOutsideClick<HTMLDivElement>(() => {
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

  useLayoutEffect(() => {
    if (isExpanded && dropdownRef.current && containerRef.current) {
      const dropdown = dropdownRef.current
      const container = containerRef.current
      const rect = dropdown.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      if (isMobile) {
        // Mobile: center the dropdown under the badge
        let left = container.offsetWidth / 2 - rect.width / 2
        const absoluteLeft = containerRect.left + left
        const viewportWidth = window.innerWidth

        if (absoluteLeft + rect.width > viewportWidth) {
          left -= absoluteLeft + rect.width - viewportWidth + 8
        } else if (absoluteLeft < 8) {
          left += 8 - absoluteLeft
        }

        setDropdownStyle({ left: `${left}px` })
      } else {
        // Desktop: right side of the badge
        setDropdownStyle({ left: '0' })
      }
    }
  }, [isExpanded, isMobile])

  return (
    <div
      ref={(el) => {outsideClickListenerRef.current = el;containerRef.current = el}}
      className="relative"
    >
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
            ref={dropdownRef}
            style={dropdownStyle}
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-3">
              <h4 className="font-medium text-sm mb-2 text-white capitalize">{name} Skills</h4>
              <div className="space-y-2">
                {details.map((group, groupIndex) => (
                  <div key={groupIndex} className="space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {group.split(":").map(skill => skill.trim()).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`inline-block px-2 py-0.5 text-sm rounded-md ${
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
