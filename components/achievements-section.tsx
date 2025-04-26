"use client"

import { motion } from "framer-motion"
import { Award, Star, Trophy, Target, Zap, BarChart, Globe, Lightbulb } from 'lucide-react'

interface AchievementProps {
  icon: React.ReactNode
  text: string
}

const Achievement = ({ icon, text }: AchievementProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-start gap-3 group"
  >
    <div className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center border border-gray-700 group-hover:border-purple-500/50 transition-all mt-0.5 flex-shrink-0">
      {icon}
    </div>
    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{text}</p>
  </motion.div>
)

export function AchievementsSection() {
  const achievements = [
    {
      icon: <Trophy className="h-4 w-4 text-amber-400" />,
      text: "Winner of the 2023 Global Blockchain Hackathon - DeFi Innovation Award",
    },
    {
      icon: <Star className="h-4 w-4 text-purple-400" />,
      text: "Contributed to 3 top-100 cryptocurrency projects with over $500M TVL",
    },
    {
      icon: <BarChart className="h-4 w-4 text-cyan-400" />,
      text: "Optimized smart contract gas usage by 40% for a major NFT marketplace",
    },
    {
      icon: <Zap className="h-4 w-4 text-yellow-400" />,
      text: "Developed a flash loan arbitrage system generating $2.5M in profits",
    },
    {
      icon: <Globe className="h-4 w-4 text-blue-400" />,
      text: "Speaker at ETH Global, DevCon, and 5 other international blockchain conferences",
    },
    {
      icon: <Lightbulb className="h-4 w-4 text-amber-400" />,
      text: "Published author of 'Web3 Development Patterns' with 15K+ downloads",
    },
    {
      icon: <Target className="h-4 w-4 text-red-400" />,
      text: "Successfully audited and secured over $100M in smart contract value",
    },
    {
      icon: <Award className="h-4 w-4 text-green-400" />,
      text: "Certified Ethereum Developer with specialization in zero-knowledge proofs",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto mb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 inline-block mb-2">
          Achievements
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <Achievement key={index} icon={achievement.icon} text={achievement.text} />
        ))}
      </div>
    </div>
  )
}

