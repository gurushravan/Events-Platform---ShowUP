import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const event = await prisma.event.findFirst({
    where: {
      id,
      isDeleted: false
    }
  })

  if (!event) {
    return NextResponse.json(
      { error: 'Event not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(event)
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await req.json()

  const event = await prisma.event.findUnique({
    where: { id }
  })

  if (!event || event.isDeleted) {
    return NextResponse.json(
      { error: 'Event not found' },
      { status: 404 }
    )
  }

  const updated = await prisma.event.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description,
      category: body.category,
      date: new Date(body.date),
      startTime: body.startTime,
      endTime: body.endTime,
      price: body.price,
      venue: body.venue,
      city: body.city,
      capacity: body.capacity,
      isHiddenGem: body.isHiddenGem
    }
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  await prisma.event.update({
    where: { id },
    data: { isDeleted: true }
  })

  return NextResponse.json({ success: true })
}
