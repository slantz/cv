"use client"

import {Github, Linkedin, MessageCircle, Send} from "lucide-react";
import {useTracking} from "@/hooks/use-tracking";

export function Footer() {
  const {trackButtonClick} = useTracking();

  return (
    <footer className="container mx-auto pt-12 pb-8 md:py-12 px-4 mt-32 relative z-10">
      <div className="max-w-5xl mx-auto border-t border-gray-800 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} John Doe. Built with
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mx-1">
                passion
              </span>
            for Web3.
          </p>

          {/* Footer Contact Links */}
          <div className="flex gap-4">
            <a
              href="https://t.me/johndoe_web3"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("telegram_footer")}
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Telegram</span>
            </a>
            <a
              href="https://discord.com/users/johndoe#1234"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("discord_footer")}
              className="text-gray-400 hover:text-pink-400 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Discord</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("linkedin_footer")}
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("github_footer")}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
