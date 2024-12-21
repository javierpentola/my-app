"use client"

import { motion } from "framer-motion"

export function LoadingAnimation() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c375b]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 5 }}
      onAnimationComplete={(definition) => {
        if (definition === "opacity") {
          document.body.style.overflow = "auto"
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-center"
      >
        <div className="relative h-24 w-24">
          {/* Four squares */}
          <motion.div
            className="absolute left-0 top-0 h-10 w-10 rounded-lg bg-[#d2544a]"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: 1, ease: "linear" }}
          />
          <motion.div
            className="absolute right-0 top-0 h-10 w-10 rounded-lg bg-[#d2544a]"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: 1, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-10 w-10 rounded-lg bg-[#d2544a]"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: 1, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-10 w-10 rounded-lg bg-[#d2544a]"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: 1, ease: "linear" }}
          />
        </div>
        <motion.div
          className="absolute -bottom-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-xl font-bold text-white">[UNAMED WEBSITE]</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

