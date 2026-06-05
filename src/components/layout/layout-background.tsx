'use client'

import { motion } from 'framer-motion'

import { GlobalParticles } from '@/components/layout/global-particles'

export function LayoutBackground() {
  return (
    <>
      <GlobalParticles />

      {/* Orb verde — top-left */}
      <motion.div
        className="fixed -top-40 -left-20 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(0,156,59,0.20) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Orb amarelo — bottom-right */}
      <motion.div
        className="fixed -bottom-32 -right-16 w-[380px] h-[380px] rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(255,223,0,0.10) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        aria-hidden="true"
      />

      {/* Orb verde — center-right */}
      <motion.div
        className="fixed top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(0,156,59,0.07) 0%, transparent 70%)' }}
        animate={{ scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden="true"
      />
    </>
  )
}
