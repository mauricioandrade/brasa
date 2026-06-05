import Image from 'next/image'
import Link from 'next/link'

import { BrasaLogo } from '@/components/brasa/logo'
import { auth, signOut } from '@/lib/auth'

import { Nav } from './nav'

export async function Header() {
  const session = await auth()

  return (
    <header className="h-14 border-b border-white/5 bg-brasa-bg/95 backdrop-blur-sm sticky top-0 z-50 flex items-center px-4 sm:px-6 gap-4">
      <Link href="/" className="flex-shrink-0">
        <BrasaLogo size="sm" />
      </Link>

      <div className="flex-1">
        <Nav />
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {session?.user ? (
          <>
            {/* Avatar always visible */}
            <div className="flex items-center gap-2">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? ''}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-xs">
                  {session.user.name?.[0]?.toUpperCase()}
                </div>
              )}
              {/* Name hidden on mobile */}
              <span className="hidden sm:block text-sm text-white/70 truncate max-w-24">
                {session.user.name?.split(' ')[0]}
              </span>
            </div>
            {session.user.role === 'ADMIN' && (
              <Link
                href="/admin/jogos"
                className="text-xs text-amarelo-400/60 hover:text-amarelo-400 transition-colors"
              >
                Admin
              </Link>
            )}
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <button
                type="submit"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Sair
              </button>
            </form>
          </>
        ) : (
          <Link
            href="/login"
            className="text-xs text-verde-500 hover:text-verde-400 font-semibold transition-colors"
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  )
}
