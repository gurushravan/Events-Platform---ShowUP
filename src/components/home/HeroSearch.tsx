'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function HeroSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // Debounce typing (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Navigate after debounce
  useEffect(() => {
    if (!debouncedQuery.trim()) return
    router.push(`/explore?q=${encodeURIComponent(debouncedQuery)}`)
  }, [debouncedQuery, router])

  // Enter key search (instant)
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    if (!query.trim()) return
    router.push(`/explore?q=${encodeURIComponent(query)}`)
  }

  function goToExplore(params: string) {
    router.push(`/explore?${params}`)
  }

  return (
    <section className="border-b border-white/10 bg-transparent">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h1 className="mb-6 text-2xl font-semibold text-white">
          Find events worth attending
        </h1>

        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search events, comedy, music, workshops..."
          className="
            w-full rounded-lg
            border border-white/15
            bg-black/40 backdrop-blur-md
            px-4 py-3 text-sm text-white
            placeholder:text-white/50
            focus:outline-none
            focus:ring-2 focus:ring-purple-500/60
            focus:border-purple-500/60
          "
        />

        {/* Quick Filters */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {[
            { label: 'Today', q: 'date=today' },
            { label: 'This Weekend', q: 'date=weekend' },
            { label: 'Under ₹500', q: 'price=under500' },
            { label: 'Near Me', q: 'near=true' },
            { label: 'Comedy', q: 'q=comedy' },
            { label: 'Music', q: 'q=music' }
          ].map(({ label, q }) => (
            <button
              key={label}
              onClick={() => goToExplore(q)}
              className="
                rounded-full
                border border-white/15
                bg-white/5
                px-4 py-1.5 text-sm text-white/80
                hover:bg-white/10
                transition
              "
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
