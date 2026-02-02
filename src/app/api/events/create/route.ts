import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()

  const {
    title,
    description,
    category,
    date,
    startTime,
    endTime,
    price,
    venue,
    city,
    capacity,
    isHiddenGem,
    organizerId
  } = body

  if (
    !title ||
    !description ||
    !category ||
    !date ||
    !startTime ||
    !endTime ||
    !price ||
    !venue ||
    !city ||
    !capacity ||
    !organizerId
  ) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  const event = await prisma.event.create({
    data: {
      title,
      description,
      category,
      date: new Date(date),
      startTime,
      endTime,
      price: Number(price),
      venue,
      city,
      capacity: Number(capacity),
      isHiddenGem: Boolean(isHiddenGem),
      organizerId
    }
  })

  return NextResponse.json(event)
}
