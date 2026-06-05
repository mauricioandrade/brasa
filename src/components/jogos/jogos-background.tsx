'use client'

import { motion } from 'framer-motion'

export function JogosBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* orb verde top-left */}
      <motion.div
        className="absolute -top-60 -left-40 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,156,59,0.18) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* orb amarelo bottom-right */}
      <motion.div
        className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,223,0,0.12) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      {/* orb verde center-right sutil */}
      <motion.div
        className="absolute top-1/3 -right-60 w-[400px] h-[400px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,156,59,0.08) 0%, transparent 65%)' }}
        animate={{ scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}
