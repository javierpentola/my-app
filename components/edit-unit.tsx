"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, Save, Trash2, Check } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface QAPair {
  id: string
  question: string
  answer: string
}

interface EditUnitProps {
  unitId: number
  unitTitle: string
  initialPairs?: QAPair[]
  onBack: () => void
}

export function EditUnit({ unitId, unitTitle, initialPairs = [], onBack }: EditUnitProps) {
  const [pairs, setPairs] = useState<QAPair[]>(initialPairs.length > 0 ? initialPairs : [{ 
    id: '1', 
    question: '', 
    answer: '' 
  }])
  const { toast } = useToast()

  const addNewPair = () => {
    setPairs([...pairs, { 
      id: Date.now().toString(), 
      question: '', 
      answer: '' 
    }])
  }

  const updatePair = (id: string, field: 'question' | 'answer', value: string) => {
    setPairs(pairs.map(pair => 
      pair.id === id ? { ...pair, [field]: value } : pair
    ))
  }

  const deletePair = (id: string) => {
    if (pairs.length > 1) {
      setPairs(pairs.filter(pair => pair.id !== id))
    }
  }

  const handleSave = () => {
    toast({
      title: "Unit Saved",
      description: "All changes have been saved successfully.",
    })
  }

  const handleFinish = () => {
    const emptyFields = pairs.some(pair => !pair.question || !pair.answer)
    if (emptyFields) {
      toast({
        title: "Incomplete Fields",
        description: "Please fill in all questions and answers before finishing.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Unit Completed",
      description: "The unit has been saved and is ready for students.",
    })
    onBack()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-[#f5f5f5] p-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-10 w-10 text-[#6f8197] hover:text-[#1c375b]"
            >
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Go back</span>
            </Button>
            <h1 className="text-3xl font-bold text-[#1c375b]">Edit Unit: {unitTitle}</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSave}
              className="gap-2 text-[#6f8197] hover:text-[#1c375b]"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button
              onClick={handleFinish}
              className="gap-2 bg-[#1c375b] hover:bg-[#1c375b]/90"
            >
              <Check className="h-4 w-4" />
              Finish
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-6 grid grid-cols-2 gap-8">
            <h2 className="text-lg font-semibold text-[#1c375b]">Questions</h2>
            <h2 className="text-lg font-semibold text-[#1c375b]">Answers</h2>
          </div>

          <div className="space-y-4">
            {pairs.map((pair, index) => (
              <motion.div
                key={pair.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 gap-8"
              >
                <div className="relative">
                  <Input
                    value={pair.question}
                    onChange={(e) => updatePair(pair.id, 'question', e.target.value)}
                    placeholder={`Question ${index + 1}`}
                    className="border-[#6f8197] pr-10 focus-visible:ring-[#1c375b]"
                  />
                  {pairs.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deletePair(pair.id)}
                      className="absolute right-0 top-0 h-full px-3 text-[#6f8197] hover:text-[#d2544a]"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete pair</span>
                    </Button>
                  )}
                </div>
                <Input
                  value={pair.answer}
                  onChange={(e) => updatePair(pair.id, 'answer', e.target.value)}
                  placeholder={`Answer ${index + 1}`}
                  className="border-[#6f8197] focus-visible:ring-[#1c375b]"
                />
              </motion.div>
            ))}
          </div>

          <Button
            onClick={addNewPair}
            variant="outline"
            className="mt-6 w-full gap-2 text-[#6f8197] hover:text-[#1c375b]"
          >
            <Plus className="h-4 w-4" />
            Add Question
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

