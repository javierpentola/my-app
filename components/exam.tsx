"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { TrueFalseQuestion } from "./question-types/true-false"
import { MultipleChoiceQuestion } from "./question-types/multiple-choice"
import { MatchingQuestion } from "./question-types/matching"
import { WrittenQuestion } from "./question-types/written"
import { FillBlanksQuestion } from "./question-types/fill-blanks"
import { SequenceQuestion } from "./question-types/sequence"
import { CategorizationQuestion } from "./question-types/categorization"
import { BackButton } from "../back-button"
import { PayPalButton } from "../paypal-button"

// Mock exam data based on selected types
const generateExamQuestions = (types: string[]) => {
  const questions = []

  if (types.includes("tf")) {
    questions.push({
      type: "tf",
      question: "The sum of two negative numbers is always negative.",
      id: "tf1",
    })
  }

  if (types.includes("mc")) {
    questions.push({
      type: "mc",
      question: "What is the result of 8 × 7?",
      options: ["54", "56", "58", "60"],
      id: "mc1",
    })
  }

  if (types.includes("match")) {
    questions.push({
      type: "match",
      items: [
        { left: "2 × 4", right: "8" },
        { left: "3 × 3", right: "9" },
        { left: "5 × 2", right: "10" },
      ],
      id: "match1",
    })
  }

  if (types.includes("written")) {
    questions.push({
      type: "written",
      question: "Explain how you would solve the equation: 2x + 5 = 13",
      id: "written1",
    })
  }

  if (types.includes("blank")) {
    questions.push({
      type: "blank",
      segments: [
        { type: "text", content: "If x = 5 and y = 3, then x + y = " },
        { type: "blank", content: "" },
        { type: "text", content: " and x - y = " },
        { type: "blank", content: "" },
      ],
      id: "blank1",
    })
  }

  if (types.includes("sequence")) {
    questions.push({
      type: "sequence",
      items: ["First multiply", "Then add", "Finally subtract", "Check your answer"],
      id: "sequence1",
    })
  }

  if (types.includes("category")) {
    questions.push({
      type: "category",
      categories: [
        { id: "even", name: "Even Numbers" },
        { id: "odd", name: "Odd Numbers" },
      ],
      items: [
        { id: "1", content: "2" },
        { id: "2", content: "3" },
        { id: "3", content: "4" },
        { id: "4", content: "5" },
      ],
      id: "category1",
    })
  }

  return questions
}

interface ExamProps {
  settings: {
    unitId: string
    questionTypes: string[]
  }
  onFinish: () => void
}

export function Exam({ settings, onFinish }: ExamProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const { toast } = useToast()
  
  const questions = generateExamQuestions(settings.questionTypes)

  const handleAnswer = (answer: any) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    toast({
      title: "Exam Submitted",
      description: "Your exam has been sent to your teacher. Please wait for your grades.",
    })
    onFinish()
  }

  const renderQuestion = () => {
    const question = questions[currentQuestion]

    switch (question.type) {
      case "tf":
        return (
          <TrueFalseQuestion
            question={question.question}
            value={answers[question.id] || ""}
            onChange={(value) => handleAnswer(value)}
          />
        )
      case "mc":
        return (
          <MultipleChoiceQuestion
            question={question.question}
            options={question.options}
            value={answers[question.id] || ""}
            onChange={(value) => handleAnswer(value)}
          />
        )
      case "match":
        return (
          <MatchingQuestion
            items={question.items}
            onChange={(matches) => handleAnswer(matches)}
          />
        )
      case "written":
        return (
          <WrittenQuestion
            question={question.question}
            value={answers[question.id] || ""}
            onChange={(value) => handleAnswer(value)}
          />
        )
      case "blank":
        return (
          <FillBlanksQuestion
            segments={question.segments}
            values={answers[question.id] || []}
            onChange={(values) => handleAnswer(values)}
          />
        )
      case "sequence":
        return (
          <SequenceQuestion
            items={question.items}
            onChange={(sequence) => handleAnswer(sequence)}
          />
        )
      case "category":
        return (
          <CategorizationQuestion
            categories={question.categories}
            items={question.items}
            onChange={(items) => handleAnswer(items)}
          />
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-4xl"
    >
      <div className="rounded-lg border bg-white p-8 shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1c375b]">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <div className="text-sm text-[#6f8197]">
            Unit: {settings.unitId}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-[300px]"
          >
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <BackButton />
          <PayPalButton />
        </div>
      </div>
    </motion.div>
  )
}

