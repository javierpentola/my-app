"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface MatchingQuestionProps {
  items: Array<{ left: string; right: string }>
  onChange: (matches: Array<{ left: string; right: string }>) => void
}

export function MatchingQuestion({ items, onChange }: MatchingQuestionProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matches, setMatches] = useState<Array<{ left: string; right: string }>>([])

  const handleItemClick = (side: "left" | "right", value: string) => {
    if (side === "left") {
      setSelectedLeft(value)
    } else if (selectedLeft) {
      const newMatch = { left: selectedLeft, right: value }
      const newMatches = [...matches, newMatch]
      setMatches(newMatches)
      setSelectedLeft(null)
      onChange(newMatches)
    }
  }

  const isMatched = (value: string, side: "left" | "right") => {
    return matches.some((match) => match[side] === value)
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.button
            key={`left-${index}`}
            onClick={() => !isMatched(item.left, "left") && handleItemClick("left", item.left)}
            className={`w-full rounded-lg border p-3 text-left transition-colors ${
              selectedLeft === item.left
                ? "border-[#1c375b] bg-[#1c375b] text-white"
                : isMatched(item.left, "left")
                ? "border-green-500 bg-green-50"
                : "border-[#6f8197] hover:border-[#1c375b]"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isMatched(item.left, "left")}
          >
            {item.left}
          </motion.button>
        ))}
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.button
            key={`right-${index}`}
            onClick={() => !isMatched(item.right, "right") && handleItemClick("right", item.right)}
            className={`w-full rounded-lg border p-3 text-left transition-colors ${
              isMatched(item.right, "right")
                ? "border-green-500 bg-green-50"
                : "border-[#6f8197] hover:border-[#1c375b]"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isMatched(item.right, "right")}
          >
            {item.right}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

