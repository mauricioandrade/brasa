'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import type { AwardCategory } from '@prisma/client'

import { TEAM_COLORS } from '@/lib/team-data'

interface PhaseAwardCardProps {
  playerName: string
  team: string
  flag: string
  category: AwardCategory
  stat?: string | null
}

const CATEGORY_BADGE: Record<AwardCategory, string> = {
  TOP_SCORER: '⚽ ARTILHEIRO',
  BEST_GOALKEEPER: '🧤 MELHOR GOLEIRO',
  BEST_PLAYER: '⭐ MELHOR JOGADOR',
  BEST_DEFENSE: '🛡️ MELHOR DEFESA',
}

function Initials({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className="w-full h-full flex items-center justify-center font-display text-white/90 text-2xl font-bold"
      style={{
        background: `radial-gradient(circle at 50% 40%, ${color}80 0%, ${color}30 50%, transparent 75%)`,
      }}
    >
      {initials}
    </div>
  )
}

export function PhaseAwardCard({ playerName, team, flag, category, stat }: PhaseAwardCardProps) {
  const color = TEAM_COLORS[team] ?? '#1a3a1a'
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const badge = CATEGORY_BADGE[category]
  const surname = playerName.split(' ').pop()?.toUpperCase() ?? playerName.toUpperCase()

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/players/photo?name=${encodeURIComponent(playerName)}`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((d: { photoUrl: string | null }) => setPhotoUrl(d.photoUrl))
      .catch((err) => {
        if (err instanceof Error && err.name !== 'AbortError') console.error(err)
      })
    return () => controller.abort()
  }, [playerName])

  return (
    <div
      className="w-36 rounded-xl overflow-hidden flex flex-col border border-white/5 shrink-0"
      style={{
        background: '#0d1f0f',
        boxShadow: `0 0 0 1px ${color}60, 0 4px 20px ${color}30`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-center gap-1.5 py-2.5 px-2"
        style={{ backgroundColor: color }}
      >
        <span className="text-xl leading-none">{flag}</span>
        <span className="text-white/90 font-bold tracking-widest text-[8px]">
          {team.toUpperCase().slice(0, 3)}
        </span>
      </div>

      {/* Photo */}
      <div
        className="relative overflow-hidden h-32"
        style={{
          background: `linear-gradient(180deg, ${color}55 0%, ${color}18 50%, #0d1f0f 100%)`,
        }}
      >
        {photoUrl ? (
          <Image src={photoUrl} alt={playerName} fill className="object-cover object-top" unoptimized />
        ) : (
          <Initials name={playerName} color={color} />
        )}
      </div>

      {/* Footer */}
      <div
        className="px-2 py-2 flex flex-col gap-1"
        style={{ background: `linear-gradient(135deg, ${color}15 0%, #030f04 100%)` }}
      >
        <span
          className="text-[8px] font-bold tracking-widest text-amarelo-400 uppercase leading-none"
        >
          {badge}
        </span>
        <p className="text-white font-bold text-[13px] truncate leading-none mt-0.5">{surname}</p>
        {stat && (
          <p className="text-verde-500 text-[9px] leading-none mt-0.5 truncate">{stat}</p>
        )}
      </div>
    </div>
  )
}
