'use client'

import Link from 'next/link'

const links = [
  { href: '/jogos', label: 'Jogos' },
  { href: '/palpites', label: 'Meus Palpites' },
  { href: '/ranking', label: 'Ranking' },
]

export function Nav() {
  return (
    <nav className="flex gap-6">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="text-white/70 hover:text-white transition-colors"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  )
}
