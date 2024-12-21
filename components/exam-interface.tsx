"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { ExamSetup } from "./exam/exam-setup"
import { Exam } from "./exam/exam"

type ExamState = "setup" | "exam" | "finished"

export function ExamInterface() {
  const [examState, setExamState] = useState<ExamState>("setup")
  const [examSettings, setExamSettings] = useState<{
    unitId: string
    questionTypes: string[]
  } | null>(null)

  const handleStartExam = (settings: {
    unitId: string
    questionTypes: string[]
  }) => {
    setExamSettings(settings)
    setExamState("exam")
  }

  const handleFinishExam = () => {
    setExamState("finished")
    // Reset after 2 seconds
    setTimeout(() => {
      setExamState("setup")
      setExamSettings(null)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-8">
      <AnimatePresence mode="wait">
        {examState === "setup" && (
          <ExamSetup onStartExam={handleStartExam} />
        )}
        {examState === "exam" && examSettings && (
          <Exam
            settings={examSettings}
            onFinish={handleFinishExam}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

