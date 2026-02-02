import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId } = await req.json()

  if (!userId) {
    return NextResponse.json([], { status: 400 })
  }

  const saved = await prisma.savedEvent.findMany({
    where: {
      userId,
      event: {
        isDeleted: false
      }
    },
    include: {
      event: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return NextResponse.json(saved)
}
