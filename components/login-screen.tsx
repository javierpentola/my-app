"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { LoadingAnimation } from "./loading-animation"
import { StudentCode } from "./student-code"
import { TeacherLogin } from "./teacher-login"
import { StudentDashboard } from "./student-dashboard"
import { TeacherDashboard } from "./teacher-dashboard"
import { Toaster } from "./ui/toaster"

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

