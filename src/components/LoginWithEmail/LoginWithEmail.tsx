'use client'

import * as React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export interface LoginWithEmailProps {
  logo: React.ReactNode
  logoCaption?: string
  title?: string
  subtitle?: string
  /** Muestra el banner de sesión expirada cuando se provee un mensaje */
  sessionExpiredMessage?: string
  /** Si se provee, muestra el botón "Iniciar sesión con Microsoft" */
  onMicrosoftLogin?: () => void
  onLogin: (email: string, password: string) => Promise<void>
  error?: string
  footerNote?: string
  emailPlaceholder?: string
  passwordPlaceholder?: string
  submitLabel?: string
}

export default function LoginWithEmail({
  logo,
  logoCaption,
  title = 'Bienvenido',
  subtitle = 'Inicia sesión para continuar',
  sessionExpiredMessage,
  onMicrosoftLogin,
  onLogin,
  error: externalError,
  footerNote,
  emailPlaceholder = 'usuario@empresa.com',
  passwordPlaceholder = '••••••••',
  submitLabel = 'Ingresar',
}: LoginWithEmailProps) {
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
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">

        <div className="flex flex-col items-center gap-3">
          {logo}
          {logoCaption && (
            <p className="text-sm text-muted-foreground text-center">{logoCaption}</p>
          )}
        </div>

        <div className="w-full rounded-2xl border border-border bg-card shadow-sm p-8 flex flex-col items-center gap-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {sessionExpiredMessage && (
            <div className="w-full rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
              {sessionExpiredMessage}
            </div>
          )}

          {onMicrosoftLogin && (
            <Button
              type="button"
              onClick={onMicrosoftLogin}
              className="w-full h-auto py-3 px-4 gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21 21"
                width="20"
                height="20"
                aria-hidden="true"
                className="shrink-0"
              >
                <rect x="1"  y="1"  width="9" height="9" fill="#f25022" />
                <rect x="11" y="1"  width="9" height="9" fill="#7fba00" />
                <rect x="1"  y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              Iniciar sesión con Microsoft
            </Button>
          )}

          {onMicrosoftLogin && (
            <div className="w-full flex items-center gap-3">
              <span className="flex-1 border-t border-border" />
              <span className="text-xs text-muted-foreground">o continúa con correo</span>
              <span className="flex-1 border-t border-border" />
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="lwe-email" className="text-sm font-medium text-foreground">
                Correo electrónico
              </label>
              <Input
                id="lwe-email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder={emailPlaceholder}
                required
                autoComplete="email"
                autoFocus={!onMicrosoftLogin}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="lwe-password" className="text-sm font-medium text-foreground">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="lwe-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder={passwordPlaceholder}
                  required
                  autoComplete="current-password"
                  className="pr-10 [&::-ms-reveal]:hidden"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v: boolean) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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

            {displayError && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {displayError}
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full h-auto py-3 px-4"
            >
              {loading ? 'Ingresando...' : submitLabel}
            </Button>
          </form>

          {footerNote && (
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              {footerNote}
            </p>
          )}
        </div>

      </div>
    </main>
  )
}
