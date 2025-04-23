"use client"

import { useState } from "react"
import { signInWithGitHub, signOut } from "@/lib/firebase-auth"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, Github, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function AuthButton() {
  const { user, isLoading, isAdmin } = useAuth()
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      setIsAuthLoading(true)
      await signInWithGitHub()
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsAuthLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      setIsAuthLoading(true)
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setIsAuthLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled className="h-9 px-4">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span className="ml-2">Loading...</span>
      </Button>
    )
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-9 px-2 gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
              <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block">{user.displayName}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isAdmin && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/admin" className="cursor-pointer">
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/contact-messages" className="cursor-pointer">
                  Contact Messages
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500 focus:text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSignIn}
      disabled={isAuthLoading}
      className="h-9 px-4 border-gray-700 hover:bg-gray-800"
    >
      {isAuthLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
      ) : (
        <Github className="mr-2 h-4 w-4" />
      )}
      <span>Login</span>
    </Button>
  )
}
