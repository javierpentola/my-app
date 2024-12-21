"use client"

import { motion } from "framer-motion"

interface LogoProps {
  className?: string
  color: "black" | "white"
}

export function Logo({ className = "", color }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative h-10 w-10">
        {/* Four squares */}
        <div className={`absolute left-0 top-0 h-4 w-4 rounded-sm ${color === "white" ? "bg-white" : "bg-[#1c375b]"}`} />
        <div className={`absolute right-0 top-0 h-4 w-4 rounded-sm ${color === "white" ? "bg-white" : "bg-[#1c375b]"}`} />
        <div className={`absolute bottom-0 left-0 h-4 w-4 rounded-sm ${color === "white" ? "bg-white" : "bg-[#1c375b]"}`} />
        <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-sm ${color === "white" ? "bg-white" : "bg-[#1c375b]"}`} />
        {/* Cross in the middle - adjusted to be longer at bottom */}
        <div className={`absolute left-1/2 top-1/2 h-8 w-1 -translate-x-1/2 -translate-y-1/3 ${color === "white" ? "bg-white" : "bg-[#1c375b]"}`} />
        <div className={`absolute left-1/2 top-1/2 h-1 w-6 -translate-x-1/2 -translate-y-1/2 ${color === "white" ? "bg-white" : "bg-[#1c375b]"}`} />
      </div>
      <span className={`text-lg font-bold ${color === "white" ? "text-white" : "text-[#1c375b]"}`}>[UNAMED WEBSITE]</span>
    </div>
  )
}

