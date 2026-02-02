'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { updateQuery } from '@/lib/updateQuery'

const categories = ['Comedy', 'Music', 'Workshops', 'Theatre', 'Kids']

export default function Filters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function toggleCategory(category: string) {
    const current = searchParams.get('category')
    const value = current === category ? null : category

    const query = updateQuery(searchParams, 'category', value)
    router.push(`/explore?${query}`)
  }

  return (
    <aside className="rounded-lg border border-white/10 bg-card/80 p-4 backdrop-blur-sm text-white">
      <h3 className="mb-4 text-sm font-semibold">
        Filters
      </h3>

      {/* Category */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium text-white/70">
          Category
        </p>

        <div className="space-y-1 text-sm">
          {categories.map(cat => (
            <label
              key={cat}
              className="flex cursor-pointer items-center gap-2 text-white/80"
            >
              <input
                type="checkbox"
                checked={searchParams.get('category') === cat}
                onChange={() => toggleCategory(cat)}
                className="
                  h-4 w-4
                  rounded
                  border border-white/30
                  bg-black/40
                  text-purple-500
                  focus:ring-2 focus:ring-purple-500/60
                "
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium text-white/70">
          Price
        </p>

        <select
          value={searchParams.get('price') ?? ''}
          onChange={e => {
            const query = updateQuery(
              searchParams,
              'price',
              e.target.value || null
            )
            router.push(`/explore?${query}`)
          }}
          className="
            w-full rounded
            border border-white/20
            bg-black/40 backdrop-blur
            px-2 py-1 text-sm text-white
            focus:outline-none
            focus:ring-2 focus:ring-purple-500/60
          "
        >
          <option value="">Any</option>
          <option value="under500">Under ₹500</option>
          <option value="500-1000">₹500 – ₹1000</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <p className="mb-2 text-xs font-medium text-white/70">
          Date
        </p>

        <select
          value={searchParams.get('date') ?? ''}
          onChange={e => {
            const query = updateQuery(
              searchParams,
              'date',
              e.target.value || null
            )
            router.push(`/explore?${query}`)
          }}
          className="
            w-full rounded
            border border-white/20
            bg-black/40 backdrop-blur
            px-2 py-1 text-sm text-white
            focus:outline-none
            focus:ring-2 focus:ring-purple-500/60
          "
        >
          <option value="">Any</option>
          <option value="today">Today</option>
          <option value="weekend">This weekend</option>
        </select>
      </div>
    </aside>
  )
}
