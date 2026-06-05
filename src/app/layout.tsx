import type { Metadata } from 'next'
import { Bebas_Neue, Geist, Inter } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

export const metadata: Metadata = {
  title: 'Brasa — O bolão mais quente da Copa',
  description: 'Bolão da Copa do Mundo 2026 com fantasy points. Acerte o placar, supere a galera.',
  openGraph: {
    title: 'Brasa',
    description: 'O bolão mais quente da Copa do Mundo 2026',
    siteName: 'Brasa',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={cn(inter.variable, bebas.variable, 'font-sans', geist.variable)}>
      <body className="bg-brasa-bg text-white antialiased">{children}</body>
    </html>
  )
}
