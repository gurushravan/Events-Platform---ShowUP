import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function POST(req: Request) {
  const { eventId, userId, quantity } = await req.json()

  if (!eventId || !userId || !quantity || quantity <= 0) {
    return NextResponse.json(
      { error: 'Invalid booking data' },
      { status: 400 }
    )
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId }
  })

  if (!event || event.isDeleted) {
    return NextResponse.json(
      { error: 'Event is not available for booking' },
      { status: 400 }
    )
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const eventDate = new Date(event.date)

  if (eventDate < today) {
    return NextResponse.json(
      { error: 'This event is already over' },
      { status: 400 }
    )
  }

  const bookedCount = await prisma.booking.aggregate({
    where: { eventId },
    _sum: { quantity: true }
  })

  const alreadyBooked = bookedCount._sum.quantity ?? 0

  if (alreadyBooked + quantity > event.capacity) {
    return NextResponse.json(
      { error: 'Not enough tickets available' },
      { status: 400 }
    )
  }

  const total = event.price * quantity

  try {
    const booking = await prisma.booking.create({
      data: {
        userId,
        eventId,
        quantity,
        total
      }
    })

    return NextResponse.json(
      { bookingId: booking.id },
      { status: 201 }
    )
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'Event already booked' },
        { status: 409 }
      )
    }

    throw err
  }
}
