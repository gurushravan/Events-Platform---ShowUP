import { Calendar, Clock, MapPin } from 'lucide-react'

type Props = {
  date: Date
  startTime: string
  endTime: string
  venue: string
  city: string
}

export default function EventMeta({
  date,
  startTime,
  endTime,
  venue,
  city
}: Props) {
  return (
    <section className="rounded-lg border p-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-start gap-2">
          <Calendar size={16} />
          <div>
            <p className="text-sm font-medium">Date</p>
            <p className="text-sm text-gray-600">
              {date.toDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Clock size={16} />
          <div>
            <p className="text-sm font-medium">Time</p>
            <p className="text-sm text-gray-600">
              {startTime} – {endTime}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin size={16} />
          <div>
            <p className="text-sm font-medium">Venue</p>
            <p className="text-sm text-gray-600">
              {venue}, {city}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
