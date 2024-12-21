"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface WrittenQuestionProps {
  question: string
  onChange: (value: string) => void
  value: string
}

export function WrittenQuestion({ question, onChange, value }: WrittenQuestionProps) {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-medium text-[#1c375b]">{question}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your answer here..."
        className="min-h-[150px] resize-none"
      />
    </div>
  )
}

