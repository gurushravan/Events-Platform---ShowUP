import EventCard from '@/components/events/EventCard'

type Event = {
  id: string
  title: string
  category: string
  date: Date
  startTime: string
  price: number
  venue: string
}

export default function OrganizerEvents({
  events
}: {
  events: Event[]
}) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No upcoming events from this organizer.
      </p>
    )
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">
        Upcoming events
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            category={event.category}
            date={event.date.toDateString()}
            time={event.startTime}
            price={event.price}
            venue={event.venue}
            distance={2.5}
          />
        ))}
      </div>
    </section>
  )
}
