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
    <div className="w-full overflow-hidden py-3 border-y border-white/10 group">
      <p className="text-[10px] font-bold tracking-[0.2em] text-white/25 uppercase mb-2 px-0">
        Estrelas da Copa
      </p>
      <div
        className="flex gap-3 w-max group-hover:[animation-play-state:paused]"
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
  )
}
