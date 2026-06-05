'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

type UpcomingMatch = {
  id: string
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  scheduledAt: string
  group: string | null
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const day = d.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: 'short',
  })
  const time = d.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  })
  return { day, time }
}

export function UpcomingMatches() {
  const [matches, setMatches] = useState<UpcomingMatch[]>([])

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/jogos/proximos', { signal: controller.signal })
      .then((r) => r.json())
      .then((data: UpcomingMatch[]) => setMatches(data))
      .catch((err) => {
        if (err instanceof Error && err.name !== 'AbortError') console.error(err)
      })
    return () => controller.abort()
  }, [])

  if (matches.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="w-full max-w-sm mt-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-px bg-verde-500/40" />
        <p className="text-[10px] font-bold tracking-[0.25em] text-verde-500/50 uppercase">
          Próximos jogos
        </p>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      <div className="flex flex-col gap-1.5">
        {matches.map((m) => {
          const { day, time } = formatDate(m.scheduledAt)
          return (
            <Link
              key={m.id}
              href="/jogos"
              className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-3 py-2 hover:border-verde-500/25 hover:bg-verde-500/5 transition-colors"
            >
              <span className="text-[10px] text-white/25 w-12 shrink-0 leading-tight">
                <span className="block">{day}</span>
                <span className="block font-bold text-white/40">{time}</span>
              </span>
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <span className="text-base leading-none">{m.homeFlag}</span>
                <span className="text-[11px] text-white/60 truncate">{m.homeTeam}</span>
                <span className="text-white/20 text-[10px] mx-0.5">×</span>
                <span className="text-[11px] text-white/60 truncate">{m.awayTeam}</span>
                <span className="text-base leading-none">{m.awayFlag}</span>
              </div>
              <span className="text-[9px] text-verde-500/50 shrink-0">palpitar →</span>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
