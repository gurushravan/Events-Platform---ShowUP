'use client'

import { Bookmark } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SaveButton({
  eventId,
  initialSaved
}: {
  eventId: string
  initialSaved: boolean
}) {
  const router = useRouter() 
  const [saved, setSaved] = useState(initialSaved)
  const [loading, setLoading] = useState(false)

  // Sync saved state from props
  useEffect(() => {
    setSaved(initialSaved)
  }, [initialSaved])

  async function toggleSave(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()

    if (loading) return
    setLoading(true)

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      toast.error('Please log in to save events')
      router.push('/login')
      return
    }


    const res = await fetch('/api/saved', {
      method: saved ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId,
        userId: user.id
      })
    })

    if (res.ok) {
      setSaved(!saved)

      if (!saved) {
        toast.success('Event saved')
      } else {
        toast.success('Removed from saved')
      }
    }


    setLoading(false)
  }

  return (
    <button
      onClick={toggleSave}
      disabled={loading}
      className="rounded-full p-2 hover:bg-gray-100"
    >
      <Bookmark
        size={18}
        strokeWidth={2}
        className={
          saved
            ? 'fill-black text-black'
            : 'text-gray-400'
        }
      />
    </button>
  )
}
