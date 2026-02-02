'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type EventForm = {
  title: string
  description: string
  category: string
  date: string
  startTime: string
  endTime: string
  price: number
  venue: string
  city: string
  capacity: number
  isHiddenGem: boolean
}

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<EventForm | null>(null)

  useEffect(() => {
    async function init() {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      const res = await fetch(`/api/events/${eventId}`)
      if (!res.ok) {
        alert('Event not found')
        router.push('/organizer/dashboard')
        return
      }

      const event = await res.json()

      setForm({
        title: event.title,
        description: event.description,
        category: event.category,
        date: event.date.split('T')[0],
        startTime: event.startTime,
        endTime: event.endTime,
        price: event.price,
        venue: event.venue,
        city: event.city,
        capacity: event.capacity,
        isHiddenGem: event.isHiddenGem
      })

      setLoading(false)
    }

    init()
  }, [router, eventId])

  async function handleSave() {
    if (!form) return

    setLoading(true)

    const res = await fetch(`/api/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      router.push('/organizer/dashboard')
    } else {
      alert('Failed to update event')
      setLoading(false)
    }
  }

  if (loading || !form) {
    return (
      <>
        <p className="p-6 text-sm text-gray-600">Loading event...</p>
      </>
    )
  }

  return (
    <>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="mb-6 text-xl font-semibold">Edit event</h1>

        <div className="space-y-4">
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full rounded border px-3 py-2"
          />

          <textarea
            value={form.description}
            onChange={e =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full rounded border px-3 py-2"
          />

          <input
            value={form.category}
            onChange={e =>
              setForm({ ...form, category: e.target.value })
            }
            className="w-full rounded border px-3 py-2"
          />

          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            className="w-full rounded border px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              value={form.startTime}
              onChange={e =>
                setForm({ ...form, startTime: e.target.value })
              }
              className="w-full rounded border px-3 py-2"
            />
            <input
              type="time"
              value={form.endTime}
              onChange={e =>
                setForm({ ...form, endTime: e.target.value })
              }
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <input
            type="number"
            min={0}
            value={form.price}
            onChange={e =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            className="w-full rounded border px-3 py-2"
          />

          <input
            type="number"
            min={1}
            value={form.capacity}
            onChange={e =>
              setForm({ ...form, capacity: Number(e.target.value) })
            }
            className="w-full rounded border px-3 py-2"
          />

          <input
            value={form.venue}
            onChange={e =>
              setForm({ ...form, venue: e.target.value })
            }
            className="w-full rounded border px-3 py-2"
          />

          <input
            value={form.city}
            onChange={e =>
              setForm({ ...form, city: e.target.value })
            }
            className="w-full rounded border px-3 py-2"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isHiddenGem}
              onChange={e =>
                setForm({
                  ...form,
                  isHiddenGem: e.target.checked
                })
              }
            />
            Mark as Hidden Gem
          </label>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </main>


    </>
  )
}
