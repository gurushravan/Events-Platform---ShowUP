'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function MyBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  useEffect(() => {
    async function loadBookings() {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const res = await fetch('/api/bookings/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      })

      const data = await res.json()
      setBookings(data)
      setLoading(false)
    }

    loadBookings()
  }, [router])

  async function cancelBooking(bookingId: string, userId: string) {
    setCancellingId(bookingId)

    const res = await fetch('/api/bookings/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingId,
        userId
      })
    })

    if (res.ok) {
      setBookings(prev =>
        prev.map(b =>
          b.id === bookingId
            ? { ...b, status: 'CANCELLED' }
            : b
        )
      )
    }

    setCancellingId(null)
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold">
        My bookings
      </h1>

      {loading ? (
        <p className="text-sm text-gray-600">
          Loading bookings...
        </p>
      ) : bookings.length === 0 ? (
        <p className="text-sm text-gray-600">
          You have not booked any events yet.
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div
              key={booking.id}
              className="rounded border p-4"
            >
              <h2 className="text-sm font-semibold">
                {booking.event.title}
              </h2>

              <p className="text-xs text-gray-600">
                {new Date(
                  booking.event.date
                ).toDateString()}
              </p>

              <div className="mt-2 flex justify-between text-sm">
                <span>
                  Tickets: {booking.quantity}
                </span>

                <span className="font-medium">
                  ₹{booking.total}
                </span>
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Booked on{' '}
                {new Date(
                  booking.createdAt
                ).toLocaleDateString()}
              </p>

              {/* Ticket info */}
              {booking.ticketId && (
                <p className="mt-1 text-xs text-gray-500">
                  Ticket ID: {booking.ticketId}
                </p>
              )}

              <div className="mt-3 flex items-center gap-3">
                {booking.status === 'CONFIRMED' ? (
                  <>
                    <Link
                      href={`/bookings/success?bookingId=${booking.id}`}
                      className="rounded bg-black px-3 py-1 text-xs text-white hover:bg-gray-800"
                    >
                      View ticket
                    </Link>

                    <button
                      onClick={() =>
                        cancelBooking(
                          booking.id,
                          booking.userId
                        )
                      }
                      disabled={
                        cancellingId === booking.id
                      }
                      className="rounded border px-3 py-1 text-xs hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {cancellingId === booking.id
                        ? 'Cancelling...'
                        : 'Cancel booking'}
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-medium text-red-600">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
