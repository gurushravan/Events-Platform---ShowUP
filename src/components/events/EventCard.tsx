import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'
import SaveButton from './SaveButton'

type EventCardProps = {
  id: string
  title: string
  category: string
  date: string
  time: string
  price: number
  venue: string
  distance: number
  rating?: number
  isSellingFast?: boolean
  isHiddenGem?: boolean
  isNew?: boolean
  isSaved?: boolean
}

export default function EventCard({
  id,
  title,
  category,
  date,
  time,
  price,
  venue,
  distance,
  rating,
  isSellingFast,
  isHiddenGem,
  isNew,
  isSaved = false
}: EventCardProps) {
  // Date logic
  const eventDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isEventOver = eventDate < today

  return (
    <div
      className={`relative rounded-lg border border-white/10 bg-card/80 p-4 backdrop-blur-sm
        transition-all duration-200 ease-out
        hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40 hover:border-white/20
        ${isHiddenGem ? 'border-dashed' : ''}
      `}
    >
      {/* SAVE BUTTON */}
      <div className="absolute right-2 top-2 z-10">
        <SaveButton eventId={id} initialSaved={isSaved} />
      </div>

      {/* EVENT OVER BADGE */}
      {isEventOver && (
        <div
          title="This event has ended"
          className="absolute left-2 top-2 z-10 cursor-default rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/70"
        >
          Event completed
        </div>
      )}

      {/* CLICKABLE CONTENT */}
      <Link href={`/events/${id}`} className="block">
        {/* Top row */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
              {category}
            </span>

            {isHiddenGem && (
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-300">
                Hidden Gem
              </span>
            )}

            {isNew && (
              <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-xs text-blue-300">
                New
              </span>
            )}
          </div>

          {isSellingFast && !isEventOver && (
            <span className="text-xs font-medium text-red-400">
              Selling fast
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-white">
          {title}
        </h3>

        {/* Date & Time */}
        <p className="mb-2 text-xs text-white/70">
          {date} · {time}
        </p>

        {/* Venue */}
        <p className="mb-3 text-xs text-white/60">
          {venue}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>{distance.toFixed(1)} km</span>
          </div>

          <div className="flex items-center gap-3">
            {rating !== undefined && (
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={12} />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}

            <span className="font-medium text-white">
              ₹{price}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
