'use client'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { getRank } from '@/lib/gamification'

type RankingEntry = {
  position: number
  userId: string
  name: string
  image: string | null
  points: number
}

interface RankingTableProps {
  ranking: RankingEntry[]
  currentUserId?: string | null
}

const positionEmojis = ['🥇', '🥈', '🥉']

function getPositionStyle(position: number) {
  if (position === 1)
    return {
      borderClass: 'border-amarelo-400/30',
      pointsClass: 'text-amarelo-400 font-display text-3xl',
      cardStyle: {
        background: 'linear-gradient(135deg, rgba(255,223,0,0.08) 0%, rgba(13,31,15,0.95) 100%)',
      },
    }
  if (position === 2)
    return {
      borderClass: 'border-white/15',
      pointsClass: 'text-white font-display text-2xl',
      cardStyle: {},
    }
  if (position === 3)
    return {
      borderClass: 'border-white/10',
      pointsClass: 'text-white/70 font-display text-2xl',
      cardStyle: {},
    }
  return {
    borderClass: 'border-white/5',
    pointsClass: 'text-white/50 font-display text-xl',
    cardStyle: {},
  }
}

export function RankingTable({ ranking, currentUserId }: RankingTableProps) {
  return (
    <div className="flex flex-col gap-2">
      {ranking.map((entry, idx) => {
        const rank = getRank(entry.points)
        const isFirst = entry.position === 1
        const isTop3 = entry.position <= 3
        const isMe = entry.userId === currentUserId
        const showSeparator = idx === 2 && ranking.length > 3
        const { borderClass, pointsClass, cardStyle } = getPositionStyle(entry.position)

        return (
          <div key={entry.userId}>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: idx * 0.04 }}
              whileHover={{ x: 4, transition: { duration: 0.15 } }}
              className={`flex items-center gap-4 rounded-2xl px-4 border transition-colors duration-150 ${isMe ? 'bg-verde-500/8 border-verde-500/30' : `bg-brasa-surface ${borderClass}`} ${isFirst ? 'py-4' : 'py-3'}`}
              style={isMe ? {} : cardStyle}
            >
              {/* Position */}
              <span
                className={`font-display shrink-0 text-center ${
                  isTop3 ? (isFirst ? 'text-3xl w-8' : 'text-2xl w-8') : 'text-lg text-white/30 w-8'
                }`}
              >
                {positionEmojis[entry.position - 1] ?? entry.position}
              </span>

              {/* Avatar */}
              {entry.image ? (
                <Image
                  src={entry.image}
                  alt={entry.name}
                  width={isFirst ? 40 : 36}
                  height={isFirst ? 40 : 36}
                  className="rounded-full shrink-0"
                />
              ) : (
                <div
                  className={`rounded-full bg-white/10 flex items-center justify-center text-white/40 text-sm shrink-0 ${isFirst ? 'w-10 h-10' : 'w-9 h-9'}`}
                >
                  {entry.name[0]?.toUpperCase()}
                </div>
              )}

              {/* Name + rank */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    className={`font-semibold truncate ${
                      isFirst ? 'font-display text-xl text-white' : 'text-white'
                    }`}
                  >
                    {entry.name}
                  </p>
                  {isMe && (
                    <span className="text-[9px] font-bold tracking-wider text-verde-400 bg-verde-500/15 border border-verde-500/25 px-1.5 py-0.5 rounded-full shrink-0">
                      Você
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs font-semibold ${rank.color} bg-white/5 rounded-full px-2 py-0.5`}
                >
                  {rank.emoji} {rank.name}
                </span>
              </div>

              {/* Points */}
              <span className={`shrink-0 leading-none ${pointsClass}`}>{entry.points}</span>
            </motion.div>

            {showSeparator && (
              <div className="flex items-center gap-3 my-3 px-2">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-xs text-white/20">demais participantes</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
