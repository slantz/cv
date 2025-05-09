"use client"

import {Github, Linkedin, MessageCircle, Send} from "lucide-react";
import {useTracking} from "@/hooks/use-tracking";
import type {CVData} from "@/types/core";

interface FooterProps {
  social: CVData['about']['social'];
}

export function Footer({ social }: FooterProps) {
  const {trackButtonClick} = useTracking();

  return (
    <footer className="container mx-auto pt-12 pb-8 md:py-12 px-4 mt-32 relative z-10">
      <div className="max-w-5xl mx-auto border-t border-gray-800 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} Alex Kobylinski — Built with
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mx-1">
                passion
              </span>
              for Frontend.
            </p>
            <p>
              Powered by <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mx-1">Next.js · Tailwind · Firebase · Bun</span>
            </p>
            <p>
              <a
                href="https://github.com/slantz/cv"
                target="_blank"
                rel="noopener noreferrer"
                title="Alex CV Project"
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 hover:text-purple-400 transition-colors"
              >
                github.com/slantz/cv
              </a>.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={social.telegram.link.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.telegram.link.value}
              onClick={() => trackButtonClick(social.telegram.tracking)}
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">{social.telegram.link.value}</span>
            </a>
            <a
              href={social.discord.link.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.discord.link.value}
              onClick={() => trackButtonClick(social.discord.tracking)}
              className="text-gray-400 hover:text-pink-400 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">{social.discord.link.value}</span>
            </a>
            <a
              href={social.linkedin.link.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.linkedin.link.value}
              onClick={() => trackButtonClick(social.linkedin.tracking)}
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">{social.linkedin.link.value}</span>
            </a>
            <a
              href={social.github.link.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.github.link.value}
              onClick={() => trackButtonClick(social.github.tracking)}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">{social.github.link.value}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
