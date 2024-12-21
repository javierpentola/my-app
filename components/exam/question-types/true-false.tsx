"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface TrueFalseQuestionProps {
  question: string
  onChange: (value: string) => void
  value: string
}

export function TrueFalseQuestion({ question, onChange, value }: TrueFalseQuestionProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-[#1c375b]">{question}</p>
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="true" />
            <Label htmlFor="true">True</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="false" />
            <Label htmlFor="false">False</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}

