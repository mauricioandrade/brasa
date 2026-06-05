import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'

import './globals.css'

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
    <html lang="pt-BR" className={`${inter.variable} ${bebas.variable}`}>
      <body className="bg-brasa-bg text-white antialiased">{children}</body>
    </html>
  )
}
