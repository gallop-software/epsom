import { getCloudflareContext } from '@opennextjs/cloudflare'
import { serverEnv } from '@/utils/server-env'

// Site mail goes out through one of two providers, chosen by configuration:
//
//   Cloudflare Email Service  EMAIL_DOMAIN is set and the Worker has the EMAIL
//                             binding (send_email in wrangler.jsonc)
//   Mailgun                   otherwise, when MAILGUN_API_KEY is set (Vercel)

type EmailAddress = string | { email: string; name?: string }

export interface EmailAttachment {
  /** Base64, without the data: prefix */
  content: string
  filename: string
  type: string
}

interface SendEmailOptions {
  subject: string
  html: string
  replyTo?: { email: string; name?: string }
  attachments?: EmailAttachment[]
  /** Send to the developer only, never to the site owner */
  devOnly?: boolean
}

interface SendConfirmationOptions {
  /** The visitor who filled in the form */
  to: string
  subject: string
  html: string
  /** Send to the developer instead of the visitor */
  devOnly?: boolean
}

// Cloudflare Email Service binding
interface EmailBinding {
  send(message: {
    to: EmailAddress | EmailAddress[]
    from: EmailAddress
    subject: string
    html?: string
    text?: string
    cc?: EmailAddress | EmailAddress[]
    bcc?: EmailAddress | EmailAddress[]
    replyTo?: EmailAddress
    attachments?: (EmailAttachment & {
      disposition: 'attachment' | 'inline'
    })[]
  }): Promise<{ messageId: string }>
}

function getEmailBinding(): EmailBinding | undefined {
  if (!process.env.EMAIL_DOMAIN) return undefined
  try {
    const { env } = getCloudflareContext()
    return (env as unknown as { EMAIL?: EmailBinding }).EMAIL
  } catch {
    // Not running on Cloudflare
    return undefined
  }
}

async function sendWithCloudflare(
  mailer: EmailBinding,
  { subject, html, replyTo, attachments = [], devOnly }: SendEmailOptions
) {
  const fromName = process.env.EMAIL_FROM_NAME || 'Website'
  const devAddress: EmailAddress = {
    email: String(process.env.EMAIL_DEV_TO),
    name: process.env.EMAIL_DEV_NAME || 'Developer',
  }

  const result = await mailer.send({
    from: { email: `contact@${process.env.EMAIL_DOMAIN}`, name: fromName },
    to: devOnly
      ? devAddress
      : { email: String(process.env.EMAIL_TO), name: fromName },
    // The developer is copied openly, so the client can see who else has it
    ...(!devOnly && { cc: devAddress }),
    ...(replyTo && { replyTo }),
    subject,
    html,
    ...(attachments.length && {
      attachments: attachments.map((file) => ({
        ...file,
        disposition: 'attachment' as const,
      })),
    }),
  })
  return Boolean(result.messageId)
}

async function sendWithMailgun({
  subject,
  html,
  replyTo,
  attachments = [],
  devOnly,
}: SendEmailOptions) {
  const fromName = process.env.MAILGUN_FROM_NAME
  const devAddress = `${process.env.MAILGUN_DEV_NAME} <${process.env.MAILGUN_DEV_MAIL}>`

  const body = new FormData()
  body.append(
    'from',
    `${fromName} <contact@${process.env.MAILGUN_DOMAIN_NAME}>`
  )
  body.append(
    'to',
    devOnly ? devAddress : `${fromName} <${process.env.MAILGUN_SMTP_MAIL}>`
  )
  // MAILGUN_BCC_MAIL takes the developer's place as a blind copy
  if (!devOnly && process.env.MAILGUN_BCC_MAIL) {
    body.append('bcc', process.env.MAILGUN_BCC_MAIL)
  } else if (!devOnly) {
    body.append('cc', devAddress)
  }
  if (replyTo) {
    body.append(
      'h:Reply-To',
      replyTo.name ? `${replyTo.name} <${replyTo.email}>` : replyTo.email
    )
  }
  body.append('subject', subject)
  body.append('html', html)
  for (const file of attachments) {
    const buffer = Buffer.from(file.content, 'base64')
    body.append(
      'attachment',
      new File([buffer], file.filename, { type: file.type })
    )
  }

  return postToMailgun(body)
}

async function postToMailgun(body: FormData) {
  const resp = await fetch(
    `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN_NAME}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')}`,
      },
      body,
    }
  )

  const text = await resp.text()
  try {
    return text !== 'Forbidden' && Boolean(JSON.parse(text).id)
  } catch {
    throw new Error(`Mailgun answered ${resp.status}: ${text.slice(0, 200)}`)
  }
}

/**
 * Sends the visitor a confirmation of their submission, from the site, with
 * replies going to the owner.
 *
 * @returns Whether the provider accepted the message
 */
export async function sendConfirmation({
  to,
  subject,
  html,
  devOnly,
}: SendConfirmationOptions): Promise<boolean> {
  try {
    const mailer = getEmailBinding()
    if (mailer) {
      const name = process.env.EMAIL_FROM_NAME || 'Website'
      const result = await mailer.send({
        from: { email: `contact@${process.env.EMAIL_DOMAIN}`, name },
        to: devOnly ? String(process.env.EMAIL_DEV_TO) : to,
        replyTo: { email: String(process.env.EMAIL_TO), name },
        subject,
        html,
      })
      return Boolean(result.messageId)
    }
    if (!process.env.MAILGUN_API_KEY) {
      throw new Error('Confirmations need EMAIL_DOMAIN or MAILGUN_API_KEY')
    }
    const fromName = process.env.MAILGUN_FROM_NAME
    const body = new FormData()
    body.append(
      'from',
      `${fromName} <contact@${process.env.MAILGUN_DOMAIN_NAME}>`
    )
    body.append(
      'to',
      devOnly
        ? `${process.env.MAILGUN_DEV_NAME} <${process.env.MAILGUN_DEV_MAIL}>`
        : to
    )
    body.append('h:Reply-To', `${fromName} <${process.env.MAILGUN_SMTP_MAIL}>`)
    body.append('subject', subject)
    body.append('html', html)
    return await postToMailgun(body)
  } catch (error) {
    const { code, message } = error as { code?: string; message?: string }
    console.error('send-email: confirmation not sent', code, message)
    return false
  }
}

/**
 * Sends a site email to the owner, with a copy to the developer (or a blind
 * copy to MAILGUN_BCC_MAIL). The submitter is not copied; forms that confirm
 * to the visitor use `sendConfirmation`, behind Turnstile.
 *
 * @returns Whether the provider accepted the message
 */
export async function sendFormEmail(
  options: SendEmailOptions
): Promise<boolean> {
  try {
    const mailer = getEmailBinding()
    if (mailer) return await sendWithCloudflare(mailer, options)
    if (process.env.MAILGUN_API_KEY) return await sendWithMailgun(options)
    throw new Error(
      'No mail provider is configured: set EMAIL_DOMAIN (Cloudflare) or MAILGUN_API_KEY'
    )
  } catch (error) {
    const { code, message } = error as { code?: string; message?: string }
    console.error('send-email: email not sent', code, message)
    return false
  }
}

// --- Mail to exactly who it names: sign-in codes and FlowTrace reports ---

export type Address = string | { name?: string; email: string }

type NamedMailer = {
  send(message: {
    from: Address
    to: Address
    replyTo?: Address
    subject: string
    html: string
    text: string
  }): Promise<{ messageId: string }>
}

/** The bare address of an `Address`, lowercased. */
export function emailOf(address: Address): string {
  return (typeof address === 'string' ? address : address.email)
    .trim()
    .toLowerCase()
}

function mailgunAddress(address: Address): string {
  return typeof address === 'string' || !address.name
    ? emailOf(address)
    : `${address.name} <${address.email}>`
}

/**
 * Sends an email to who it names, with no copies, through whichever provider
 * form mail uses: Cloudflare when EMAIL_DOMAIN is set, Mailgun otherwise.
 * `bodyHtml` is the whole document, from a renderer in `email-template.ts`.
 *
 * Under `next dev` nothing is sent: the subject goes to the dev server log, and
 * a sign-in code's subject has the code in it.
 *
 * **By default a failure is swallowed** and resolves to an empty id. Pass
 * `required: true` when the email is the thing, as with a sign-in code, and a
 * failure throws so the caller can say so.
 */
export async function sendEmail({
  to,
  replyTo,
  subject,
  bodyHtml,
  text,
  required = false,
}: {
  to: Address
  /** Defaults to the site's own inbox. */
  replyTo?: Address
  subject: string
  bodyHtml: string
  text: string
  /** Throw instead of failing quietly. See above. */
  required?: boolean
}): Promise<{ messageId: string }> {
  if (process.env.NODE_ENV === 'development') {
    console.info(
      `[email, not delivered in development] to ${emailOf(to)}: ${subject}`
    )
    return { messageId: 'development' }
  }

  try {
    const domain = await serverEnv('EMAIL_DOMAIN')
    if (domain) {
      const { env } = await getCloudflareContext({ async: true })
      const mailer = (env as unknown as { EMAIL?: NamedMailer }).EMAIL
      if (!mailer) throw new Error('The EMAIL binding is missing')
      const replies = replyTo ?? (await serverEnv('EMAIL_TO'))
      const { messageId } = await mailer.send({
        from: {
          email: `contact@${domain}`,
          name: (await serverEnv('EMAIL_FROM_NAME')) || 'Website',
        },
        to,
        subject,
        html: bodyHtml,
        text,
        ...(replies ? { replyTo: replies } : {}),
      })
      // An answer with no id is not a send, and would otherwise pass for success
      if (!messageId) throw new Error('Cloudflare gave no message id')
      return { messageId }
    }

    if (!(await serverEnv('MAILGUN_API_KEY'))) {
      throw new Error(
        'No mail provider is configured: set EMAIL_DOMAIN or MAILGUN_API_KEY'
      )
    }
    const fromName = process.env.MAILGUN_FROM_NAME
    const replies = replyTo ?? process.env.MAILGUN_SMTP_MAIL
    const body = new FormData()
    body.append(
      'from',
      `${fromName} <contact@${process.env.MAILGUN_DOMAIN_NAME}>`
    )
    body.append('to', mailgunAddress(to))
    if (replies) body.append('h:Reply-To', mailgunAddress(replies))
    body.append('subject', subject)
    body.append('html', bodyHtml)
    body.append('text', text)
    if (!(await postToMailgun(body))) {
      throw new Error('Mailgun did not accept the message')
    }
    return { messageId: 'mailgun' }
  } catch (err) {
    const { code, message } = err as { code?: string; message?: string }
    console.error('Failed to send email:', code ?? '', message ?? err)
    if (required) throw err
    return { messageId: '' }
  }
}
