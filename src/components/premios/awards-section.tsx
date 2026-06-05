'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import type { AwardCategory, Phase } from '@prisma/client'

import { PhaseAwardCard } from './phase-award-card'

interface PhaseAward {
  id: string
  phase: Phase
  category: AwardCategory
  playerName: string
  team: string
  flag: string
  stat: string | null
}

const PHASE_ORDER: Phase[] = ['GROUP', 'ROUND_OF_16', 'QUARTER_FINAL', 'SEMI_FINAL', 'FINAL']

const PHASE_LABELS: Record<Phase, string> = {
  GROUP: 'Fase de Grupos',
  ROUND_OF_16: 'Oitavas de Final',
  QUARTER_FINAL: 'Quartas de Final',
  SEMI_FINAL: 'Semifinais',
  THIRD_PLACE: 'Terceiro Lugar',
  FINAL: 'Final',
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export function AwardsSection() {
  const [awards, setAwards] = useState<PhaseAward[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/premios')
      .then((r) => r.json())
      .then((data: PhaseAward[]) => {
        setAwards(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        {[0, 1].map((i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="h-5 w-40 bg-white/5 rounded animate-pulse" />
            <div className="flex gap-4">
              {[0, 1, 2, 3].map((j) => (
                <div key={j} className="w-36 h-48 bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const grouped = PHASE_ORDER.reduce<Record<string, PhaseAward[]>>((acc, phase) => {
    const phaseAwards = awards.filter((a) => a.phase === phase)
    if (phaseAwards.length > 0) acc[phase] = phaseAwards
    return acc
  }, {})

  const phases = Object.keys(grouped) as Phase[]

  if (phases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-5xl">🏅</span>
        <p className="text-white/40 text-sm text-center max-w-xs">
          Prêmios serão anunciados após cada fase
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-12">
      {phases.map((phase) => (
        <section key={phase}>
          <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
            {PHASE_LABELS[phase]}
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-wrap gap-4"
          >
            {grouped[phase].map((award) => (
              <motion.div key={award.id} variants={item}>
                <PhaseAwardCard
                  playerName={award.playerName}
                  team={award.team}
                  flag={award.flag}
                  category={award.category}
                  stat={award.stat}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      ))}
    </div>
  )
}
