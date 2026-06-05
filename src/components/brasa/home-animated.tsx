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

const scoreCards = [
  { value: '7', label: 'placar exato', color: 'text-amarelo-400' },
  { value: '3', label: 'vencedor certo', color: 'text-verde-500' },
  { value: '1.5×', label: 'mata-mata', color: 'text-amarelo-400' },
]

export function HomeAnimated() {
  return (
    <main className="min-h-screen bg-brasa-bg flex flex-col items-center justify-center px-6 text-white">
      <div className="flex flex-col items-center gap-10 max-w-xl w-full text-center">
        {/* Logo — fadeIn + slideUp, delay 0 */}
        <motion.div {...fadeUp(0)}>
          <BrasaLogo size="lg" />
        </motion.div>

        {/* Description — fadeIn, delay 0.2 */}
        <motion.div className="flex flex-col gap-3" {...fadeIn(0.2)}>
          <p className="text-white/60 text-lg leading-relaxed">
            Palpite no placar, acerte o artilheiro e dispute ponto a ponto com seus amigos durante
            toda a Copa do Mundo 2026.
          </p>
        </motion.div>

        {/* Score cards — stagger, delay 0.1 each starting at 0.3 */}
        <div className="grid grid-cols-3 gap-4 w-full text-sm">
          {scoreCards.map((item, i) => (
            <motion.div
              key={item.label}
              className="bg-brasa-surface rounded-xl p-4 flex flex-col gap-1 border border-white/5"
              {...fadeIn(0.3 + i * 0.1)}
            >
              <span className={`font-display ${item.color} text-3xl`}>{item.value}</span>
              <span className="text-white/50">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Buttons — fadeIn, delay 0.6 */}
        <motion.div className="flex flex-col sm:flex-row gap-3 w-full" {...fadeIn(0.6)}>
          <Link
            href="/login"
            className="flex-1 h-12 flex items-center justify-center rounded-full bg-verde-500 hover:bg-verde-600 font-semibold transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/jogos"
            className="flex-1 h-12 flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 transition-colors text-white/70 hover:text-white"
          >
            Ver jogos
          </Link>
        </motion.div>

        <p className="text-white/25 text-xs">Copa do Mundo 2026 · 48 jogos · Open source</p>
      </div>
    </main>
  )
}
