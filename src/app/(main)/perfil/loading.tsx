export default function PerfilLoading() {
  return (
    <main className="min-h-screen bg-brasa-bg px-4 sm:px-6 py-8 max-w-2xl mx-auto">
      {/* Identity skeleton */}
      <div className="bg-brasa-surface rounded-xl border border-white/5 p-6 mb-4 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/10 shrink-0" />
          <div className="flex flex-col gap-2 min-w-0">
            <div className="h-5 bg-white/10 rounded w-36" />
            <div className="h-4 bg-white/5 rounded w-48" />
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-white/5">
          <div className="flex items-baseline gap-3 mb-3">
            <div className="w-12 h-12 bg-white/10 rounded" />
            <div className="h-9 bg-white/10 rounded w-28" />
            <div className="h-4 bg-white/5 rounded w-14" />
          </div>
          <div className="h-1.5 bg-white/10 rounded-full w-64 mt-3" />
          <div className="h-3 bg-white/5 rounded w-40 mt-1.5" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-brasa-surface rounded-xl border border-white/5 p-4 animate-pulse"
          >
            <div className="h-10 bg-white/10 rounded w-20 mb-2" />
            <div className="h-3 bg-white/5 rounded w-28" />
          </div>
        ))}
      </div>

      {/* Last predictions skeleton */}
      <div className="bg-brasa-surface rounded-xl border border-white/5 p-4 mb-4 animate-pulse">
        <div className="h-7 bg-white/10 rounded w-40 mb-3" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <div className="h-4 bg-white/10 rounded w-48" />
              <div className="h-4 bg-white/5 rounded w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Achievements skeleton */}
      <div className="bg-brasa-surface rounded-xl border border-white/5 p-4 animate-pulse">
        <div className="h-7 bg-white/10 rounded w-32 mb-3" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-white/5 p-3 flex items-start gap-3">
              <div className="w-8 h-8 bg-white/10 rounded" />
              <div className="flex flex-col gap-1.5">
                <div className="h-3.5 bg-white/10 rounded w-24" />
                <div className="h-3 bg-white/5 rounded w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
