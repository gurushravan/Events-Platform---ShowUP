import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { bookingId, userId } = await req.json()

  if (!bookingId || !userId) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId,
      status: 'CONFIRMED'
    }
  })

  if (!booking) {
    return NextResponse.json(
      { error: 'Booking not found' },
      { status: 404 }
    )
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: 'CANCELLED'
    }
  })

  return NextResponse.json({ success: true })
}
