"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface MultipleChoiceQuestionProps {
  question: string
  options: string[]
  onChange: (value: string) => void
  value: string
}

export function MultipleChoiceQuestion({
  question,
  options,
  onChange,
  value,
}: MultipleChoiceQuestionProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-[#1c375b]">{question}</p>
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="flex flex-col gap-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

