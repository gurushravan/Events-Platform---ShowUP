'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function BookCTA({ eventId }: { eventId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [booked, setBooked] = useState(false)
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    async function check() {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      const eventRes = await fetch(`/api/events/${eventId}`)
      const event = await eventRes.json()

      if (!user) {
        // not logged in → just show Book Now / Sold out
        setRemaining(event.capacity)
        setLoading(false)
        return
      }

      // check if already booked (CONFIRMED only)
      const res = await fetch('/api/bookings/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          eventId
        })
      })

      const data = await res.json()
      setBooked(data.booked)

      /*
        Remaining tickets shown here are UX-only.
        The booking API is the final authority.
      */
      setRemaining(event.capacity)
      setLoading(false)
    }

    check()
  }, [eventId])

  if (loading) {
    return null
  }

  // SOLD OUT
  if (remaining === 0) {
    return (
      <button
        disabled
        className="mt-4 w-full cursor-not-allowed rounded bg-gray-300 px-4 py-2 text-sm text-gray-700"
      >
        Sold out
      </button>
    )
  }

  // ALREADY BOOKED
  if (booked) {
    return (
      <div className="mt-4">
        <button
          disabled
          className="w-full cursor-not-allowed rounded bg-gray-300 px-4 py-2 text-sm text-gray-700"
        >
          Already booked
        </button>

        <Link
          href="/bookings"
          className="mt-2 block text-center text-sm text-blue-600 hover:underline"
        >
          View my bookings
        </Link>
      </div>
    )
  }

  // CAN BOOK
  return (
    <div className="mt-4">
      <button
        onClick={() => router.push(`/events/${eventId}/book`)}
        className="w-full rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
      >
        Book Now
      </button>

      {remaining !== null && remaining <= 5 && (
        <p className="mt-2 text-center text-xs text-red-600">
          Only {remaining} tickets left
        </p>
      )}
    </div>
  )
}
