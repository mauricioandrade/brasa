'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { TEAM_COLORS } from '@/lib/team-data'

interface PlayerFigurinaProps {
  name: string
  team: string
  flag: string
  position: string
  goals: number
  size?: 'sm' | 'md'
}

function Initials({ name, color, isSmall }: { name: string; color: string; isSmall: boolean }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div
      className="w-full h-full flex items-center justify-center font-display text-white/90"
      style={{
        background: `radial-gradient(circle at 50% 40%, ${color}80 0%, ${color}30 50%, transparent 75%)`,
        fontSize: isSmall ? '1.2rem' : '1.5rem',
        fontWeight: 700,
      }}
    >
      {initials}
    </div>
  )
}

export function PlayerFigurina({
  name,
  team,
  flag,
  position,
  goals,
  size = 'md',
}: PlayerFigurinaProps) {
  const color = TEAM_COLORS[team] ?? '#1a1a2e'
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/players/photo?name=${encodeURIComponent(name)}`)
      .then((r) => r.json())
      .then((d: { photoUrl: string | null }) => setPhotoUrl(d.photoUrl))
      .catch(() => {})
  }, [name])

  const POSITION_PT: Record<string, string> = { ATK: 'ATA', MID: 'MEI', GK: 'GOL', DEF: 'DEF' }
  const positionPt = POSITION_PT[position] ?? position
  const isSmall = size === 'sm'
  const surname = name.split(' ').pop()?.toUpperCase() ?? name.toUpperCase()

  return (
    <div
      className={`
        ${isSmall ? 'w-16' : 'w-24'}
        rounded-lg overflow-hidden flex flex-col border border-white/5 shrink-0
      `}
      style={{
        boxShadow: `0 0 0 1px ${color}60, 0 4px 16px ${color}30`,
      }}
    >
      {/* Header — faixa colorida */}
      <div
        className={`flex items-center justify-center gap-1 ${isSmall ? 'py-1.5 px-1' : 'py-2 px-2'}`}
        style={{ backgroundColor: color }}
      >
        <span className={`leading-none ${isSmall ? 'text-sm' : 'text-lg'}`}>{flag}</span>
        <span className="text-white/90 font-bold tracking-widest" style={{ fontSize: '7px' }}>
          {team.toUpperCase().slice(0, 3)}
        </span>
      </div>

      {/* Foto */}
      <div
        className={`relative overflow-hidden ${isSmall ? 'h-16' : 'h-24'}`}
        style={{
          background: `linear-gradient(180deg, ${color}55 0%, ${color}18 50%, #0d1f0f 100%)`,
        }}
      >
        {photoUrl ? (
          <Image src={photoUrl} alt={name} fill className="object-cover object-top" unoptimized />
        ) : (
          <Initials name={name} color={color} isSmall={isSmall} />
        )}
      </div>

      {/* Footer */}
      <div
        className="px-1.5 py-1"
        style={{ background: `linear-gradient(135deg, ${color}15 0%, #030f04 100%)` }}
      >
        <p
          className={`text-white font-bold truncate leading-none ${isSmall ? 'text-[9px]' : 'text-[11px]'}`}
        >
          {surname}
        </p>
        <p className={`text-white/40 leading-none mt-0.5 ${isSmall ? 'text-[8px]' : 'text-[9px]'}`}>
          {goals > 0 ? `${positionPt} · ⚽ ${goals}` : positionPt}
        </p>
      </div>
    </div>
  )
}
