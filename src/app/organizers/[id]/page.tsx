import { notFound } from 'next/navigation'

import OrganizerHeader from '@/components/organizers/OrganizerHeader'
import OrganizerEvents from '@/components/organizers/OrganizerEvents'
import { prisma } from '@/lib/prisma'

export default async function OrganizerProfilePage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params

  const events = await prisma.event.findMany({
    where: {
      organizerId: params.id,
      isDeleted: false
    },
    orderBy: {
      date: 'asc'
    }
  })

  if (events.length === 0) {
    notFound()
  }

  return (
    <>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <OrganizerHeader
          name="Organizer"
          isTrusted={false}
          eventCount={events.length}
        />

        <OrganizerEvents events={events} />
      </main>

    </>
  )
}
