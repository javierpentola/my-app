"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shuffle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { BackButton } from "./back-button"
import { PayPalButton } from "./paypal-button"

interface VocabPair {
  id: number
  english: string
  spanish: string
}

const mockVocabulary: VocabPair[] = [
  { id: 1, english: "House", spanish: "Casa" },
  { id: 2, english: "Dog", spanish: "Perro" },
  { id: 3, english: "Cat", spanish: "Gato" },
  { id: 4, english: "Book", spanish: "Libro" },
  { id: 5, english: "Tree", spanish: "Árbol" },
]

export function CombineGame() {
  const [words, setWords] = useState<(VocabPair & { isMatched?: boolean })[]>([])
  const [selectedWord, setSelectedWord] = useState<number | null>(null)
  const [matches, setMatches] = useState<number[]>([])
  const [score, setScore] = useState(0)

  const shuffleWords = () => {
    const shuffled = [...mockVocabulary]
      .sort(() => Math.random() - 0.5)
      .map(word => ({ ...word, isMatched: false }))
    setWords(shuffled)
    setMatches([])
    setScore(0)
    setSelectedWord(null)
  }

  useEffect(() => {
    shuffleWords()
  }, [])

  const handleWordClick = (id: number) => {
    if (matches.includes(id)) return

    if (selectedWord === null) {
      setSelectedWord(id)
    } else {
      const selectedPair = words.find(w => w.id === selectedWord)
      const clickedPair = words.find(w => w.id === id)

      if (selectedPair && clickedPair) {
        if (
          (selectedPair.english === clickedPair.english && selectedPair.spanish === clickedPair.spanish) ||
          (selectedPair.spanish === clickedPair.english && selectedPair.english === clickedPair.spanish)
        ) {
          setMatches(prev => [...prev, selectedWord, id])
          setScore(prev => prev + 1)
        }
      }
      setSelectedWord(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1c375b]">Match the Words</h1>
            <p className="mt-2 text-[#6f8197]">Click two matching words to make a pair</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#1c375b]">Score: {score}</div>
            <Button
              onClick={shuffleWords}
              className="mt-2 bg-[#1c375b] hover:bg-[#1c375b]/90"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Shuffle Words
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {words.map((word) => (
            <motion.button
              key={`${word.id}-${word.english}`}
              onClick={() => handleWordClick(word.id)}
              className={`relative h-24 rounded-lg p-4 text-lg font-medium shadow-md transition-colors ${
                matches.includes(word.id)
                  ? "bg-green-100 text-green-700"
                  : selectedWord === word.id
                  ? "bg-[#1c375b] text-white"
                  : "bg-white text-[#1c375b] hover:bg-[#1c375b]/10"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {word.english}
            </motion.button>
          ))}
          {words.map((word) => (
            <motion.button
              key={`${word.id}-${word.spanish}`}
              onClick={() => handleWordClick(word.id)}
              className={`relative h-24 rounded-lg p-4 text-lg font-medium shadow-md transition-colors ${
                matches.includes(word.id)
                  ? "bg-green-100 text-green-700"
                  : selectedWord === word.id
                  ? "bg-[#1c375b] text-white"
                  : "bg-white text-[#1c375b] hover:bg-[#1c375b]/10"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {word.spanish}
            </motion.button>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <BackButton />
          <PayPalButton />
        </div>
      </div>
    </div>
  )
}

