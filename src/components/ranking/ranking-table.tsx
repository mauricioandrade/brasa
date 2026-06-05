import Image from 'next/image'

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
}

const positionEmojis = ['🥇', '🥈', '🥉']

export function RankingTable({ ranking }: RankingTableProps) {
  return (
    <div className="flex flex-col gap-2">
      {ranking.map((entry, idx) => {
        const rank = getRank(entry.points)
        const isFirst = entry.position === 1
        const isTop3 = entry.position <= 3
        const showSeparator = idx === 2 && ranking.length > 3

        return (
          <div key={entry.userId}>
            <div
              className={`flex items-center gap-4 bg-brasa-surface rounded-2xl px-4 py-3 border transition-all duration-150
                ${isFirst ? 'border-amarelo-400/30 py-4' : isTop3 ? 'border-white/10' : 'border-white/5'}
                hover:border-white/15 hover:bg-white/[0.02]`}
            >
              <span
                className={`font-display w-8 text-center shrink-0 ${
                  isFirst ? 'text-3xl' : isTop3 ? 'text-2xl' : 'text-lg text-white/30'
                }`}
              >
                {positionEmojis[entry.position - 1] ?? entry.position}
              </span>

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

              <div className="flex-1 min-w-0">
                <p
                  className={`text-white font-semibold truncate ${isFirst ? 'font-display text-xl' : ''}`}
                >
                  {entry.name}
                </p>
                <p className={`text-xs ${rank.color}`}>
                  {rank.emoji} {rank.name}
                </p>
              </div>

              <span className="font-display text-2xl text-amarelo-400 shrink-0">
                {entry.points}
              </span>
            </div>

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
