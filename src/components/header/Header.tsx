'use client'

import Link from 'next/link'
import { Bookmark, User, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter, usePathname } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function getInitials(name: string | null, email: string | null) {
  if (name) {
    const parts = name.trim().split(' ')
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase()
  }
  return email ? email[0].toUpperCase() : '?'
}

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement | null>(null)

  const [email, setEmail] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [isOrganizer, setIsOrganizer] = useState(false)
  const [open, setOpen] = useState(false)

  const isHomePage = pathname === '/'

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getUser()
      const user = data.user

      setEmail(user?.email ?? null)
      setName((user?.user_metadata?.name as string) ?? null)

      if (user) {
        const res = await fetch('/api/organizer/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        })
        const data = await res.json()
        setIsOrganizer(data.isOrganizer)
      } else {
        setIsOrganizer(false)
      }
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user
        setEmail(user?.email ?? null)
        setName((user?.user_metadata?.name as string) ?? null)

        if (user) {
          const res = await fetch('/api/organizer/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id })
          })
          const data = await res.json()
          setIsOrganizer(data.isOrganizer)
        } else {
          setIsOrganizer(false)
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setOpen(false)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-3 items-center px-4 text-white">

        {/* LEFT */}
        <div className="flex items-center">
          <Link
            href="/"
            className="group relative select-none text-xl font-semibold tracking-tight"
          >
            <span className="text-white">Show</span>
            <span className="ml-0.5 text-purple-400">Up</span>

            <span
              className="
                absolute -bottom-1 left-0
                h-[2px] w-full
                origin-left scale-x-0
                bg-purple-400
                transition-transform duration-200
                group-hover:scale-x-100
              "
            />
          </Link>
        </div>

        {/* CENTER */}
        <div className="flex items-center justify-center gap-6">
          {!isHomePage && (
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
          )}

          <Link
            href="/explore"
            className="text-sm font-medium hover:underline"
          >
            Explore Events
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-4">
          {email && isOrganizer && (
            <Link
              href="/organizer/dashboard"
              className="text-sm font-medium hover:underline"
            >
              Organizer Dashboard
            </Link>
          )}

          <Link
            href="/saved"
            className="rounded-full p-2 hover:bg-white/10"
          >
            <Bookmark size={18} />
          </Link>

          {email ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(o => !o)}
                className="group flex items-center gap-2 rounded-full px-2 py-1 hover:bg-white/10"
              >
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-black">
                    {getInitials(name, email)}
                  </div>

                  {/* Thicker hover / active ring */}
                  <span
                    className={`pointer-events-none absolute inset-0 rounded-full ring-4 transition-all duration-200 ${
                      open
                        ? 'ring-white/90'
                        : 'ring-white/0 group-hover:ring-white/90'
                    }`}
                  />
                </div>

                <ChevronDown size={16} />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 rounded border border-white/10 bg-black/90 shadow-lg backdrop-blur-md">
                  <button
                    onClick={() => {
                      setOpen(false)
                      router.push('/profile')
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-white/10"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false)
                      router.push('/bookings')
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-white/10"
                  >
                    My bookings
                  </button>

                  <div className="border-t border-white/10" />

                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full p-2 hover:bg-white/10"
            >
              <User size={18} />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
