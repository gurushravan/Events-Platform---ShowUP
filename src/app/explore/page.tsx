import { prisma } from '@/lib/prisma'
import SearchBar from '@/components/explore/SearchBar'
import Filters from '@/components/explore/Filters'
import ExploreResults from '@/components/explore/ExploreResults'

export default async function ExplorePage(
  props: {
    searchParams: Promise<{
      q?: string
      category?: string
      price?: string
      date?: string
    }>
  }
) {
  const searchParams = await props.searchParams

  // ⏱️ Remove past events
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const events = await prisma.event.findMany({
    where: {
      isDeleted: false,

      // ✅ only today & future events
      date: {
        gte: today
      },

      ...(searchParams.q && {
        OR: [
          {
            category: {
              contains: searchParams.q,
              mode: 'insensitive'
            }
          },
          {
            title: {
              contains: searchParams.q,
              mode: 'insensitive'
            }
          }
        ]
      }),

      ...(searchParams.category && {
        category: {
          equals: searchParams.category,
          mode: 'insensitive'
        }
      }),

      ...(searchParams.price === 'under500' && {
        price: { lte: 500 }
      })
    },

    // Upcoming events first
    orderBy: {
      date: 'asc'
    }
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 text-white">
      <SearchBar />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <Filters />

        <section className="rounded-lg border border-white/10 bg-card/80 p-4 backdrop-blur-sm">
          <p className="mb-4 text-sm text-white/70">
            Showing {events.length} events
          </p>

          <ExploreResults events={events} />
        </section>
      </div>
    </main>
  )
}
