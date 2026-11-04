import {
  sendConfirmation,
  sendFormEmail,
  type EmailAttachment,
} from '@/utils/send-email'
import { studioUrl } from '@/utils/studio-helpers'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Fields the form posts that are not part of the message
const TURNSTILE_FIELD = 'cf-turnstile-response'
const HONEYPOT_FIELD = 'companyWebsite'
const HIDDEN_FIELDS = ['emailSubject', TURNSTILE_FIELD, HONEYPOT_FIELD]

// Forms whose visitor gets a confirmation email
const CONFIRMED_FORMS = new Set(['Contact Form'])

const MAX_FIELDS = 30
const MAX_VALUE_LENGTH = 5000
const MAX_FILES = 5
const MAX_FILES_BYTES = 4 * 1024 * 1024

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderValueCell(v: unknown): string {
  if (v == null) return ''
  if (typeof v === 'string') {
    const trimmed = v.trim()
    const esc = escapeHtml(trimmed).replace(/\r?\n/g, '<br>')
    return esc
  }
  if (Array.isArray(v)) {
    return v
      .map((x) =>
        typeof x === 'string' ? escapeHtml(x) : escapeHtml(JSON.stringify(x))
      )
      .join(', ')
  }
  return escapeHtml(JSON.stringify(v))
}

// Email clients need an absolute URL; locally served images resolve to a path
function emailImageUrl(src: string): string {
  const url = studioUrl(src)
  if (url.startsWith('/')) {
    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${url}`
  }
  return url
}

function renderEmailHtml(payload: Record<string, any>, intro = '') {
  const rows: string[] = []

  for (const [key, val] of Object.entries(payload)) {
    // files
    if (key === 'files') {
      if (Array.isArray(val) && val.length) {
        const fileNames = val
          .map((f) => escapeHtml(f?.name || 'attachment'))
          .join(', ')
        const label = escapeHtml(val[0]?.label ?? key)
        rows.push(
          `<p class="row"><strong class="key">${label}:</strong><span class="val">${fileNames}</span></p>`
        )
      }
      continue
    }

    const label =
      typeof val === 'object' && val
        ? escapeHtml((val as any).label ?? key)
        : escapeHtml(key)

    const value =
      typeof val === 'object' && val && (val as any).value !== undefined
        ? renderValueCell((val as any).value)
        : renderValueCell(val)

    rows.push(
      `<p class="row"><strong class="key">${label}:</strong><span class="val">${value}</span></p>`
    )
  }

  return `<!doctype html>
    <html>
    <head>
    <meta charset="utf-8" />
    <style>
      body{background:#f7f7f7;font-family:Arial, sans-serif;margin:0;padding:20px}
      .container{max-width:100%;margin:auto;background:#f7f7f7;padding:75px 15px;}
      .content{width: 550px;margin:0 auto;}
      .logo{display:block;margin:0 auto 20px;max-width:200px; padding-bottom: 20px;}
      .row{margin:0 0 20px 0;line-height:1.45;font-size: 1.2rem;}
      .key{font-weight:700;margin-right:.35rem;display:inline-block}
      .val{display:inline}
    </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <img class="logo" src="${emailImageUrl('/brand/logo-navy.png')}" alt="Bedrock Flooring" />
          ${intro}
          ${rows.join('')}
        </div>
      </div>
    </body>
    </html>`
}

function fieldValue(payload: Record<string, any>, key: string): string {
  const value = payload[key]?.value
  return typeof value === 'string' ? value.trim() : ''
}

function reject(message: string, status = 400) {
  return NextResponse.json({ message }, { status })
}

/** Returns a message for the visitor when the submission is not acceptable. */
function validate(payload: Record<string, any>): string | null {
  const keys = Object.keys(payload)
  if (!keys.length || keys.length > MAX_FIELDS) return 'Invalid submission.'

  for (const [key, val] of Object.entries(payload)) {
    if (key === 'files') continue
    const value = val?.value
    const text = Array.isArray(value) ? value.join(', ') : value
    if (typeof text !== 'string' || text.length > MAX_VALUE_LENGTH) {
      return 'Invalid submission.'
    }
  }

  const email = fieldValue(payload, 'email')
  const phone = fieldValue(payload, 'phone')

  if (!email && !phone) {
    return 'Add a phone number or an email address so we can get back to you.'
  }
  // Also keeps line breaks out of the Reply-To header
  if (email && !/^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/.test(email)) {
    return 'Please enter a valid email address.'
  }
  return null
}

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
  if (!secret) {
    // No widget configured (local development); the honeypot still applies
    return true
  }
  if (!token) return false

  const body = new URLSearchParams({ secret, response: token })
  if (ip) body.set('remoteip', ip)

  const resp = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    { method: 'POST', body }
  )
  const result = (await resp.json().catch(() => ({}))) as { success?: boolean }
  return result.success === true
}

export async function POST(req: Request) {
  const payload = (await req.json().catch(() => ({}))) as Record<string, any>

  // Bots fill the hidden field. Answer as if it worked and send nothing.
  if (fieldValue(payload, HONEYPOT_FIELD)) {
    return NextResponse.json({ message: 'Message sent. Thank you.' })
  }

  const invalid = validate(payload)
  if (invalid) return reject(invalid)

  const verified = await verifyTurnstile(
    fieldValue(payload, TURNSTILE_FIELD),
    // Cloudflare's header, then the one Vercel sets
    req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      null
  )
  if (!verified) {
    return reject('Verification failed. Please reload the page and try again.')
  }

  const emailSubjectValue =
    fieldValue(payload, 'emailSubject') || 'Form Submission'
  const displayPayload = { ...payload }
  for (const key of HIDDEN_FIELDS) delete displayPayload[key]

  const html = renderEmailHtml(displayPayload)

  const isDevelopment = process.env.NODE_ENV === 'development'
  const productionUrlClean = process.env.NEXT_PUBLIC_PRODUCTION_URL?.replace(
    /^https?:\/\//,
    ''
  )

  const first = fieldValue(payload, 'firstName') || fieldValue(payload, 'name')
  const last = fieldValue(payload, 'lastName')
  const email = fieldValue(payload, 'email')
  // The name goes into the subject and Reply-To headers
  const displayName = [first, last]
    .filter(Boolean)
    .join(' ')
    .replace(/[\r\n"<>]/g, ' ')
    .slice(0, 100)

  const subject = displayName
    ? `${displayName}: ${emailSubjectValue} ${productionUrlClean}`
    : `${emailSubjectValue} ${productionUrlClean}`

  // Attach files from base64 (client already encodes)
  const files = Array.isArray(payload.files) ? payload.files : []
  if (files.length > MAX_FILES) return reject('Too many attachments.')
  const attachments: EmailAttachment[] = files.map((file: any) => ({
    content: String(file.base64).split(',')[1] || '',
    filename: String(file.name || 'attachment'),
    type: String(file.type || 'application/octet-stream'),
  }))
  const attachmentBytes = attachments.reduce(
    (total, file) => total + file.content.length * 0.75,
    0
  )
  if (attachmentBytes > MAX_FILES_BYTES) {
    return reject('Attachments are too large.')
  }

  const ok = await sendFormEmail({
    subject,
    html,
    ...(email && {
      replyTo: { email, ...(displayName && { name: displayName }) },
    }),
    attachments,
    devOnly: isDevelopment,
  })

  if (ok && email && CONFIRMED_FORMS.has(emailSubjectValue)) {
    const greeting = escapeHtml(first || displayName)
    await sendConfirmation({
      to: email,
      subject: `${process.env.EMAIL_FROM_NAME || process.env.MAILGUN_FROM_NAME} Contact Confirmation${displayName ? `: ${displayName}` : ''}`,
      html: renderEmailHtml(
        displayPayload,
        `<p class="row">Hi${greeting ? ` ${greeting}` : ''},</p><p class="row">Thanks for getting in touch. We have your message, and someone from our team will reply soon.</p>`
      ),
      devOnly: isDevelopment,
    })
  }

  return NextResponse.json(
    { message: ok ? 'Message sent. Thank you.' : 'An error occurred.' },
    { status: ok ? 200 : 500 }
  )
}
