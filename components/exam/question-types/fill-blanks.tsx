"use client"

import { Input } from "@/components/ui/input"

interface FillBlanksQuestionProps {
  segments: Array<{ type: "text" | "blank"; content: string }>
  onChange: (answers: string[]) => void
  values: string[]
}

export function FillBlanksQuestion({ segments, onChange, values }: FillBlanksQuestionProps) {
  const handleChange = (index: number, value: string) => {
    const newValues = [...values]
    newValues[index] = value
    onChange(newValues)
  }

  let blankCount = 0

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {segments.map((segment, index) => {
          if (segment.type === "text") {
            return (
              <span key={index} className="text-lg text-[#1c375b]">
                {segment.content}
              </span>
            )
          } else {
            const blankIndex = blankCount++
            return (
              <Input
                key={index}
                value={values[blankIndex] || ""}
                onChange={(e) => handleChange(blankIndex, e.target.value)}
                className="inline-block w-32 border-b-2 border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-[#1c375b]"
                placeholder="________"
              />
            )
          }
        })}
      </div>
    </div>
  )
}

