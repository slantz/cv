"use client"

import { motion } from "framer-motion"
import { MapPin, MessageCircle, Send, Mail } from "lucide-react"
import { event } from "@/lib/analytics"
import type {Contact, CVData} from "@/types/core";

interface ContactDetailsProps {
  contact: CVData['about']['contact'];
  className?: string
}

export function ContactDetails({ contact, className }: ContactDetailsProps) {
  const trackContactClick = (platform: string) => {
    event({
      action: "contact_click",
      category: "user_interaction",
      label: platform,
    })
  }

  const getIcon =  (type: Contact['type']) => {
    switch (type) {
      case "location":
        return (
          <div className="w-8 h-8 rounded-full bg-cyan-900/40 flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all">
            <MapPin className="h-4 w-4 text-cyan-400" />
          </div>
        );
      case "telegram":
        return (
          <div className="w-8 h-8 rounded-full bg-purple-900/40 flex items-center justify-center border border-purple-500/30 group-hover:border-purple-500/60 transition-all">
            <Send className="h-4 w-4 text-purple-400" />
          </div>
        );
      case "discord":
        return (
          <div className="w-8 h-8 rounded-full bg-pink-900/40 flex items-center justify-center border border-pink-500/30 group-hover:border-pink-500/60 transition-all">
            <MessageCircle className="h-4 w-4 text-pink-400" />
          </div>
        );
      case "email":
        return (
          <div className="w-8 h-8 rounded-full bg-blue-900/40 flex items-center justify-center border border-blue-500/30 group-hover:border-blue-500/60 transition-all">
            <Mail className="h-4 w-4 text-blue-400" />
          </div>
        );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-5 h-full ${className}`}
    >
      <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
        Get in Touch
      </h3>

      <div className="space-y-3">
        {contact.map((cnt , index) => (
          <div key={cnt.type} className="flex items-center gap-3 group">
            {getIcon(cnt.type)}
            <div>
              <p className="text-xs text-gray-400">{cnt.title}</p>
              {cnt.link ? (
                <a
                  href={cnt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick(cnt.tracking!)}
                  className="text-sm text-white hover:text-purple-400 transition-colors text-ellipsis whitespace-nowrap overflow-hidden max-w-36"
                >
                  {cnt.value}
                </a>
              ) : (
                <p className="text-sm text-white">{cnt.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
