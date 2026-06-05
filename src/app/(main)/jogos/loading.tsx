export default function JogosLoading() {
  return (
    <main className="min-h-screen bg-brasa-bg px-4 py-8 max-w-2xl mx-auto">
      <div className="h-10 w-32 bg-white/5 rounded-lg mb-8 animate-pulse" />
      {[1, 2, 3].map((g) => (
        <div key={g} className="mb-8">
          <div className="h-6 w-20 bg-amarelo-400/20 rounded mb-3 animate-pulse" />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-brasa-surface rounded-xl mb-2 animate-pulse border border-white/5"
            />
          ))}
        </div>
      ))}
    </main>
  )
}
