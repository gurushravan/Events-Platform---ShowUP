type Props = {
  title: string
  category: string
  isTrustedOrganizer: boolean
}

export default function EventHeader({
  title,
  category,
  isTrustedOrganizer
}: Props) {
  return (
    <section>
      <div className="mb-2 flex items-center gap-2">
        {/* Category badge */}
        <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-xs text-white/80">
          {category}
        </span>

        {/* Trusted organizer badge */}
        {isTrustedOrganizer && (
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-300">
            Trusted organizer
          </span>
        )}
      </div>

      <h1 className="text-2xl font-semibold text-white">
        {title}
      </h1>
    </section>
  )
}
