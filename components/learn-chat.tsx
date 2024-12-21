"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BackButton } from "./back-button"
import { PayPalButton } from "./paypal-button"

export function LearnChat() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm your AI tutor. What would you like to learn about?", isUser: false }
  ])
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages([...messages, { text: input, isUser: true }])
    setInput("")
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "[NOT YET IMPLEMENTED]", isUser: false }])
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-[#1c375b]">AI Tutor</h1>
        
        <div className="relative min-h-[600px] rounded-lg border bg-white p-6 shadow-lg">
          <div className="mb-4 space-y-4 pb-20">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.isUser
                      ? 'bg-[#1c375b] text-white'
                      : 'bg-gray-100 text-[#1c375b]'
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="absolute bottom-0 left-0 right-0 bg-white p-4"
          >
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" className="bg-[#1c375b] hover:bg-[#1c375b]/90">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <BackButton />
          <PayPalButton />
        </div>
      </div>
    </div>
  )
}

