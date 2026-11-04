'use client'

import { useRef, useState, type FormEvent } from 'react'
import { clsx } from 'clsx'
import { Icon } from '@/components/icon'
import mailIcon from '@iconify/icons-lucide/mail'
import linkIcon from '@iconify/icons-lucide/link'
import { Paragraph } from '@/components/paragraph'
import { inputBaseStyles } from '@/components/form/utils'
import { authClient } from '@/utils/auth-client'

type Step =
  | { name: 'email' }
  | { name: 'code'; email: string }
  | { name: 'link'; email: string }

// A sign-in link that failed comes back to the site with ?login&error=
const LINK_ERRORS: Record<string, string> = {
  INVALID_TOKEN: 'That sign-in link has expired or was already used.',
  EXPIRED_TOKEN: 'That sign-in link has expired.',
}

/**
 * Sign-in by email: a six-digit code typed here, or a link opened from the
 * inbox. Codes and links are only sent to the allowed addresses, but the form
 * answers every address the same way. Shown in the sign-in modal
 * (src/components/login-dialog.tsx), which `onSignedIn` tells.
 */
// The form's own buttons: the site's Button is a link, and these act.
function ActionButton({
  variant = 'primary',
  icon,
  type = 'button',
  className,
  children,
  ...rest
}: {
  variant?: 'primary' | 'secondary'
  icon?: { body: string; width?: number; height?: number }
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-default disabled:opacity-50',
        variant === 'primary'
          ? 'bg-accent text-body-light hover:bg-accent-dark'
          : 'border border-body-dark bg-body-light text-contrast hover:bg-body',
        className
      )}
      {...rest}
    >
      {icon && (
        <Icon
          icon={icon}
          className="h-4 w-4"
        />
      )}
      {children}
    </button>
  )
}

export function LoginForm({
  onSignedIn,
  linkError = '',
  afterLink = '/?dashboard',
}: {
  onSignedIn: () => void
  // Why a sign-in link sent the visitor back, if it did
  linkError?: string
  // Where a sign-in link opens once it has signed them in
  afterLink?: string
}) {
  const [step, setStep] = useState<Step>({ name: 'email' })
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  // Which request is running, so only the button pressed says so
  const [pending, setPending] = useState<'code' | 'link' | 'verify' | null>(
    null
  )
  const busy = pending !== null
  const [error, setError] = useState<string | null>(
    linkError
      ? (LINK_ERRORS[linkError] ?? 'That sign-in link did not work.')
      : null
  )
  const [notice, setNotice] = useState<string | null>(null)
  const codeInput = useRef<HTMLInputElement>(null)

  async function sendCode(to: string) {
    setPending('code')
    setError(null)
    setNotice(null)
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: to,
      type: 'sign-in',
    })
    setPending(null)
    if (error) return setError(error.message ?? 'The code could not be sent.')
    setCode('')
    setStep({ name: 'code', email: to })
    requestAnimationFrame(() => codeInput.current?.focus())
  }

  async function sendLink(to: string) {
    setPending('link')
    setError(null)
    setNotice(null)
    const { error } = await authClient.signIn.magicLink({
      email: to,
      callbackURL: afterLink,
      errorCallbackURL: '/?login',
    })
    setPending(null)
    if (error) return setError(error.message ?? 'The link could not be sent.')
    setStep({ name: 'link', email: to })
  }

  async function verify(to: string, otp: string) {
    setPending('verify')
    setError(null)
    const { error } = await authClient.signIn.emailOtp({ email: to, otp })
    if (error) {
      setPending(null)
      setCode('')
      codeInput.current?.focus()
      return setError(
        error.status === 429
          ? 'Too many tries. Wait a minute, then try again.'
          : error.code === 'TOO_MANY_ATTEMPTS'
            ? 'Too many wrong codes. Send a new one.'
            : 'That code is wrong or has expired.'
      )
    }
    setPending(null)
    onSignedIn()
  }

  function onEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const to = email.trim()
    if (to) sendCode(to)
  }

  // Only the digits count, so a code pasted as it reads in the email
  // ("796 034") works. No maxLength on the box: the browser would cut the
  // paste to "796 03" before this saw it.
  function onCodeChange(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 6)
    setCode(digits)
    if (digits.length === 6 && step.name === 'code' && !busy) {
      verify(step.email, digits)
    }
  }

  const status = (
    <>
      {error && (
        <Paragraph
          role="alert"
          fontSize="text-base"
          margin="mt-4 mb-0"
          color="text-accent"
        >
          {error}
        </Paragraph>
      )}
      {notice && (
        <Paragraph
          role="status"
          fontSize="text-base"
          margin="mt-4 mb-0"
          color="text-contrast-light"
        >
          {notice}
        </Paragraph>
      )}
    </>
  )

  const startOver = (
    <button
      type="button"
      className="text-sm font-medium text-contrast-light underline hover:text-contrast cursor-pointer"
      onClick={() => {
        setStep({ name: 'email' })
        setError(null)
        setNotice(null)
      }}
    >
      Use a different email
    </button>
  )

  if (step.name === 'code') {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (code.length === 6) verify(step.email, code)
        }}
      >
        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
        >
          If <strong className="text-contrast">{step.email}</strong> can sign
          in, a six-digit code is on its way. Type it here.
        </Paragraph>
        <label
          htmlFor="login-code"
          className="sr-only"
        >
          Sign-in code
        </label>
        <input
          ref={codeInput}
          id="login-code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]{6}"
          required
          value={code}
          disabled={busy}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="000000"
          className={clsx(
            inputBaseStyles,
            'text-center text-3xl tracking-[0.5em] tabular-nums'
          )}
        />
        <ActionButton
          type="submit"
          disabled={busy || code.length !== 6}
          className="mt-6 w-full"
        >
          {pending === 'verify' ? 'Checking…' : 'Sign in'}
        </ActionButton>
        {status}
        <div className="mt-6 flex flex-wrap justify-between gap-4">
          {startOver}
          <button
            type="button"
            disabled={busy}
            className="text-sm font-medium text-contrast-light underline hover:text-contrast cursor-pointer disabled:opacity-40"
            onClick={async () => {
              await sendCode(step.email)
              setNotice('A new code is on its way.')
            }}
          >
            {pending === 'code' ? 'Sending…' : 'Send a new code'}
          </button>
        </div>
      </form>
    )
  }

  if (step.name === 'link') {
    return (
      <div>
        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
        >
          If <strong className="text-contrast">{step.email}</strong> can sign
          in, a sign-in link is on its way. Open it on this device to sign in.
        </Paragraph>
        <ActionButton
          variant="secondary"
          icon={mailIcon}
          disabled={busy}
          className="w-full"
          onClick={() => sendCode(step.email)}
        >
          {pending === 'code' ? 'Sending…' : 'Send a code instead'}
        </ActionButton>
        {status}
        <div className="mt-6">{startOver}</div>
      </div>
    )
  }

  return (
    <form onSubmit={onEmailSubmit}>
      <label
        htmlFor="login-email"
        className="mb-2 block text-base font-medium text-contrast"
      >
        Email address
      </label>
      <input
        id="login-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        disabled={busy}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className={inputBaseStyles}
      />
      <ActionButton
        type="submit"
        icon={mailIcon}
        disabled={busy}
        className="mt-6 w-full"
      >
        {pending === 'code' ? 'Sending…' : 'Email me a code'}
      </ActionButton>
      <ActionButton
        variant="secondary"
        icon={linkIcon}
        disabled={busy}
        className="mt-3 w-full"
        onClick={() => {
          const to = email.trim()
          if (to) sendLink(to)
          else setError('Enter your email address first.')
        }}
      >
        {pending === 'link' ? 'Sending…' : 'Email me a sign-in link'}
      </ActionButton>
      {status}
    </form>
  )
}
