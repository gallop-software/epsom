import 'server-only'
import {
  renderSignInCodeEmailHtml,
  renderSignInLinkEmailHtml,
} from '@/utils/email-template'
import { sendEmail } from '@/utils/send-email'
import { siteUrl } from '@/utils/server-env'

// The sign-in emails: a six-digit code, or a link that signs in when opened.
// Both stop working after AUTH_EMAIL_MINUTES. Sent from src/utils/auth.ts.

export const AUTH_EMAIL_MINUTES = 10

async function message(sign: { code: string } | { url: string }) {
  const site = await siteUrl()
  if ('code' in sign) {
    return {
      subject: `${sign.code} is your Bedrock Flooring sign-in code`,
      bodyHtml: renderSignInCodeEmailHtml(sign.code, AUTH_EMAIL_MINUTES, site),
      text: `Your Bedrock Flooring sign-in code is ${sign.code}. It works for ${AUTH_EMAIL_MINUTES} minutes. If you did not ask for it, you can ignore this email.`,
    }
  }
  return {
    subject: 'Sign in to Bedrock Flooring',
    bodyHtml: renderSignInLinkEmailHtml(sign.url, AUTH_EMAIL_MINUTES, site),
    text: `Sign in to Bedrock Flooring: ${sign.url}\n\nIt works for ${AUTH_EMAIL_MINUTES} minutes. If you did not ask for it, you can ignore this email.`,
  }
}

/** Sends a sign-in code or link. True when Cloudflare accepted it. */
export async function sendSignInEmail(
  to: string,
  sign: { code: string } | { url: string }
): Promise<boolean> {
  // Saves opening the inbox while working on the site
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `[auth] sign-in ${'code' in sign ? `code ${sign.code}` : `link ${sign.url}`} for ${to}`
    )
  }
  try {
    await sendEmail({ to, ...(await message(sign)), required: true })
    return true
  } catch {
    return false
  }
}
