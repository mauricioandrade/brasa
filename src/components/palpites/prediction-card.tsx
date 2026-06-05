'use client'

import type { Match, Prediction } from '@prisma/client'
import { motion } from 'framer-motion'

interface PredictionCardProps {
  prediction: Prediction & { match: Match }
  index?: number
}

export function PredictionCard({ prediction: p, index = 0 }: PredictionCardProps) {
  const hasResult = p.match.homeScore !== null && p.match.awayScore !== null
  const hasPoints = p.calculated && p.pointsEarned > 0
  const isFinished = p.match.status === 'FINISHED'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.04 }}
      className="rounded-2xl border border-white/5 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, rgba(13,31,15,0.95) 0%, rgba(9,21,8,0.98) 100%)',
      }}
    >
      {/* Match header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/5">
        <p className="text-sm text-white/60 text-center">
          {p.match.homeFlag}&nbsp;
          <span className="font-semibold text-white/80">{p.match.homeTeam}</span>
          <span className="mx-2 text-white/30">×</span>
          <span className="font-semibold text-white/80">{p.match.awayTeam}</span>
          &nbsp;{p.match.awayFlag}
        </p>
      </div>

      {/* Score rows */}
      <div className="px-4 py-3 flex flex-col gap-2">
        {/* User prediction */}
        <div className="flex items-baseline gap-3">
          <span className="text-xs text-white/40 w-24 shrink-0">Meu palpite</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl text-white leading-none">{p.homeScore}</span>
            <span className="text-white/30 text-sm">×</span>
            <span className="font-display text-3xl text-white leading-none">{p.awayScore}</span>
          </div>
        </div>

        {/* Result row */}
        {hasResult ? (
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40 w-24 shrink-0">Resultado</span>
            <div className="flex items-baseline gap-2">
              <span
                className={`font-display text-3xl leading-none ${
                  hasPoints ? 'text-amarelo-400' : 'text-white/40'
                }`}
              >
                {p.match.homeScore}
              </span>
              <span className={`text-sm ${hasPoints ? 'text-amarelo-400/50' : 'text-white/20'}`}>
                ×
              </span>
              <span
                className={`font-display text-3xl leading-none ${
                  hasPoints ? 'text-amarelo-400' : 'text-white/40'
                }`}
              >
                {p.match.awayScore}
              </span>
            </div>
            {p.calculated ? (
              <span
                className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${
                  hasPoints ? 'bg-verde-500/20 text-verde-500' : 'bg-white/5 text-white/20'
                }`}
              >
                {hasPoints ? `+${p.pointsEarned} pts` : '0 pts'}
              </span>
            ) : null}
          </div>
        ) : (
          <div className="flex items-baseline gap-3">
            <span className="text-xs text-white/40 w-24 shrink-0">Resultado</span>
            <span className="text-xs text-white/20 italic">
              {isFinished ? 'Calculando...' : 'Aguardando resultado'}
            </span>
          </div>
        )}
      </div>

      {/* Top scorer */}
      {p.topScorerName && (
        <div className="px-4 pb-3 pt-0">
          <span className="text-xs text-white/30">Artilheiro: {p.topScorerName}</span>
        </div>
      )}
    </motion.div>
  )
}
