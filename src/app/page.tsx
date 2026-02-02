import { prisma } from '@/lib/prisma'
import HeroSearch from '@/components/home/HeroSearch'
import ExploreResults from '@/components/explore/ExploreResults'

export default async function HomePage() {
  // ⏱️ Filter out past events
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [nearbyEvents, hiddenGems, recentEvents] = await Promise.all([
    prisma.event.findMany({
      where: {
        isDeleted: false,
        date: {
          gte: today
        }
      },
      take: 6,
      orderBy: { date: 'asc' }
    }),

    prisma.event.findMany({
      where: {
        isHiddenGem: true,
        isDeleted: false,
        date: {
          gte: today
        }
      },
      take: 6,
      orderBy: { date: 'asc' }
    }),

    prisma.event.findMany({
      where: {
        isDeleted: false,
        date: {
          gte: today
        }
      },
      take: 6,
      orderBy: { createdAt: 'desc' }
    })
  ])

  return (
    <main>
      <HeroSearch />

      {/* Happening Near You */}
      <section className="mx-auto max-w-7xl px-4 py-8 text-white">
        <h2 className="mb-4 text-lg font-semibold">
          Happening Near You
        </h2>

        <ExploreResults events={nearbyEvents} />
      </section>

      {/* Hidden Gems */}
      {hiddenGems.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 text-white">
          <h2 className="mb-4 text-lg font-semibold">
            Hidden Gems
          </h2>

          <ExploreResults events={hiddenGems} />
        </section>
      )}

      {/* Browse by Category */}
      <section className="mx-auto max-w-7xl px-4 py-8 text-white">
        <h2 className="mb-4 text-lg font-semibold">
          Browse by Category
        </h2>

        <div className="flex flex-wrap gap-3">
          {[
            'Music',
            'Comedy',
            'Sports',
            'Workshops',
            'Theatre',
            'Tech'
          ].map(category => (
            <a
              key={category}
              href={`/explore?category=${category}`}
              className="
                rounded-full
                border border-white/15
                bg-white/5
                px-4 py-2 text-sm text-white/80
                hover:bg-white/10
                transition
              "
            >
              {category}
            </a>
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section className="mx-auto max-w-7xl px-4 py-8 text-white">
        <h2 className="mb-4 text-lg font-semibold">
          Recently Added
        </h2>

        <ExploreResults events={recentEvents} />
      </section>
    </main>
  )
}
