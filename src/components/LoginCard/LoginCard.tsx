'use client'

import * as React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

// ── Context ───────────────────────────────────────────────────────────────────

interface LoginCardCtx {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  showPassword: boolean
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  internalError: string | null
  setInternalError: React.Dispatch<React.SetStateAction<string | null>>
  externalError?: string
  onSubmit?: (email: string, password: string) => Promise<void>
}

const LoginCardContext = React.createContext<LoginCardCtx | null>(null)

function useLoginCard(): LoginCardCtx {
  const ctx = React.useContext(LoginCardContext)
  if (!ctx) throw new Error('LoginCard subcomponents must be used inside <LoginCard>')
  return ctx
}

// ── Root ──────────────────────────────────────────────────────────────────────

export interface LoginCardProps {
  /** Elemento de logo renderizado sobre la tarjeta */
  logo: React.ReactNode
  /** Texto pequeño debajo del logo */
  logoCaption?: string
  /** Callback llamado al enviar el formulario de email/contraseña */
  onSubmit?: (email: string, password: string) => Promise<void>
  /** Error externo (p. ej. desde el servidor) mostrado con LoginCard.Error */
  error?: string
  children: React.ReactNode
}

function LoginCardRoot({ logo, logoCaption, onSubmit, error: externalError, children }: LoginCardProps) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [internalError, setInternalError] = React.useState<string | null>(null)

  return (
    <LoginCardContext.Provider value={{
      email, setEmail,
      password, setPassword,
      showPassword, setShowPassword,
      loading, setLoading,
      internalError, setInternalError,
      externalError,
      onSubmit,
    }}>
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm flex flex-col items-center gap-8">

          <div className="flex flex-col items-center gap-3">
            {logo}
            {logoCaption && (
              <p className="text-sm text-muted-foreground text-center">{logoCaption}</p>
            )}
          </div>

          <div className="w-full rounded-2xl border border-border bg-card shadow-sm p-8 flex flex-col items-center gap-6">
            {children}
          </div>

        </div>
      </main>
    </LoginCardContext.Provider>
  )
}

// ── Header (agrupa Title + Subtitle) ──────────────────────────────────────────

function LoginCardHeader({ children }: { children: React.ReactNode }) {
  return <div className="text-center w-full">{children}</div>
}

function LoginCardTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-xl font-semibold text-foreground">{children}</h1>
}

function LoginCardSubtitle({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm text-muted-foreground">{children}</p>
}

// ── Banners ───────────────────────────────────────────────────────────────────

function LoginCardSessionExpired({ message }: { message?: string }) {
  if (!message) return null
  return (
    <div className="w-full rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
      {message}
    </div>
  )
}

function LoginCardError() {
  const { internalError, externalError } = useLoginCard()
  const error = externalError ?? internalError
  if (!error) return null
  return (
    <div className="w-full rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
      {error}
    </div>
  )
}

// ── Microsoft button ──────────────────────────────────────────────────────────

interface LoginCardMicrosoftButtonProps {
  onClick: () => void
  children?: React.ReactNode
}

function LoginCardMicrosoftButton({
  onClick,
  children = 'Iniciar sesión con Microsoft',
}: LoginCardMicrosoftButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
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
      {children}
    </Button>
  )
}

// ── Divider ───────────────────────────────────────────────────────────────────

function LoginCardDivider({ label = 'o continúa con correo' }: { label?: string }) {
  return (
    <div className="w-full flex items-center gap-3">
      <span className="flex-1 border-t border-border" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="flex-1 border-t border-border" />
    </div>
  )
}

// ── Form (envuelve los campos en un <form>) ───────────────────────────────────

function LoginCardForm({ children }: { children: React.ReactNode }) {
  const { email, password, onSubmit, setLoading, setInternalError } = useLoginCard()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!onSubmit) return
    setLoading(true)
    setInternalError(null)
    try {
      await onSubmit(email, password)
    } catch (err) {
      setInternalError(err instanceof Error ? err.message : 'Credenciales incorrectas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {children}
    </form>
  )
}

// ── Email ─────────────────────────────────────────────────────────────────────

interface LoginCardEmailProps {
  placeholder?: string
  label?: string
  autoFocus?: boolean
}

function LoginCardEmail({
  placeholder = 'usuario@empresa.com',
  label = 'Correo electrónico',
  autoFocus,
}: LoginCardEmailProps) {
  const { email, setEmail } = useLoginCard()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="lc-email" className="text-sm font-medium text-foreground">
        {label}
      </label>
      <Input
        id="lc-email"
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        autoComplete="email"
        autoFocus={autoFocus}
      />
    </div>
  )
}

// ── Password ──────────────────────────────────────────────────────────────────

interface LoginCardPasswordProps {
  placeholder?: string
  label?: string
}

function LoginCardPassword({
  placeholder = '••••••••',
  label = 'Contraseña',
}: LoginCardPasswordProps) {
  const { password, setPassword, showPassword, setShowPassword } = useLoginCard()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="lc-password" className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <Input
          id="lc-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder={placeholder}
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
  )
}

// ── Submit ────────────────────────────────────────────────────────────────────

interface LoginCardSubmitProps {
  children?: React.ReactNode
  loadingLabel?: string
}

function LoginCardSubmit({
  children = 'Ingresar',
  loadingLabel = 'Ingresando...',
}: LoginCardSubmitProps) {
  const { loading } = useLoginCard()
  return (
    <Button
      type="submit"
      loading={loading}
      className="w-full h-auto py-3 px-4"
    >
      {loading ? loadingLabel : children}
    </Button>
  )
}

// ── Footer note ───────────────────────────────────────────────────────────────

function LoginCardFooterNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-muted-foreground text-center leading-relaxed w-full">
      {children}
    </p>
  )
}

// ── Compound export ───────────────────────────────────────────────────────────

export const LoginCard = Object.assign(LoginCardRoot, {
  Header:          LoginCardHeader,
  Title:           LoginCardTitle,
  Subtitle:        LoginCardSubtitle,
  SessionExpired:  LoginCardSessionExpired,
  Error:           LoginCardError,
  MicrosoftButton: LoginCardMicrosoftButton,
  Divider:         LoginCardDivider,
  Form:            LoginCardForm,
  Email:           LoginCardEmail,
  Password:        LoginCardPassword,
  Submit:          LoginCardSubmit,
  FooterNote:      LoginCardFooterNote,
})
