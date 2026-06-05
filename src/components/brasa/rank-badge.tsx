'use client'

import { motion } from 'framer-motion'

import { getNextRank, getProgress, getRank } from '@/lib/gamification'

interface RankBadgeProps {
  points: number
  showProgress?: boolean
}

export function RankBadge({ points, showProgress = false }: RankBadgeProps) {
  const rank = getRank(points)
  const next = getNextRank(points)
  const progress = getProgress(points)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{rank.emoji}</span>
        <span className={`font-display text-xl ${rank.color}`}>{rank.name}</span>
        <span className="text-white/40 text-sm">{points}pts</span>
      </div>
      {showProgress && next && (
        <div className="flex flex-col gap-1">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden w-48">
            <motion.div
              className="h-full bg-verde-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <span className="text-white/30 text-xs">
            {next.minPoints - points}pts para {next.emoji} {next.name}
          </span>
        </div>
      )}
    </div>
  )
}
