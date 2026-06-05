'use client'

import { useCallback } from 'react'

import Link from 'next/link'

import { Particles, ParticlesProvider } from '@tsparticles/react'
import type { ParticlesPluginRegistrar } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { motion } from 'framer-motion'
import type { Easing } from 'framer-motion'

import { BrasaLogo } from '@/components/brasa/logo'

const ease: Easing = 'easeOut'

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

const brasaLetters = [
  { letter: 'B', accent: false },
  { letter: 'R', accent: false },
  { letter: 'A', accent: false },
  { letter: 'S', accent: true },
  { letter: 'A', accent: true },
]

const particlesOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: { value: 60 },
    color: { value: ['#009c3b', '#00c44b', '#33d66b', '#ffdf00'] },
    size: { value: { min: 1, max: 2.5 } },
    opacity: {
      value: { min: 0.06, max: 0.45 },
      animation: { enable: true, speed: 0.6, sync: false },
    },
    move: {
      enable: true,
      direction: 'top' as const,
      speed: { min: 0.4, max: 1.6 },
      random: true,
      straight: false,
      outModes: { default: 'out' as const },
    },
    shape: { type: 'circle' },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'repulse' },
    },
    modes: {
      repulse: { distance: 90, duration: 0.4 },
    },
  },
  detectRetina: true,
}

function HomeContent() {
  return (
    <main className="min-h-screen bg-brasa-bg flex flex-col items-center justify-center px-6 text-white relative overflow-hidden">
      {/* Particles — faíscas subindo */}
      <Particles
        id="brasa-particles"
        className="absolute inset-0 z-0 pointer-events-none"
        options={particlesOptions}
      />

      {/* Orbs atmosféricos */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <motion.div
          className="absolute -top-40 -left-20 w-[480px] h-[480px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(0,156,59,0.28) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255,223,0,0.18) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col items-center gap-12 max-w-xl w-full text-center relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0 }}
        >
          <BrasaLogo size="lg" />
        </motion.div>

        {/* Título — letra por letra com flip 3D */}
        <div className="flex flex-col items-center gap-3">
          <h1
            className="font-display text-7xl sm:text-9xl leading-none tracking-wide flex"
            style={{ perspective: '600px' }}
          >
            {brasaLetters.map(({ letter, accent }, i) => (
              <motion.span
                key={i}
                className={accent ? 'text-amarelo-400' : 'text-white'}
                initial={{ opacity: 0, y: 48, rotateX: -80 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.08 + i * 0.1,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="font-sans text-white/60 text-lg leading-snug"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.65 }}
          >
            O bolão mais quente da Copa
          </motion.p>
        </div>

        {/* Stats */}
        <div className="w-full flex items-start justify-center gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex-1 flex flex-col items-center gap-1 px-2 relative"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease, delay: 0.72 + i * 0.07 }}
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
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-row gap-3 w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 1.08 }}
        >
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

        {/* Footer */}
        <motion.p
          className="text-white/20 text-xs flex flex-col items-center gap-1"
          {...fadeIn(1.25)}
        >
          <span>Copa do Mundo 2026 · 48 jogos · Open source · MIT</span>
          <span>
            Feito por{' '}
            <a
              href="https://github.com/mauricioandrade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 hover:text-white/60 transition-colors underline underline-offset-2"
            >
              @mauricioandrade
            </a>
          </span>
        </motion.p>
      </div>
    </main>
  )
}

export function HomeAnimated() {
  const initEngine = useCallback<ParticlesPluginRegistrar>(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <ParticlesProvider init={initEngine}>
      <HomeContent />
    </ParticlesProvider>
  )
}
