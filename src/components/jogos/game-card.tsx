'use client'

import { useState } from 'react'

import type { Match } from '@prisma/client'
import { motion } from 'framer-motion'
import { Pencil } from 'lucide-react'

import { PlayerFigurina } from '@/components/brasa/player-figurina'
import { PredictionForm } from '@/components/palpites/prediction-form'
import { TEAM_STARS } from '@/lib/team-data'

interface GameCardProps {
  match: Match
  userPrediction?: { homeScore: number; awayScore: number; topScorerName: string | null }
  index?: number
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
      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold text-white/30">
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
    <span className="inline-flex items-center rounded-full bg-verde-500/10 px-2 py-0.5 text-xs font-semibold text-verde-500/70">
      {STATUS_LABELS[status]}
    </span>
  )
}

function formatTimeBRT(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatDateBRT(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: 'numeric',
    month: 'short',
  })
    .format(date)
    .replace('.', '')
    .toUpperCase()
}

function getTopBorderClass(status: Match['status']): string {
  if (status === 'LIVE') return 'border-t-red-500'
  if (status === 'FINISHED') return 'border-t-white/10'
  return 'border-t-verde-500/40'
}

export function GameCard({ match, userPrediction, index = 0 }: GameCardProps) {
  const [open, setOpen] = useState(false)
  const time = formatTimeBRT(match.scheduledAt)
  const date = formatDateBRT(match.scheduledAt)
  const hasScore = match.homeScore !== null && match.awayScore !== null
  const canPredict =
    match.status === 'SCHEDULED' &&
    new Date() < new Date(match.scheduledAt.getTime() - 5 * 60 * 1000)

  const topBorderClass = getTopBorderClass(match.status)

  return (
    <motion.div
      className={`rounded-2xl border border-white/5 border-t-2 ${topBorderClass} p-3 sm:p-5 flex flex-col gap-3 sm:gap-4`}
      style={{
        background: 'linear-gradient(160deg, rgba(13,31,15,0.95) 0%, rgba(9,21,8,0.98) 100%)',
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05,
      }}
      whileHover={{
        scale: 1.015,
        borderColor: 'rgba(0,156,59,0.35)',
        boxShadow: '0 4px 32px rgba(0,156,59,0.12)',
      }}
    >
      {/* Top row: status badge + date/time */}
      <div className="flex items-center justify-between">
        <StatusBadge status={match.status} />
        <span className="text-xs text-white/40 tabular-nums">
          {date} · {time} BRT
        </span>
      </div>

      {/* Teams + score row */}
      <div className="flex items-center justify-between gap-2">
        {/* Home team */}
        <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <span className="text-3xl sm:text-4xl leading-none">{match.homeFlag}</span>
          <span className="font-display text-base sm:text-2xl text-white leading-none truncate w-full text-center">
            {match.homeTeam.toUpperCase()}
          </span>
        </div>

        {/* Score or separator */}
        <div className="flex items-center justify-center px-1 sm:px-3 shrink-0">
          {hasScore ? (
            <div className="bg-black/20 rounded-lg px-2 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2">
              <span className="font-display text-2xl sm:text-4xl text-amarelo-400">
                {match.homeScore}
              </span>
              <span className="text-white/30 text-sm">:</span>
              <span className="font-display text-2xl sm:text-4xl text-amarelo-400">
                {match.awayScore}
              </span>
            </div>
          ) : (
            <span className="font-display text-xl sm:text-3xl text-white/20 leading-none">×</span>
          )}
        </div>

        {/* Away team */}
        <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <span className="text-3xl sm:text-4xl leading-none">{match.awayFlag}</span>
          <span className="font-display text-base sm:text-2xl text-white leading-none truncate w-full text-center">
            {match.awayTeam.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Star players */}
      {(() => {
        const homeStar = TEAM_STARS[match.homeTeam]
        const awayStar = TEAM_STARS[match.awayTeam]
        if (!homeStar && !awayStar) return null
        return (
          <div className="flex flex-col gap-1.5">
            <p className="text-[9px] font-bold tracking-[0.15em] text-white/20 uppercase">
              Feras do confronto
            </p>
            <div className="flex items-center justify-between gap-2">
              {homeStar ? (
                <PlayerFigurina
                  name={homeStar.name}
                  team={match.homeTeam}
                  flag={match.homeFlag}
                  position={homeStar.position}
                  goals={0}
                  size="sm"
                />
              ) : (
                <div className="w-16" />
              )}
              <span className="text-white/15 text-[10px]">⚡</span>
              {awayStar ? (
                <PlayerFigurina
                  name={awayStar.name}
                  team={match.awayTeam}
                  flag={match.awayFlag}
                  position={awayStar.position}
                  goals={0}
                  size="sm"
                />
              ) : (
                <div className="w-16" />
              )}
            </div>
          </div>
        )
      })()}

      {/* User prediction display (when game not predictable) */}
      {userPrediction && !canPredict && !open && (
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 py-1 px-3 rounded-full bg-verde-500/8 border border-verde-500/20">
            <span className="text-xs text-verde-500/80">Seu palpite:</span>
            <span className="text-xs text-verde-500 font-bold">
              {userPrediction.homeScore} × {userPrediction.awayScore}
            </span>
            {userPrediction.topScorerName && (
              <span className="text-xs text-white/30">· {userPrediction.topScorerName}</span>
            )}
          </div>
        </div>
      )}

      {/* Prediction section (when can predict) */}
      {canPredict && (
        <div>
          {userPrediction && !open && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 py-1 px-3 rounded-full bg-verde-500/8 border border-verde-500/20">
                <span className="text-xs text-verde-500/80">Seu palpite:</span>
                <span className="text-xs text-verde-500 font-bold">
                  {userPrediction.homeScore} × {userPrediction.awayScore}
                </span>
                {userPrediction.topScorerName && (
                  <span className="text-xs text-white/30">· {userPrediction.topScorerName}</span>
                )}
              </div>
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-1 h-8 px-4 rounded-full border border-verde-500/60 hover:border-verde-500 hover:bg-verde-500/10 text-verde-500 text-xs font-bold transition-all"
              >
                <Pencil size={10} />
                Editar
              </button>
            </div>
          )}
          {!userPrediction && !open && (
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1 h-8 px-4 rounded-full border border-verde-500/60 hover:border-verde-500 hover:bg-verde-500/10 text-verde-500 text-xs font-bold transition-all"
            >
              <Pencil size={10} />
              Palpitar
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
