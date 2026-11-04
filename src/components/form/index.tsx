'use client'

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import React, { Children, isValidElement, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { trackConversion } from '@/hooks/flow-trace'

// Sub-components
import { FormInput } from './form-input'
import { FormName } from './form-name'
import { FormSelect } from './form-select'
import { FormTextArea } from './form-textarea'
import { FormUpload } from './form-upload'
import { FormButton, type FormButtonProps } from './form-button'

// ============================================================================
// Main Form Component
// ============================================================================

type FormProps = {
  classname?: string
  children: React.ReactNode
  gap?: string
  flexDirection?: string
  /** `dark`: fields for a dark section (white borders, white required marks). */
  tone?: 'light' | 'dark'
}

// Hidden from people; bots fill it and api/submit-form drops the message.
const HONEYPOT_FIELD = 'companyWebsite'

// Invisible Cloudflare Turnstile; off without a site key (local development).
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
const TURNSTILE_FIELD = 'cf-turnstile-response'

/** Runs the invisible challenge and resolves with its token, or null after 10 seconds. */
function challenge(
  widget: TurnstileInstance | null,
  token: React.RefObject<string>
): Promise<string | null> {
  token.current = ''
  widget?.execute()
  return new Promise((resolve) => {
    let waited = 0
    const check = () => {
      if (token.current) return resolve(token.current)
      if ((waited += 100) >= 10000) return resolve(null)
      setTimeout(check, 100)
    }
    check()
  })
}

function Form({
  classname,
  children,
  gap = 'gap-0',
  flexDirection = 'flex-col',
  tone = 'light',
}: FormProps) {
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const turnstile = useRef<TurnstileInstance | null>(null)
  const turnstileToken = useRef('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    const obj: Record<string, any> = {}

    let submitMessage = ''

    const submitter = (e.nativeEvent as SubmitEvent)?.submitter as
      HTMLButtonElement | HTMLInputElement | null

    const buttonMessage = submitter?.getAttribute?.('data-message') || null
    if (buttonMessage) submitMessage = buttonMessage

    const getFieldLabel = (domName: string) => {
      const el = form.querySelector<HTMLElement>(
        `[name="${CSS.escape(domName)}"]`
      )
      return el?.getAttribute('data-label') || null
    }

    const fileToBase64 = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
      })

    for (const [k, v] of fd) {
      const isArray = k.endsWith('[]')
      const key = isArray ? k.slice(0, -2) : k
      const val = v instanceof File ? v : String(v)
      const label = getFieldLabel(k)

      if (key === 'files') {
        if (!obj[key]) obj[key] = []
        if (val instanceof File && val.name) {
          obj[key].push({
            name: val.name,
            type: val.type,
            size: val.size,
            base64: await fileToBase64(val),
            label,
          })
        }
        continue
      }

      if (isArray) {
        if (!obj[key]) obj[key] = { value: [], label }
        if (!Array.isArray(obj[key].value)) obj[key].value = []
        obj[key].value.push(val)
        continue
      }

      obj[key] = { value: val, label }
    }

    if (TURNSTILE_SITE_KEY) {
      const token = await challenge(turnstile.current, turnstileToken)
      if (!token) {
        setIsLoading(false)
        setStatus('Verification failed. Please try again.')
        return
      }
      obj[TURNSTILE_FIELD] = { value: token, label: null }
    }

    const api = '/api/submit-form/'
    const response = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })

    turnstile.current?.reset()

    if (response.ok) {
      // Tracking never stands between the visitor and the sent message
      try {
        trackConversion(
          'form',
          typeof obj.emailSubject?.value === 'string'
            ? obj.emailSubject.value
            : 'Form'
        )
      } catch {}
      form.reset()
      form.dispatchEvent(new Event('form-cleared', { bubbles: true }))
    } else {
      const data = (await response.json().catch(() => ({}))) as {
        message?: string
      }
      submitMessage = data.message || 'An error occurred.'
    }

    setIsLoading(false)
    setStatus(submitMessage)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        data-tone={tone}
        className={clsx('group/form flex', flexDirection, gap, classname)}
      >
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        {TURNSTILE_SITE_KEY && (
          // Out of flow: the invisible widget's empty container would otherwise take up space.
          <Turnstile
            className="absolute"
            ref={turnstile}
            siteKey={TURNSTILE_SITE_KEY}
            options={{ size: 'invisible', execution: 'execute' }}
            onSuccess={(token) => {
              turnstileToken.current = token
            }}
          />
        )}
        {Children.map(children, (child) => {
          if (
            isValidElement(child) &&
            (child.props as { name?: string })?.name === 'submit'
          ) {
            const btn = child as React.ReactElement<FormButtonProps>
            return React.cloneElement<FormButtonProps>(btn, { isLoading })
          }
          return child
        })}
      </form>
      {status && (
        <p className="mt-4 text-center text-sm font-medium">{status}</p>
      )}
    </>
  )
}

// Attach sub-components for compound component pattern
Form.Input = FormInput
Form.Select = FormSelect
Form.TextArea = FormTextArea
Form.File = FormUpload
Form.FormButton = FormButton
Form.FormName = FormName

// ============================================================================
// Exports
// ============================================================================

export {
  Form,
  FormInput,
  FormSelect,
  FormTextArea,
  FormUpload,
  FormButton,
  FormName,
}
