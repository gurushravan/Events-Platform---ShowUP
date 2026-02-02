'use client'

import { useEffect, useState } from 'react'
import EventCard from '@/components/events/EventCard'
import { createClient } from '@supabase/supabase-js'

type Event = {
  id: string
  title: string
  category: string
  date: Date
  startTime: string
  price: number
  venue: string
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ExploreResults({
  events
}: {
  events: Event[]
}) {
  const [savedIds, setSavedIds] = useState<string[]>([])

  useEffect(() => {
    async function loadSavedIds() {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) return

      const res = await fetch('/api/saved/ids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      })

      const ids = await res.json()
      setSavedIds(ids)
    }

    loadSavedIds()
  }, [])

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map(event => (
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
          isSaved={savedIds.includes(event.id)}
        />
      ))}
    </div>
  )
}
