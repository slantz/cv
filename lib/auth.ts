import type { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

// List of GitHub IDs that are allowed to access admin pages
// In a real app, you might want to store this in a database or environment variable
const ALLOWED_GITHUB_IDS = [
  process.env.ALLOWED_GITHUB_ID || "", // Add your GitHub ID here
]

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Only allow sign in with GitHub
      if (account?.provider !== "github") {
        return false
      }

      // Check if the user's GitHub ID is in the allowed list
      if (user.id && ALLOWED_GITHUB_IDS.includes(user.id)) {
        return true
      }

      // If we're in development mode, allow all logins for easier testing
      if (process.env.NODE_ENV === "development") {
        console.log("Development mode: Allowing all GitHub logins")
        return true
      }

      // Otherwise, deny access
      console.log(`Unauthorized access attempt by GitHub user ID: ${user.id}`)
      return false
    },
    async session({ session, token }) {
      // Add user ID to the session
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      // Add user ID to the token
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
