import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId } = await req.json()

  if (!userId) {
    return NextResponse.json([])
  }

  const saved = await prisma.savedEvent.findMany({
    where: {
      userId,
      event: {
        isDeleted: false
      }
    },
    select: {
      eventId: true
    }
  })

  return NextResponse.json(saved.map(s => s.eventId))
}
