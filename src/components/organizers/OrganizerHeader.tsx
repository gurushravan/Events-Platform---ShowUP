type Props = {
  name: string
  isTrusted: boolean
  eventCount: number
}

export default function OrganizerHeader({
  name,
  isTrusted,
  eventCount
}: Props) {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">{name}</h1>

        {isTrusted && (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
            Trusted organizer
          </span>
        )}
      </div>

      <p className="mt-1 text-sm text-gray-600">
        {eventCount} upcoming event{eventCount !== 1 && 's'}
      </p>
    </section>
  )
}
