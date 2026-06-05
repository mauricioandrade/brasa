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

const positionColors = ['text-amarelo-400', 'text-white/60', 'text-amber-600']
const positionEmojis = ['🥇', '🥈', '🥉']

export function RankingTable({ ranking }: RankingTableProps) {
  return (
    <div className="flex flex-col gap-2">
      {ranking.map((entry) => {
        const rank = getRank(entry.points)
        const isTop3 = entry.position <= 3

        return (
          <div
            key={entry.userId}
            className={`flex items-center gap-4 bg-brasa-surface rounded-xl px-4 py-3 border ${
              isTop3 ? 'border-amarelo-400/20' : 'border-white/5'
            }`}
          >
            <span
              className={`font-display text-2xl w-8 text-center ${
                positionColors[entry.position - 1] ?? 'text-white/30'
              }`}
            >
              {positionEmojis[entry.position - 1] ?? entry.position}
            </span>

            {entry.image ? (
              <Image
                src={entry.image}
                alt={entry.name}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-sm">
                {entry.name[0]?.toUpperCase()}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">{entry.name}</p>
              <p className={`text-xs ${rank.color}`}>
                {rank.emoji} {rank.name}
              </p>
            </div>

            <span className="font-display text-2xl text-amarelo-400">{entry.points}</span>
          </div>
        )
      })}
    </div>
  )
}
