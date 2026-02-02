'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type EventType = {
  id: string
  title: string
  price: number
  capacity: number
  isDeleted: boolean
}

export default function BookEventPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [event, setEvent] = useState<EventType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function init() {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      const res = await fetch(`/api/events/${id}`)

      if (!res.ok) {
        setError('Event not found')
        setLoading(false)
        return
      }

      const data: EventType = await res.json()

      if (data.isDeleted) {
        setError('This event has been deleted')
        setLoading(false)
        return
      }

      setEvent(data)
      setLoading(false)
    }

    init()
  }, [id, router])

  async function handleBooking(eventId: string) {
    setSubmitting(true)

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      router.replace('/login')
      return
    }

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId,
        userId: user.id,
        quantity
      })
    })

    if (!res.ok) {
      const data = await res.json()
      alert(data.error || 'Booking failed')
      setSubmitting(false)
      return
    }

    router.push('/bookings/success')
  }

  if (loading) {
    return (
      <p className="p-6 text-sm text-gray-600">
        Loading...
      </p>
    )
  }

  if (!event) {
    return (
      <main className="mx-auto max-w-md px-4 py-8">
        <p className="text-sm text-red-600">
          {error ?? 'Event not found'}
        </p>
      </main>
    )
  }

  const total = event.price * quantity

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-2 text-lg font-semibold">
        {event.title}
      </h1>

      <p className="mb-4 text-sm text-gray-600">
        ₹{event.price} per ticket
      </p>

      <label className="mb-2 block text-sm">
        Number of tickets
      </label>

      <select
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
        className="mb-4 w-full rounded border px-3 py-2"
        disabled={submitting}
      >
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <p className="mb-4 text-sm">
        Total: <strong>₹{total}</strong>
      </p>

      <button
        onClick={() => handleBooking(event.id)}
        disabled={submitting}
        className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-60"
      >
        {submitting ? 'Booking...' : 'Confirm Booking'}
      </button>
    </main>
  )
}
