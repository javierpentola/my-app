"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Logo } from "./logo"

type FormState = "login" | "register" | "forgot-password"

interface TeacherLoginProps {
  onLogin: () => void
}

export function TeacherLogin({ onLogin }: TeacherLoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState<FormState>("login")
  const { toast } = useToast()

  const formVariants = {
    enter: {
      x: 20,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: -20,
      opacity: 0
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    if (formState === "register") {
      toast({
        title: "Account Created",
        description: `We've sent a confirmation email to ${email}. Please check your inbox to verify your account.`,
      })
      setFormState("login")
    } else if (formState === "forgot-password") {
      toast({
        title: "Password Reset Email Sent",
        description: `We've sent password reset instructions to ${email}. Please check your inbox.`,
      })
      setFormState("login")
    } else {
      // For testing, any login attempt will succeed
      onLogin()
    }
  }

  return (
    <div className="flex h-full flex-col p-8 lg:p-12">
      <Logo color="black" className="mb-8" />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {formState === "forgot-password" ? (
              <motion.form
                key="forgot-password"
                initial="enter"
                animate="center"
                exit="exit"
                variants={formVariants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold text-[#1c375b]">Reset Password</h1>
                  <p className="text-[#6f8197]">
                    Enter your email address and we'll send you a link to reset your password
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      required
                      className="border-[#6f8197] focus-visible:ring-[#1c375b]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#1c375b] hover:bg-[#1c375b]/90">
                    Send Reset Link
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-[#6f8197]"
                    onClick={() => setFormState("login")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key={formState}
                initial="enter"
                animate="center"
                exit="exit"
                variants={formVariants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold text-[#1c375b]">
                    {formState === "register" ? "Create Account" : "Welcome Back"}
                  </h1>
                  <p className="text-[#6f8197]">
                    {formState === "register"
                      ? "Create your teacher account to get started"
                      : "Enter your credentials to access your account"}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      required
                      className="border-[#6f8197] focus-visible:ring-[#1c375b]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="border-[#6f8197] pr-10 focus-visible:ring-[#1c375b]"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-[#6f8197] hover:text-[#1c375b]"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  {formState === "register" && (
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          name="confirm-password"
                          type={showPassword ? "text" : "password"}
                          required
                          className="border-[#6f8197] pr-10 focus-visible:ring-[#1c375b]"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 text-[#6f8197] hover:text-[#1c375b]"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </div>
                  )}
                  {formState === "login" && (
                    <div className="flex items-center justify-end">
                      <Button
                        type="button"
                        variant="link"
                        className="text-sm text-[#d2544a] hover:text-[#cd4236]"
                        onClick={() => setFormState("forgot-password")}
                      >
                        Forgot your password?
                      </Button>
                    </div>
                  )}
                  <Button type="submit" className="w-full bg-[#1c375b] hover:bg-[#1c375b]/90">
                    {formState === "register" ? "Create Account" : "Sign In"}
                  </Button>
                  <div className="text-center text-sm">
                    {formState === "register" ? "Already have an account?" : "Don't have an account?"}{" "}
                    <Button
                      type="button"
                      variant="link"
                      className="text-[#d2544a] hover:text-[#cd4236]"
                      onClick={() => setFormState(formState === "register" ? "login" : "register")}
                    >
                      {formState === "register" ? "Sign In" : "Create Account"}
                    </Button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

