"use client"

import {ReactNode} from "react";
import { motion } from "framer-motion"
import { Award, Star, Trophy, Target, Zap, BarChart, Globe, Lightbulb, Medal, Crown } from 'lucide-react'
import type {CVData} from "@/types/core";

interface AchievementProps {
  icon: ReactNode
  text: string
}

interface AchievementsProps {
  achievements: CVData['about']['achievements']
}

const Achievement = ({ icon, text }: AchievementProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-center gap-3 group"
  >
    <div className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center border border-gray-700 group-hover:border-slate-500/50 transition-all mt-0.5 flex-shrink-0">
      {icon}
    </div>
    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{text}</p>
  </motion.div>
)

export function AchievementsSection(props: AchievementsProps) {
  const achievementsIcons = [
    <Trophy className="h-4 w-4 text-amber-400" />,
    <Star className="h-4 w-4 text-purple-400" />,
    <Crown className="h-4 w-4 text-cyan-400" />,
    <Zap className="h-4 w-4 text-yellow-400" />,
    <Globe className="h-4 w-4 text-blue-400" />,
    <Lightbulb className="h-4 w-4 text-amber-400" />,
    <Target className="h-4 w-4 text-red-400" />,
    <Award className="h-4 w-4 text-green-400" />,
    <Medal className="h-4 w-4 text-indigo-400" />,
    <BarChart className="h-4 w-4 text-pink-400" />
  ];

  const achievementsWithIcons = props.achievements.map((achievement, index) => ({
    icon: achievementsIcons[index % props.achievements.length] as ReactNode,
    text: achievement.text
  }))

  return (
    <div className="max-w-4xl mx-auto mb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 inline-block mb-2">
          Achievements
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievementsWithIcons.map((achievement, index) => (
          <Achievement key={index} icon={achievement.icon} text={achievement.text} />
        ))}
      </div>
    </div>
  )
}

