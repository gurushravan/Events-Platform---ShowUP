import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId } = await req.json()

  if (!userId) {
    return NextResponse.json({ isOrganizer: false })
  }

  const event = await prisma.event.findFirst({
    where: { organizerId: userId },
    select: { id: true }
  })

  return NextResponse.json({
    isOrganizer: Boolean(event)
  })
}
