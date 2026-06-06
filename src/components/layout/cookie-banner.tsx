'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

const COOKIE_KEY = 'brasa-cookie-consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (!stored) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0d1f0f] border-t border-verde-500/10 z-50 px-4 py-3">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-white/60 text-xs leading-relaxed flex-1">
          Usamos cookies essenciais para manter sua sessão ativa.{' '}
          <Link
            href="/privacidade"
            className="text-verde-500 hover:text-verde-400 underline underline-offset-2 transition-colors"
          >
            Política de privacidade
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-4 py-1.5 rounded-full bg-verde-500 text-black text-xs font-semibold hover:bg-verde-400 transition-colors"
        >
          Entendi
        </button>
      </div>
    </div>
  )
}
