'use client'

import * as React from 'react'
import { Input } from '../ui/input'

export interface LoginPageProps {
  logo: React.ReactNode
  title?: string
  subtitle?: string
  onLogin: (email: string, password: string) => Promise<void>
  error?: string
}

export default function LoginPage({
  logo,
  title = 'Iniciar sesión',
  subtitle = 'Ingresa tus credenciales para continuar',
  onLogin,
  error: externalError,
}: LoginPageProps) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [internalError, setInternalError] = React.useState<string | null>(null)

  const displayError = externalError ?? internalError

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setInternalError(null)
    try {
      await onLogin(email, password)
    } catch (err) {
      setInternalError(err instanceof Error ? err.message : 'Credenciales incorrectas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: 'var(--color-primary-light, #e0f5f2)' }}
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
        {/* Logo + heading */}
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          {logo}
          {title && <h1 className="text-xl font-semibold text-gray-900">{title}</h1>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cc-email" className="text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <Input
              id="cc-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@empresa.com"
              required
              autoComplete="email"
              autoFocus
              className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-[#008576] focus-visible:ring-[#008576]/20"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cc-password" className="text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <Input
                id="cc-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="pr-10 border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-[#008576] focus-visible:ring-[#008576]/20 [&::-ms-reveal]:hidden"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <path strokeLinecap="round" d="M1 1l22 22" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {displayError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {displayError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-md px-4 py-2 text-sm font-medium text-white transition disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-primary, #008576)' }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </main>
  )
}
