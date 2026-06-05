import Link from 'next/link'

import { BrasaLogo } from '@/components/brasa/logo'

export default function Home() {
  return (
    <main className="min-h-screen bg-brasa-bg flex flex-col items-center justify-center px-6 text-white">
      <div className="flex flex-col items-center gap-10 max-w-xl w-full text-center">
        <BrasaLogo size="lg" />

        <div className="flex flex-col gap-3">
          <p className="text-white/60 text-lg leading-relaxed">
            Palpite no placar, acerte o artilheiro e dispute ponto a ponto com seus amigos durante
            toda a Copa do Mundo 2026.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full text-sm">
          <div className="bg-brasa-surface rounded-xl p-4 flex flex-col gap-1 border border-white/5">
            <span className="font-display text-amarelo-400 text-3xl">7</span>
            <span className="text-white/50">placar exato</span>
          </div>
          <div className="bg-brasa-surface rounded-xl p-4 flex flex-col gap-1 border border-white/5">
            <span className="font-display text-verde-500 text-3xl">3</span>
            <span className="text-white/50">vencedor certo</span>
          </div>
          <div className="bg-brasa-surface rounded-xl p-4 flex flex-col gap-1 border border-white/5">
            <span className="font-display text-amarelo-400 text-3xl">1.5×</span>
            <span className="text-white/50">mata-mata</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/login"
            className="flex-1 h-12 flex items-center justify-center rounded-full bg-verde-500 hover:bg-verde-600 font-semibold transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/jogos"
            className="flex-1 h-12 flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 transition-colors text-white/70 hover:text-white"
          >
            Ver jogos
          </Link>
        </div>

        <p className="text-white/25 text-xs">Copa do Mundo 2026 · 48 jogos · Open source</p>
      </div>
    </main>
  )
}
