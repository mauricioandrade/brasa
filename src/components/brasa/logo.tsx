import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { emblem: 34, fontSize: 22, tagSize: 8 },
  md: { emblem: 52, fontSize: 32, tagSize: 10 },
  lg: { emblem: 110, fontSize: 64, tagSize: 12 },
}

export function BrasaLogo({ size = 'md', className }: LogoProps) {
  const s = sizes[size]

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className="rounded-full bg-azul-500 border-2 border-amarelo-400 flex flex-col items-center justify-center flex-shrink-0"
        style={{ width: s.emblem, height: s.emblem }}
      >
        <span
          className="font-sans font-black text-amarelo-400 leading-none"
          style={{ fontSize: s.tagSize * 0.7 }}
        >
          COPA
        </span>
        <span className="font-display text-white leading-none" style={{ fontSize: s.emblem * 0.3 }}>
          B26
        </span>
        <span
          className="font-sans font-semibold text-white/40 leading-none"
          style={{ fontSize: s.tagSize * 0.6 }}
        >
          BRASA
        </span>
      </div>
      <div className="flex flex-col">
        <span
          className="font-display text-white leading-none tracking-widest"
          style={{ fontSize: s.fontSize }}
        >
          BRA<span className="text-verde-500">S</span>
          <span className="text-amarelo-400">A</span>
        </span>
        {size === 'lg' && (
          <span
            className="font-sans text-white/35 tracking-widest font-medium"
            style={{ fontSize: 11 }}
          >
            O BOLÃO MAIS QUENTE DA COPA
          </span>
        )}
      </div>
    </div>
  )
}
