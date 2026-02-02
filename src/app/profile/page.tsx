'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabase/client'

function getInitials(
  name: string | null,
  email: string | null
) {
  if (name) {
    const parts = name.trim().split(' ')
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase()
  }

  return email ? email[0].toUpperCase() : '?'
}

export default function ProfilePage() {
  const router = useRouter()

  const [email, setEmail] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      const currentName =
        (user.user_metadata?.name as string) ?? null

      setEmail(user.email ?? null)
      setName(currentName)
      setNewName(currentName ?? '')
      setLoading(false)
    }

    loadProfile()
  }, [router])

  async function handleSaveName() {
    if (!newName.trim()) {
      setError('Name cannot be empty')
      return
    }

    setSaving(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({
      data: { name: newName.trim() }
    })

    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }

    setName(newName.trim())
    setEditing(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <>

        <main className="mx-auto max-w-4xl px-4 py-10">
          <p className="text-sm text-gray-600">
            Loading profile...
          </p>
        </main>
 
      </>
    )
  }

  return (
    <>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-semibold">
          {name ? `Hello ${name}` : 'Hello'}
        </h1>

        <div className="rounded border bg-white p-8 space-y-8">
          {/* Avatar + basic info */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-xl font-semibold text-white">
              {getInitials(name, email)}
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-900">
                {name ?? 'Your profile'}
              </p>
              <p className="text-base text-gray-600">
                {email}
              </p>
            </div>
          </div>

          {/* Name section */}
          <div>
            <p className="mb-1 text-base font-medium text-gray-500">
              Name
            </p>

            {editing ? (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newName}
                  onChange={e =>
                    setNewName(e.target.value)
                  }
                  className="flex-1 rounded border px-4 py-2 text-base"
                />

                <button
                  onClick={handleSaveName}
                  disabled={saving}
                  className="rounded bg-black px-4 py-2 text-base text-white disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>

                <button
                  onClick={() => {
                    setEditing(false)
                    setNewName(name ?? '')
                    setError(null)
                  }}
                  className="rounded border px-4 py-2 text-base"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p className="text-xl font-semibold text-gray-900">
                  {name ?? 'Not set'}
                </p>

                <button
                  onClick={() => setEditing(true)}
                  className="text-base font-medium text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {error && (
            <p className="text-base text-red-600">
              {error}
            </p>
          )}

          {/* Logout */}
          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="rounded bg-red-600 px-4 py-2 text-base text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </main>


    </>
  )
}
