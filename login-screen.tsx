"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { LoadingAnimation } from "./components/loading-animation"
import { StudentCode } from "./components/student-code"
import { TeacherLogin } from "./components/teacher-login"
import { StudentDashboard } from "./components/student-dashboard"
import { TeacherDashboard } from "./components/teacher-dashboard"
import { Toaster } from "./components/toaster"

type UserType = "none" | "student" | "teacher"

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [userType, setUserType] = useState<UserType>("none")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {userType === "none" ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid min-h-screen lg:grid-cols-2"
          >
            <TeacherLogin onLogin={() => setUserType("teacher")} />
            <StudentCode onLogin={() => setUserType("student")} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {userType === "student" ? <StudentDashboard /> : <TeacherDashboard />}
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster />
    </>
  )
}

