import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId } = await req.json()

  if (!userId) {
    return NextResponse.json([], { status: 400 })
  }

  const events = await prisma.event.findMany({
    where: {
      organizerId: userId
    },
    include: {
      bookings: {
        where: {
          status: 'CONFIRMED'
        },
        select: {
          quantity: true
        }
      }
    },
    orderBy: {
      date: 'asc'
    }
  })

  const result = events.map(event => {
    const booked = event.bookings.reduce(
      (sum, b) => sum + b.quantity,
      0
    )

    return {
      id: event.id,
      title: event.title,
      date: event.date,
      capacity: event.capacity,
      booked,
      remaining: event.capacity - booked,
      isDeleted: event.isDeleted
    }
  })

  return NextResponse.json(result)
}
