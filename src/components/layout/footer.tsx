import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <p className="text-white/20 text-xs">Brasa &copy; 2026</p>
        <div className="flex items-center gap-4">
          <Link
            href="/privacidade"
            className="text-white/20 text-xs hover:text-white/40 transition-colors"
          >
            Privacidade
          </Link>
          <span className="text-white/10 text-xs">&middot;</span>
          <Link
            href="/termos"
            className="text-white/20 text-xs hover:text-white/40 transition-colors"
          >
            Termos de uso
          </Link>
        </div>
      </div>
    </footer>
  )
}
