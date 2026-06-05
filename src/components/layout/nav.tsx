'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/jogos', label: 'Jogos' },
  { href: '/palpites', label: 'Palpites' },
  { href: '/ranking', label: 'Ranking' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-1 sm:gap-4">
      {links.map((l) => {
        const active = pathname.startsWith(l.href)
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm px-2 py-1 rounded transition-colors ${
              active ? 'text-white font-semibold' : 'text-white/50 hover:text-white/80'
            }`}
          >
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}
