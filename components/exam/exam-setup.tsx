"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const mockUnits = [
  { id: 1, title: "Basic Addition" },
  { id: 2, title: "Simple Subtraction" },
  { id: 3, title: "Multiplication Tables" },
]

const questionTypes = [
  { id: "tf", label: "True/False" },
  { id: "mc", label: "Multiple Choice Questions" },
  { id: "match", label: "Matching Questions" },
  { id: "written", label: "Written Questions" },
  { id: "blank", label: "Fill in the blanks" },
  { id: "sequence", label: "Order in sequence" },
  { id: "category", label: "Categorization by groups" },
]

interface ExamSetupProps {
  onStartExam: (settings: {
    unitId: string
    questionTypes: string[]
  }) => void
}

export function ExamSetup({ onStartExam }: ExamSetupProps) {
  const [selectedUnit, setSelectedUnit] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const handleStartExam = () => {
    if (selectedUnit && selectedTypes.length > 0) {
      onStartExam({
        unitId: selectedUnit,
        questionTypes: selectedTypes,
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-2xl"
    >
      <div className="rounded-lg border bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-[#1c375b]">Exam Setup</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="unit">Select Unit</Label>
            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a unit" />
              </SelectTrigger>
              <SelectContent>
                {mockUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id.toString()}>
                    {unit.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Question Types</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              {questionTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={type.id}
                    checked={selectedTypes.includes(type.id)}
                    onCheckedChange={(checked) => {
                      setSelectedTypes(
                        checked
                          ? [...selectedTypes, type.id]
                          : selectedTypes.filter((t) => t !== type.id)
                      )
                    }}
                  />
                  <Label
                    htmlFor={type.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleStartExam}
            disabled={!selectedUnit || selectedTypes.length === 0}
            className="w-full bg-[#1c375b] hover:bg-[#1c375b]/90"
          >
            Start Exam
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

