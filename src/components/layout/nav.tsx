'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/jogos', label: 'Jogos' },
  { href: '/palpites', label: 'Palpites' },
  { href: '/ranking', label: 'Ranking' },
  { href: '/premios', label: 'Prêmios' },
  { href: '/perfil', label: 'Perfil' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-0.5 sm:gap-4">
      {links.map((l) => {
        const active = pathname.startsWith(l.href)
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`relative text-xs sm:text-sm px-1.5 sm:px-2 py-1 flex flex-col items-center gap-0.5 transition-colors ${
              active ? 'text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            <span>{l.label}</span>
            {active && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-verde-500" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
