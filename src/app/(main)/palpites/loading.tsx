export default function PalpitesLoading() {
  return (
    <main className="min-h-screen bg-brasa-bg px-4 py-8 max-w-2xl mx-auto">
      <div className="h-10 w-40 bg-white/5 rounded-lg mb-8 animate-pulse" />
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-20 bg-brasa-surface rounded-xl animate-pulse border border-white/5"
          />
        ))}
      </div>
    </main>
  )
}
