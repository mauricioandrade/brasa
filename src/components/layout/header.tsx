import { BrasaLogo } from '@/components/brasa/logo'

export function Header() {
  return (
    <header className="h-16 border-b border-white/10 flex items-center px-6">
      <BrasaLogo size="sm" />
    </header>
  )
}
