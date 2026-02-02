'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/')
  }

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-8 text-white">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-black/60 p-6 backdrop-blur-md">

        {/* Brand */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            <span className="text-white">Show</span>
            <span className="ml-0.5 text-purple-400">Up</span>
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Log in to discover events
          </p>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {/* Password with toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 pr-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && (
          <p className="mb-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mb-4 w-full rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <p className="text-center text-sm text-white/60">
          Don’t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-purple-400 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
