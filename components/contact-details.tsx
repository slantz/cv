"use client"

import { motion } from "framer-motion"
import { MapPin, MessageCircle, Send, Globe } from "lucide-react"
import { event } from "@/lib/analytics"

interface ContactDetailsProps {
  className?: string
}

export function ContactDetails({ className }: ContactDetailsProps) {
  const trackContactClick = (platform: string) => {
    event({
      action: "contact_click",
      category: "user_interaction",
      label: platform,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-5 ${className}`}
    >
      <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
        Get in Touch
      </h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-purple-900/40 flex items-center justify-center border border-purple-500/30 group-hover:border-purple-500/60 transition-all">
            <Send className="h-4 w-4 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Telegram</p>
            <a
              href="https://t.me/johndoe_web3"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick("telegram")}
              className="text-sm text-white hover:text-purple-400 transition-colors"
            >
              @johndoe_web3
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-pink-900/40 flex items-center justify-center border border-pink-500/30 group-hover:border-pink-500/60 transition-all">
            <MessageCircle className="h-4 w-4 text-pink-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Discord</p>
            <a
              href="https://discord.com/users/johndoe#1234"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick("discord")}
              className="text-sm text-white hover:text-pink-400 transition-colors"
            >
              johndoe#1234
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-cyan-900/40 flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all">
            <MapPin className="h-4 w-4 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Location</p>
            <p className="text-sm text-white">San Francisco, CA</p>
          </div>
        </div>

        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-blue-900/40 flex items-center justify-center border border-blue-500/30 group-hover:border-blue-500/60 transition-all">
            <Globe className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Website</p>
            <a
              href="https://johndoe.dev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick("website")}
              className="text-sm text-white hover:text-blue-400 transition-colors"
            >
              johndoe.dev
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
