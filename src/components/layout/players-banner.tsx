'use client'

import { useEffect, useState } from 'react'

import { PlayerFigurina } from '@/components/brasa/player-figurina'

type PlayerDisplay = {
  id: number
  name: string
  nationality: string
  flag: string
  position: string
  goals: number
}

export function PlayersBanner() {
  const [players, setPlayers] = useState<PlayerDisplay[]>([])

  useEffect(() => {
    fetch('/api/players/top')
      .then((r) => r.json())
      .then((data: PlayerDisplay[]) => setPlayers(data))
      .catch(() => {})
  }, [])

  if (players.length === 0) return null

  // Duplica para loop infinito seamless
  const items = [...players, ...players]

  return (
    <div className="border-y border-white/8 py-1">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-px bg-amarelo-400/50" />
        <p className="text-[10px] font-bold tracking-[0.25em] text-amarelo-400/60 uppercase">
          Estrelas da Copa
        </p>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      <div
        className="w-full overflow-hidden py-3 group relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex gap-4 w-max group-hover:[animation-play-state:paused]"
          style={{ animation: 'scroll-x 45s linear infinite' }}
        >
          {items.map((p, i) => (
            <PlayerFigurina
              key={`${p.id}-${i}`}
              name={p.name}
              team={p.nationality}
              flag={p.flag}
              position={p.position}
              goals={p.goals}
              size="md"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
