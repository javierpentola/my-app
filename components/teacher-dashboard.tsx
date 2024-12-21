"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Pencil, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EditUnit } from "./edit-unit"

interface Unit {
  id: number
  title: string
  description: string
  pairs?: { id: string; question: string; answer: string }[]
}

const mockUnits: Unit[] = [
  {
    id: 1,
    title: "Basic Addition",
    description: "Learn to add numbers from 1 to 10",
    pairs: [
      { id: "1", question: "What is 5 + 3?", answer: "8" },
      { id: "2", question: "What is 7 + 4?", answer: "11" },
    ]
  },
  {
    id: 2,
    title: "Simple Subtraction",
    description: "Understanding how to subtract single digit numbers",
    pairs: [
      { id: "1", question: "What is 9 - 4?", answer: "5" },
      { id: "2", question: "What is 7 - 3?", answer: "4" },
    ]
  },
  {
    id: 3,
    title: "Multiplication Tables",
    description: "Master the multiplication tables from 1 to 10",
    pairs: [
      { id: "1", question: "What is 6 × 7?", answer: "42" },
      { id: "2", question: "What is 8 × 9?", answer: "72" },
    ]
  },
]

export function TeacherDashboard() {
  const [units, setUnits] = useState<Unit[]>(mockUnits)
  const [isCreating, setIsCreating] = useState(false)
  const [newUnit, setNewUnit] = useState({ title: "", description: "" })
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null)

  const handleCreateUnit = () => {
    if (newUnit.title && newUnit.description) {
      setUnits([
        ...units,
        {
          id: units.length + 1,
          ...newUnit,
          pairs: []
        },
      ])
      setNewUnit({ title: "", description: "" })
      setIsCreating(false)
    }
  }

  const handleDeleteUnit = (id: number) => {
    setUnits(units.filter((unit) => unit.id !== id))
  }

  const handleEditUnit = (unit: Unit) => {
    setEditingUnit(unit)
  }

  if (editingUnit) {
    return (
      <EditUnit
        unitId={editingUnit.id}
        unitTitle={editingUnit.title}
        initialPairs={editingUnit.pairs}
        onBack={() => setEditingUnit(null)}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#f5f5f5] p-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1c375b]">Teaching Units</h1>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-[#1c375b] hover:bg-[#1c375b]/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Unit
          </Button>
        </div>

        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 rounded-lg border bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 text-xl font-semibold text-[#1c375b]">Create New Unit</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newUnit.title}
                    onChange={(e) => setNewUnit({ ...newUnit, title: e.target.value })}
                    className="border-[#6f8197] focus-visible:ring-[#1c375b]"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newUnit.description}
                    onChange={(e) => setNewUnit({ ...newUnit, description: e.target.value })}
                    className="border-[#6f8197] focus-visible:ring-[#1c375b]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCreateUnit}
                    className="bg-[#1c375b] hover:bg-[#1c375b]/90"
                  >
                    Create
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false)
                      setNewUnit({ title: "", description: "" })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          <AnimatePresence>
            {units.map((unit) => (
              <motion.div
                key={unit.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1c375b]">{unit.title}</h3>
                    <p className="mt-1 text-[#6f8197]">{unit.description}</p>
                    {unit.pairs && (
                      <p className="mt-2 text-sm text-[#6f8197]">
                        {unit.pairs.length} questions
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditUnit(unit)}
                      className="text-[#6f8197] hover:text-[#1c375b]"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit unit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUnit(unit.id)}
                      className="text-[#d2544a] hover:text-[#cd4236]"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete unit</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

