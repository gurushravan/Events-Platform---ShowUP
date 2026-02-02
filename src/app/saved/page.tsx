'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import EventCard from '@/components/events/EventCard'
import { createClient } from '@supabase/supabase-js'

type SavedRow = {
  event: {
    id: string
    title: string
    category: string
    date: string
    startTime: string
    price: number
    venue: string
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SavedEventsPage() {
  const router = useRouter()
  const [saved, setSaved] = useState<SavedRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSaved() {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const res = await fetch('/api/saved/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      })

      const data = await res.json()
      setSaved(data)
      setLoading(false)
    }

    loadSaved()
  }, [router])

  return (
    <>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-4 text-xl font-semibold">
          Saved events
        </h1>

        {loading ? (
          <p className="text-sm text-gray-600">
            Loading...
          </p>
        ) : saved.length === 0 ? (
          <p className="text-sm text-gray-600">
            You have not saved any events yet.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map(({ event }) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                category={event.category}
                date={new Date(event.date).toDateString()}
                time={event.startTime}
                price={event.price}
                venue={event.venue}
                distance={2.5}
                isSaved
              />
            ))}
          </div>
        )}
      </main>

 
    </>
  )
}
