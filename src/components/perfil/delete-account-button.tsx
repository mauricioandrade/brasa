'use client'

import { useState, useTransition } from 'react'

interface DeleteAccountButtonProps {
  deleteAccount: () => Promise<void>
}

export function DeleteAccountButton({ deleteAccount }: DeleteAccountButtonProps) {
  const [confirming, setConfirming] = useState(false)
  const [input, setInput] = useState('')
  const [isPending, startTransition] = useTransition()

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="text-red-400/60 text-xs hover:text-red-400 transition-colors underline underline-offset-2"
      >
        Excluir conta
      </button>
    )
  }

  return (
    <div className="border border-red-500/20 rounded-xl p-4 bg-red-500/5 flex flex-col gap-3">
      <p className="text-white/70 text-sm leading-relaxed">
        Esta ação é <span className="text-red-400 font-semibold">irreversível</span>. Todos os seus
        palpites e dados serão excluídos permanentemente. Digite{' '}
        <span className="font-mono text-white/90 select-all">EXCLUIR</span> para confirmar.
      </p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="EXCLUIR"
        className="w-full bg-brasa-bg border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-red-500/40"
        disabled={isPending}
      />
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (input !== 'EXCLUIR') return
            startTransition(() => deleteAccount())
          }}
          disabled={input !== 'EXCLUIR' || isPending}
          className="px-4 py-1.5 rounded-full bg-red-500 text-white text-xs font-semibold hover:bg-red-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPending ? 'Excluindo...' : 'Confirmar exclusão'}
        </button>
        <button
          onClick={() => {
            setConfirming(false)
            setInput('')
          }}
          disabled={isPending}
          className="text-white/30 text-xs hover:text-white/60 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
