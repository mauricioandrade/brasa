'use client'

import type { Match } from '@prisma/client'
import { motion } from 'framer-motion'

interface GameCardProps {
  match: Match
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
  const brtDate = new Date(date.getTime() - 3 * 60 * 60 * 1000)
  const dateStr = brtDate.toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  })
  const timeStr = brtDate.toLocaleTimeString('pt-BR', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
  })
  return { date: dateStr, time: timeStr }
}

export function GameCard({ match }: GameCardProps) {
  const { date, time } = formatDateBRT(match.scheduledAt)
  const hasScore = match.homeScore !== null && match.awayScore !== null

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
    </motion.div>
  )
}
