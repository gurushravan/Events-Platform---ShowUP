import Link from 'next/link'


export default function BookingSuccessPage() {
  return (
    <>

      <main className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="mb-2 text-xl font-semibold">
          Booking confirmed
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Your tickets have been successfully booked.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/bookings"
            className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            View my bookings
          </Link>

          <Link
            href="/"
            className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
          >
            Go home
          </Link>
        </div>
      </main>


    </>
  )
}
