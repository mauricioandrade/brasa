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
    <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 text-xs font-semibold text-white/40">
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

export function GameCard({ match, userPrediction, index = 0 }: GameCardProps) {
  const [open, setOpen] = useState(false)
  const time = formatTimeBRT(match.scheduledAt)
  const hasScore = match.homeScore !== null && match.awayScore !== null
  const canPredict =
    match.status === 'SCHEDULED' &&
    new Date() < new Date(match.scheduledAt.getTime() - 5 * 60 * 1000)

  return (
    <motion.div
      className="rounded-2xl bg-brasa-surface border border-white/5 p-5 flex flex-col gap-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05,
      }}
      whileHover={{ scale: 1.01, borderColor: 'rgba(255,255,255,0.1)' }}
    >
      {/* Top row: status badge + time */}
      <div className="flex items-center justify-between">
        <StatusBadge status={match.status} />
        <span className="text-xs text-white/40">{time} BRT</span>
      </div>

      {/* Teams + score row */}
      <div className="flex items-center justify-between gap-2">
        {/* Home team */}
        <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <span className="text-3xl leading-none">{match.homeFlag}</span>
          <span className="font-display text-2xl text-white leading-none truncate w-full text-center">
            {match.homeTeam.toUpperCase()}
          </span>
        </div>

        {/* Score or separator */}
        <div className="flex items-center justify-center px-2 shrink-0">
          {hasScore ? (
            <span className="font-display text-4xl text-amarelo-400 tracking-widest leading-none">
              {match.homeScore}
              <span className="text-white/20 mx-1">:</span>
              {match.awayScore}
            </span>
          ) : (
            <span className="font-display text-3xl text-white/20 leading-none">×</span>
          )}
        </div>

        {/* Away team */}
        <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <span className="text-3xl leading-none">{match.awayFlag}</span>
          <span className="font-display text-2xl text-white leading-none truncate w-full text-center">
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
        <p className="text-xs text-verde-500 text-center">
          Seu palpite: {userPrediction.homeScore} × {userPrediction.awayScore}
          {userPrediction.topScorerName && (
            <span className="text-white/30"> · {userPrediction.topScorerName}</span>
          )}
        </p>
      )}

      {/* Prediction section (when can predict) */}
      {canPredict && (
        <div>
          {userPrediction && !open && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-verde-500">
                Seu palpite: {userPrediction.homeScore} × {userPrediction.awayScore}
                {userPrediction.topScorerName && (
                  <span className="text-white/30"> · {userPrediction.topScorerName}</span>
                )}
              </p>
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-1 h-7 px-3 rounded-full border border-verde-500/50 hover:border-verde-500 text-verde-500 text-xs font-semibold transition-colors"
              >
                <Pencil size={10} />
                Editar
              </button>
            </div>
          )}
          {!userPrediction && !open && (
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1 h-7 px-3 rounded-full border border-verde-500/50 hover:border-verde-500 text-verde-500 text-xs font-semibold transition-colors"
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
