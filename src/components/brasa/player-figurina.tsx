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

function Initials({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div
      className="w-full h-full flex items-center justify-center font-display text-white"
      style={{ backgroundColor: color, fontSize: '1.25rem' }}
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

  const isSmall = size === 'sm'
  const surname = name.split(' ').pop()?.toUpperCase() ?? name.toUpperCase()

  return (
    <div
      className={`
        ${isSmall ? 'w-16' : 'w-24'}
        rounded-lg overflow-hidden flex flex-col border border-white/10 shrink-0
      `}
      style={{ boxShadow: `0 0 0 1.5px ${color}55` }}
    >
      {/* Header — faixa colorida */}
      <div
        className={`flex items-center justify-center gap-1 ${isSmall ? 'py-1 px-1' : 'py-1.5 px-2'}`}
        style={{ backgroundColor: color }}
      >
        <span className={`leading-none ${isSmall ? 'text-base' : 'text-lg'}`}>{flag}</span>
        {!isSmall && (
          <span className="text-white font-bold tracking-widest" style={{ fontSize: '8px' }}>
            {team.toUpperCase().slice(0, 3)}
          </span>
        )}
      </div>

      {/* Foto */}
      <div className={`relative overflow-hidden bg-brasa-surface ${isSmall ? 'h-16' : 'h-24'}`}>
        {photoUrl ? (
          <Image src={photoUrl} alt={name} fill className="object-cover object-top" unoptimized />
        ) : (
          <Initials name={name} color={color} />
        )}
      </div>

      {/* Footer */}
      <div className="bg-[#0d0d14] px-1.5 py-1">
        <p
          className={`text-white font-bold truncate leading-none ${isSmall ? 'text-[9px]' : 'text-[11px]'}`}
        >
          {surname}
        </p>
        <p className={`text-white/40 leading-none mt-0.5 ${isSmall ? 'text-[8px]' : 'text-[9px]'}`}>
          {position} · ⚽{goals}
        </p>
      </div>
    </div>
  )
}
