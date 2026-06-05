'use client'

import { useState } from 'react'

import type { Match } from '@prisma/client'
import { motion } from 'framer-motion'

import { PredictionForm } from '@/components/palpites/prediction-form'

interface GameCardProps {
  match: Match
  userPrediction?: { homeScore: number; awayScore: number; topScorerName: string | null }
}

const STATUS_LABELS: Record<Match['status'], string> = {
  SCHEDULED: 'AGENDADO',
  LIVE: 'AO VIVO',
  FINISHED: 'ENCERRADO',
  CANCELLED: 'CANCELADO',
}

function StatusBadge({ status }: { status: Match['status'] }) {
  if (status === 'LIVE') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-600/20 px-2 py-0.5 text-xs font-semibold text-red-400">
        <motion.span
          className="size-1.5 rounded-full bg-red-400"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        {STATUS_LABELS[status]}
      </span>
    )
  }
  if (status === 'FINISHED') {
    return (
      <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-white/50">
        {STATUS_LABELS[status]}
      </span>
    )
  }
  if (status === 'CANCELLED') {
    return (
      <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 text-xs font-semibold text-white/30">
        {STATUS_LABELS[status]}
      </span>
    )
  }
  // SCHEDULED
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 text-xs font-semibold text-white/40">
      {STATUS_LABELS[status]}
    </span>
  )
}

function formatDateBRT(date: Date): { date: string; time: string } {
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
  // formatted: "qui., 12/06, 15:00" — split on ", " to get date and time parts
  const parts = formatted.split(', ')
  const dateStr = parts.slice(0, -1).join(', ')
  const timeStr = parts[parts.length - 1] ?? ''
  return { date: dateStr, time: timeStr }
}

export function GameCard({ match, userPrediction }: GameCardProps) {
  const [open, setOpen] = useState(false)
  const { date, time } = formatDateBRT(match.scheduledAt)
  const hasScore = match.homeScore !== null && match.awayScore !== null
  const canPredict =
    match.status === 'SCHEDULED' &&
    new Date() < new Date(match.scheduledAt.getTime() - 5 * 60 * 1000)

  return (
    <motion.div
      className="rounded-xl bg-brasa-surface border border-white/5 px-4 py-3 flex flex-col gap-2"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
    >
      {/* Top row: date/time + status */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40 capitalize">
          {date} &middot; {time}
        </span>
        <StatusBadge status={match.status} />
      </div>

      {/* Teams row */}
      <div className="flex items-center justify-between gap-2">
        {/* Home team */}
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <span className="text-2xl leading-none">{match.homeFlag}</span>
          <span className="truncate text-sm font-semibold text-white">{match.homeTeam}</span>
        </div>

        {/* Score or VS */}
        <div className="flex items-center gap-1 px-2">
          {hasScore ? (
            <span className="font-display text-2xl text-white tracking-widest">
              {match.homeScore} <span className="text-white/30">:</span> {match.awayScore}
            </span>
          ) : (
            <span className="font-display text-lg text-white/30">×</span>
          )}
        </div>

        {/* Away team */}
        <div className="flex flex-1 items-center justify-end gap-2 min-w-0">
          <span className="truncate text-sm font-semibold text-white text-right">
            {match.awayTeam}
          </span>
          <span className="text-2xl leading-none">{match.awayFlag}</span>
        </div>
      </div>

      {/* Prediction section */}
      {canPredict && (
        <div>
          {userPrediction && !open && (
            <button
              onClick={() => setOpen(true)}
              className="text-xs text-verde-500 hover:text-verde-400 mt-1"
            >
              Palpite: {userPrediction.homeScore} × {userPrediction.awayScore} — editar
            </button>
          )}
          {!userPrediction && !open && (
            <button
              onClick={() => setOpen(true)}
              className="mt-2 w-full h-8 rounded-full border border-verde-500/50 hover:border-verde-500 text-verde-500 text-xs font-semibold transition-colors"
            >
              + Palpitar
            </button>
          )}
          {open && (
            <PredictionForm
              matchId={match.id}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              homeFlag={match.homeFlag}
              awayFlag={match.awayFlag}
              existingPrediction={userPrediction}
              onSuccess={() => setOpen(false)}
            />
          )}
        </div>
      )}
    </motion.div>
  )
}
