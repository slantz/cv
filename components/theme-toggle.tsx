"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-cyan-500 hover:border-cyan-400 hover:bg-cyan-950/20"
      >
        <Sun className="h-5 w-5 text-cyan-400" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full border-cyan-500 hover:border-cyan-400 hover:bg-cyan-950/20"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-cyan-400" /> : <Moon className="h-5 w-5 text-cyan-400" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
