"use client"

import { useState } from "react"
import { motion, Reorder } from "framer-motion"

interface SequenceQuestionProps {
  items: string[]
  onChange: (sequence: string[]) => void
}

export function SequenceQuestion({ items, onChange }: SequenceQuestionProps) {
  const [sequence, setSequence] = useState(items)

  const handleReorder = (newSequence: string[]) => {
    setSequence(newSequence)
    onChange(newSequence)
  }

  return (
    <Reorder.Group
      axis="y"
      values={sequence}
      onReorder={handleReorder}
      className="space-y-2"
    >
      {sequence.map((item) => (
        <Reorder.Item
          key={item}
          value={item}
          className="cursor-move rounded-lg border bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#1c375b] text-white">
              {sequence.indexOf(item) + 1}
            </div>
            <span className="text-lg text-[#1c375b]">{item}</span>
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}

