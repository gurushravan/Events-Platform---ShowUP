

export default function OrganizerGuidePage() {
  return (
    <>

      <main className="mx-auto max-w-4xl px-4 py-10 text-white">
        <h1 className="mb-6 text-3xl font-semibold">
          Organizer Guide
        </h1>

        <p className="mb-8 text-sm text-white/70">
          This guide explains how to create, manage and run successful events
          on the Events platform.
        </p>

        <div className="space-y-8">
          <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
            <h2 className="mb-2 text-lg font-semibold">
              1. Becoming an Organizer
            </h2>
            <p className="text-sm text-white/70">
              To host events, you must have an organizer account. If you are
              eligible, you will see access to the organizer dashboard after
              logging in.
            </p>
          </section>

          <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
            <h2 className="mb-2 text-lg font-semibold">
              2. Creating an Event
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-white/70">
              <li>Provide a clear and descriptive event title</li>
              <li>Select the most relevant category</li>
              <li>Add accurate date, time and venue details</li>
              <li>Set ticket pricing and capacity carefully</li>
              <li>Write a detailed event description</li>
            </ul>
          </section>

          <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
            <h2 className="mb-2 text-lg font-semibold">
              3. Managing Bookings
            </h2>
            <p className="text-sm text-white/70">
              You can track bookings and attendee counts from the organizer
              dashboard. Once an event date has passed, bookings are
              automatically disabled.
            </p>
          </section>

          <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
            <h2 className="mb-2 text-lg font-semibold">
              4. Best Practices
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-white/70">
              <li>Keep event details accurate and up to date</li>
              <li>Respond to attendee queries promptly</li>
              <li>Arrive early and be prepared on event day</li>
              <li>Follow all local laws and venue policies</li>
            </ul>
          </section>

          <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
            <h2 className="mb-2 text-lg font-semibold">
              5. Support
            </h2>
            <p className="text-sm text-white/70">
              If you face any issues while organizing an event, contact support
              or refer to platform documentation for updates and changes.
            </p>
          </section>
        </div>
      </main>

    </>
  )
}
