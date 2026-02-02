import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { eventId, userId } = await req.json()

  if (!eventId || !userId) {
    return NextResponse.json(
      { error: 'Missing eventId or userId' },
      { status: 400 }
    )
  }

  try {
    // Check if already saved
    const existing = await prisma.savedEvent.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId
        }
      }
    })

    if (existing) {
      // Already saved → treat as success
      return NextResponse.json({ success: true })
    }

    await prisma.savedEvent.create({
      data: {
        userId,
        eventId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save event' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  const { eventId, userId } = await req.json()

  if (!eventId || !userId) {
    return NextResponse.json(
      { error: 'Missing eventId or userId' },
      { status: 400 }
    )
  }

  try {
    await prisma.savedEvent.delete({
      where: {
        userId_eventId: {
          userId,
          eventId
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // If it doesn't exist, also treat as success
    return NextResponse.json({ success: true })
  }
}
