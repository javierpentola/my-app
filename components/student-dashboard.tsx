"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Brain, FileQuestion, Combine } from 'lucide-react'

import { Flashcards } from "./flashcards"
import { CombineGame } from "./combine-game"
import { ExamInterface } from "./exam-interface"
import { LearnChat } from "./learn-chat"

type GameType = "none" | "flashcards" | "combine" | "exam" | "learn"

const features = [
  {
    title: "Flashcards",
    icon: BookOpen,
    color: "bg-[#d2544a]",
    type: "flashcards" as GameType,
  },
  {
    title: "Learn",
    icon: Brain,
    color: "bg-[#1c375b]",
    type: "learn" as GameType,
  },
  {
    title: "Exam",
    icon: FileQuestion,
    color: "bg-[#6f8197]",
    type: "exam" as GameType,
  },
  {
    title: "Combine",
    icon: Combine,
    color: "bg-[#cd4236]",
    type: "combine" as GameType,
  },
]

export function StudentDashboard() {
  const [currentGame, setCurrentGame] = useState<GameType>("none")

  if (currentGame === "flashcards") {
    return <Flashcards />
  }

  if (currentGame === "combine") {
    return <CombineGame />
  }

  if (currentGame === "exam") {
    return <ExamInterface />
  }

  if (currentGame === "learn") {
    return <LearnChat />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#f5f5f5] p-8"
    >
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-[#1c375b]">Welcome, Student!</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`${feature.color} cursor-pointer rounded-xl p-6 text-white transition-colors`}
              onClick={() => setCurrentGame(feature.type)}
            >
              <feature.icon className="mb-4 h-8 w-8" />
              <h2 className="text-2xl font-semibold">{feature.title}</h2>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

