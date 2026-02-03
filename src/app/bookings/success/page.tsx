'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

type BookingData = {
  id: string
  ticketId: string
  event: {
    title: string
    date: string
    venue: string
  }
}

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingId')

  const [booking, setBooking] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bookingId) return

    async function fetchBooking() {
      const res = await fetch(`/api/bookings/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId })
      })

      if (res.ok) {
        const data = await res.json()
        setBooking(data)
      }

      setLoading(false)
    }

    fetchBooking()
  }, [bookingId])

  return (
    <main className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="mb-2 text-xl font-semibold">
        Booking confirmed
      </h1>

      <p className="mb-6 text-sm text-gray-600">
        Your ticket is ready. Show this QR code at the venue.
      </p>

      {loading && (
        <p className="text-sm text-gray-500">
          Loading ticket…
        </p>
      )}

      {!loading && booking && (
        <div className="mb-6 rounded-lg border p-4">
          <div className="mb-4 flex justify-center">
            <QRCodeCanvas
              value={booking.ticketId}
              size={180}
              level="H"
            />
          </div>

          <div className="text-sm">
            <p className="font-medium">
              {booking.event.title}
            </p>
            <p className="text-gray-600">
              {booking.event.date}
            </p>
            <p className="text-gray-600">
              {booking.event.venue}
            </p>
          </div>

          <div className="mt-3 rounded bg-gray-100 px-2 py-1 text-xs">
            Ticket ID: {booking.ticketId}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Link
          href="/bookings"
          className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          View my bookings
        </Link>

        <Link
          href="/"
          className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
        >
          Go home
        </Link>
      </div>
    </main>
  )
}
