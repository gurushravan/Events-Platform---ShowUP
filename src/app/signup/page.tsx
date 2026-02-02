'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Eye, EyeOff } from 'lucide-react'

function getPasswordStrength(password: string) {
  if (password.length < 8) {
    return { label: 'Weak', level: 1 }
  }

  const hasLetters = /[a-zA-Z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecial = /[^a-zA-Z0-9]/.test(password)

  if (hasLetters && hasNumbers && hasSpecial) {
    return { label: 'Strong', level: 4 }
  }

  if (hasLetters && hasNumbers) {
    return { label: 'Good', level: 3 }
  }

  return { label: 'Okay', level: 2 }
}

export default function SignupPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const strength = getPasswordStrength(password)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })

    setLoading(false)

    if (error) {
      setError(error.message)
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
            Create your account
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Full name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                minLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 pr-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              />

              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Strength */}
            {password && (
              <div className="mt-2">
                <div className="mb-1 flex justify-between text-xs text-white/60">
                  <span>Password strength</span>
                  <span>{strength.label}</span>
                </div>

                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`
                      h-full transition-all
                      ${strength.level === 1 && 'w-1/4 bg-red-500'}
                      ${strength.level === 2 && 'w-2/4 bg-yellow-400'}
                      ${strength.level === 3 && 'w-3/4 bg-purple-400'}
                      ${strength.level === 4 && 'w-full bg-green-500'}
                    `}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white/60">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-purple-400 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
