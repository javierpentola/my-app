"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { BackButton } from "./back-button"
import { PayPalButton } from "./paypal-button"

interface Flashcard {
  id: number
  question: string
  answer: string
}

const mockFlashcards: Flashcard[] = [
  {
    id: 1,
    question: "What is 8 × 7?",
    answer: "56",
  },
  {
    id: 2,
    question: "What is the square root of 144?",
    answer: "12",
  },
  {
    id: 3,
    question: "What is 15% of 80?",
    answer: "12",
  },
]

export function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setIsFlipped(false)
    setDirection(1)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % mockFlashcards.length)
    }, 300)
  }

  const handlePrevious = () => {
    setIsFlipped(false)
    setDirection(-1)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + mockFlashcards.length) % mockFlashcards.length)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1c375b]">Math Flashcards</h1>
          <p className="mt-2 text-[#6f8197]">Click the card to reveal the answer</p>
        </div>
        <div className="relative h-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ 
                opacity: 0,
                x: direction * 200
              }}
              animate={{ 
                opacity: 1,
                x: 0
              }}
              exit={{ 
                opacity: 0,
                x: direction * -200
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <motion.div
                className="flex h-full cursor-pointer flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-lg"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                  perspective: "1000px",
                }}
              >
                <div
                  style={{
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {isFlipped ? (
                    <div className="text-3xl font-bold text-[#d2544a]">
                      {mockFlashcards[currentIndex].answer}
                    </div>
                  ) : (
                    <div className="text-2xl text-[#1c375b]">
                      {mockFlashcards[currentIndex].question}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            className="h-12 w-12"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous card</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFlipped(!isFlipped)}
            className="h-12 w-12"
          >
            <RotateCw className="h-6 w-6" />
            <span className="sr-only">Flip card</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="h-12 w-12"
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next card</span>
          </Button>
        </div>
        <div className="mt-4 text-center text-sm text-[#6f8197]">
          Card {currentIndex + 1} of {mockFlashcards.length}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <BackButton />
          <PayPalButton />
        </div>
      </div>
    </div>
  )
}

