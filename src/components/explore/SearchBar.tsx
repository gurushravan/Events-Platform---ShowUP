'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { updateQuery } from '@/lib/updateQuery'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
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

    const newQuery = updateQuery(searchParams, 'q', debouncedQuery)
    router.push(`/explore?${newQuery}`)
  }, [debouncedQuery, router, searchParams])

  // Enter key = instant search
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    if (!query.trim()) return

    const newQuery = updateQuery(searchParams, 'q', query)
    router.push(`/explore?${newQuery}`)
  }

  function handleFilter(key: string, value: string) {
    const newQuery = updateQuery(searchParams, key, value)
    router.push(`/explore?${newQuery}`)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search input */}
      <input
        type="text"
        value={query}
        placeholder="Search events, comedy, music, workshops..."
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
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

      {/* Quick filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { label: 'Today', key: 'date', value: 'today' },
          { label: 'This Weekend', key: 'date', value: 'weekend' },
          { label: 'Under ₹500', key: 'price', value: 'under500' },
          { label: 'Near Me', key: 'near', value: 'true' }
        ].map(({ label, key, value }) => (
          <button
            key={label}
            onClick={() => handleFilter(key, value)}
            className="
              rounded-full
              border border-white/15
              bg-white/5
              px-4 py-2 text-sm text-white/80
              hover:bg-white/10
              transition
            "
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
