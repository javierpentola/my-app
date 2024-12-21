"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface Category {
  id: string
  name: string
}

interface Item {
  id: string
  content: string
  categoryId?: string
}

interface CategorizationQuestionProps {
  categories: Category[]
  items: Item[]
  onChange: (categorizedItems: Item[]) => void
}

export function CategorizationQuestion({
  categories,
  items: initialItems,
  onChange,
}: CategorizationQuestionProps) {
  const [items, setItems] = useState(initialItems)

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData("itemId", itemId)
  }

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault()
    const itemId = e.dataTransfer.getData("itemId")
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, categoryId } : item
    )
    setItems(newItems)
    onChange(newItems)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        {items
          .filter((item) => !item.categoryId)
          .map((item) => (
            <motion.div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              className="cursor-move rounded-lg border bg-white p-3 shadow-sm"
              whileHover={{ scale: 1.02 }}
            >
              {item.content}
            </motion.div>
          ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <div
            key={category.id}
            onDrop={(e) => handleDrop(e, category.id)}
            onDragOver={handleDragOver}
            className="rounded-lg border border-dashed p-4"
          >
            <h3 className="mb-4 text-lg font-semibold text-[#1c375b]">
              {category.name}
            </h3>
            <div className="min-h-[100px] space-y-2">
              {items
                .filter((item) => item.categoryId === category.id)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    className="cursor-move rounded-lg border bg-white p-3 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    {item.content}
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

