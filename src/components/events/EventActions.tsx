'use client'

import React from 'react'

export default function EventActions({
  price,
  eventDate,
  children
}: {
  price: number
  eventDate: Date | string
  children?: React.ReactNode
}) {
  const eventDateObj =
    typeof eventDate === 'string'
      ? new Date(eventDate)
      : eventDate

  // Normalize to start of today to avoid time issues
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isEventOver = eventDateObj < today

  return (
    <aside className="sticky top-24 rounded-lg border p-4">
      <div className="mb-4">
        <p className="text-sm text-gray-600">Price</p>
        <p className="text-xl font-semibold">₹{price}</p>
        <p className="text-xs text-gray-500">
          Inclusive of all fees
        </p>
      </div>

      {isEventOver ? (
        <p className="rounded-md bg-gray-100 px-3 py-2 text-center text-sm font-medium text-gray-600">
          This event is over
        </p>
      ) : (
        children
      )}
    </aside>
  )
}
