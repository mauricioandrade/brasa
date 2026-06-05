'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'
import type { Easing } from 'framer-motion'

import { BrasaLogo } from '@/components/brasa/logo'

const ease: Easing = 'easeOut'

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease, delay },
  }
}

function fadeIn(delay: number) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease, delay },
  }
}

const stats = [
  { value: '7', label: 'exato' },
  { value: '4', label: 'empate' },
  { value: '3', label: 'vencedor' },
  { value: '+2', label: 'artilheiro' },
  { value: '1.5×', label: 'mata-mata' },
]

export function HomeAnimated() {
  return (
    <main className="min-h-screen bg-brasa-bg flex flex-col items-center justify-center px-6 text-white">
      <div className="flex flex-col items-center gap-12 max-w-xl w-full text-center">
        {/* Logo — fadeIn + slideDown, delay 0 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0 }}
        >
          <BrasaLogo size="lg" />
        </motion.div>

        {/* Hero title */}
        <motion.div className="flex flex-col items-center gap-3" {...fadeUp(0.15)}>
          <h1 className="font-display text-7xl sm:text-9xl leading-none tracking-wide">
            <span className="text-white">BRA</span>
            <span className="text-amarelo-400">SA</span>
          </h1>
          <p className="font-sans text-white/60 text-lg leading-snug">
            O bolão mais quente da Copa
          </p>
        </motion.div>

        {/* Stats strip — stagger */}
        <motion.div className="w-full flex items-start justify-center gap-0" {...fadeIn(0.3)}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex-1 flex flex-col items-center gap-1 px-2 relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease, delay: 0.35 + i * 0.07 }}
            >
              {i > 0 && (
                <span className="absolute left-0 top-1 text-white/10 text-xl select-none">·</span>
              )}
              <span className="font-display text-3xl text-amarelo-400 leading-none">
                {stat.value}
              </span>
              <span className="text-xs text-white/40 uppercase tracking-widest leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div className="flex flex-row gap-3 w-full" {...fadeUp(0.7)}>
          <Link
            href="/jogos"
            className="flex-1 h-12 flex items-center justify-center rounded-full bg-verde-500 hover:bg-verde-600 font-semibold transition-colors text-white"
          >
            Fazer palpites
          </Link>
          <Link
            href="/ranking"
            className="flex-1 h-12 flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 transition-colors text-white/70 hover:text-white"
          >
            Ver ranking
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p className="text-white/20 text-xs" {...fadeIn(0.85)}>
          Copa do Mundo 2026 · 48 jogos · Open source · MIT
        </motion.p>
      </div>
    </main>
  )
}
