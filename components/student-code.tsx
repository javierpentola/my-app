"use client"

import { motion } from "framer-motion"
import { Users } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "./logo"

interface StudentCodeProps {
  onLogin: () => void
}

export function StudentCode({ onLogin }: StudentCodeProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="flex h-full flex-col bg-[#1c375b] p-8 text-white lg:p-12">
      <Logo color="white" className="mb-8" />
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm space-y-8"
        >
          <div className="space-y-2 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">Join Your Class</h2>
            <p className="text-[#6f8197]">Enter your class code to get started</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="class-code">Class Code</Label>
              <Input
                id="class-code"
                placeholder="Enter code"
                required
                className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-white/30"
              />
            </div>
            <Button type="submit" className="w-full bg-white text-[#1c375b] hover:bg-white/90">
              Join Class
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

