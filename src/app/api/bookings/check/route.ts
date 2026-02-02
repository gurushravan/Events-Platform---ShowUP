import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId, eventId } = await req.json()

  if (!eventId) {
    return NextResponse.json({
      booked: false,
      soldOut: false,
      remaining: 0
    })
  }

  // 1. Fetch event capacity
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { capacity: true }
  })

  if (!event) {
    return NextResponse.json({
      booked: false,
      soldOut: false,
      remaining: 0
    })
  }

  // 2. Check if user already booked (only CONFIRMED)
  let booked = false
  if (userId) {
    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId,
        eventId,
        status: 'CONFIRMED'
      }
    })
    booked = Boolean(existingBooking)
  }

  // 3. Calculate used capacity
  const used = await prisma.booking.aggregate({
    where: {
      eventId,
      status: 'CONFIRMED'
    },
    _sum: {
      quantity: true
    }
  })

  const usedCount = used._sum.quantity ?? 0
  const remaining = Math.max(event.capacity - usedCount, 0)
  const soldOut = remaining === 0

  return NextResponse.json({
    booked,
    soldOut,
    remaining
  })
}
