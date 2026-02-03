import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md text-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-base font-semibold tracking-tight">
              <span className="text-white">Show</span>
              <span className="ml-0.5 text-purple-400/80">Up</span>
            </h3>

            <p className="text-sm text-white/70">
              Discover events worth attending.
            </p>
          </div>

          {/* Organizers */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-white">
              Organizers
            </h4>
            <ul className="space-y-1 text-sm text-white/70">
              <li>
                <Link
                  href="/organizer/create-event"
                  className="hover:text-white hover:underline"
                >
                  Create an event
                </Link>
              </li>
              <li>
                <Link
                  href="/organizer-guide"
                  className="hover:text-white hover:underline"
                >
                  Organizer Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-white">
              Legal
            </h4>
            <ul className="space-y-1 text-sm text-white/70">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 text-xs text-white/50">
          © {new Date().getFullYear()} ShowUp. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
