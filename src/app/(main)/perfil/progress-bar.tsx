'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden w-full max-w-xs">
      <motion.div
        className="h-full bg-verde-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  )
}
