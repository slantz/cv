"use client"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  glowColor?: string
  variant?: "primary" | "secondary"
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, children, glowColor = "rgba(168, 85, 247, 0.5)", variant = "primary", ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all rounded-full"

    const variantStyles = {
      primary: "bg-gradient-to-r from-purple-500 to-pink-600 text-white",
      secondary: "bg-transparent border border-cyan-500 text-cyan-400",
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center">{children}</span>

        {/* Glow effect */}
        <motion.span
          className="absolute inset-0 rounded-full blur-md"
          style={{
            background:
              variant === "primary"
                ? "linear-gradient(to right, rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5))"
                : "rgba(34, 211, 238, 0.3)",
            opacity: 0,
          }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    )
  },
)

GlowButton.displayName = "GlowButton"
