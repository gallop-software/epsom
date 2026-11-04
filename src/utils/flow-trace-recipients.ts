import { isAllowedEmail } from '@/utils/auth-allowlist'

/**
 * Who FlowTrace may email: everyone on AUTH_ALLOWED_EMAILS who has signed in at
 * least once. Their choice of emails is in ft_email_settings, keyed by address.
 */
export async function adminEmails(db: D1Database): Promise<string[]> {
  const { results } = await db
    .prepare(`SELECT lower("email") AS email FROM "user" ORDER BY email`)
    .all<{ email: string }>()
  return results.map((row) => row.email).filter(isAllowedEmail)
}
