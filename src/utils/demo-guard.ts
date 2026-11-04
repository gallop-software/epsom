import 'server-only'
import { DateTime } from 'luxon'
import { serverEnv } from '@/utils/server-env'
import { siteEnv } from '@/utils/site-env'
import { hmacHex } from '@/utils/webcrypto'

// The limits on the toolbar demo's test report, as on Winx: each inbox gets one
// ever, one visitor gets a few a day, and everyone shares a few dozen a day.
// What is counted is a keyed hash, never an email or IP address. A limit is
// spent as it is checked, in one statement, so requests arriving together
// cannot all slip past it.

const DAY_SECONDS = 86400
const REPORT = 'flowtrace-test'

export const REPORTS_PER_VISITOR = 5
export const REPORTS_PER_DAY = 40

async function hash(purpose: string, value: string): Promise<string> {
  const secret = await serverEnv('BETTER_AUTH_SECRET')
  // Without it the hashes could be reversed by trying addresses: send nothing
  if (!secret) throw new Error('BETTER_AUTH_SECRET is not set')
  return (await hmacHex(secret, `demo-${purpose}:${value}`)).slice(0, 32)
}

/** One address block: an IPv6 visitor has a whole /64 to move around in. */
function ipBucket(ip: string): string {
  const value = ip.trim().toLowerCase()
  if (!value.includes(':')) return value || 'unknown'

  const mapped = value.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
  if (mapped?.[1]) return mapped[1]

  const [head = '', tail = ''] = value.split('::')
  const first = head ? head.split(':') : []
  const last = tail ? tail.split(':') : []
  const groups = value.includes('::')
    ? [
        ...first,
        ...Array<string>(Math.max(0, 8 - first.length - last.length)).fill('0'),
        ...last,
      ]
    : first
  const network = groups
    .slice(0, 4)
    .map((group) => group.replace(/^0+(?=.)/, ''))
    .join(':')
  return `${network}::/64`
}

export const hashVisitor = (ip: string) => hash('visitor', ipBucket(ip))
export const hashInbox = (inbox: string) => hash('inbox', inbox)

/** One more of `limit` in the last day under this key, or false if none left. */
export async function spend(key: string, limit: number): Promise<boolean> {
  const db = (await siteEnv()).AUTH_DB
  const now = Math.floor(DateTime.now().toSeconds())
  const results = await db.batch([
    db
      .prepare('DELETE FROM demo_attempts WHERE created_at < ?1')
      .bind(now - DAY_SECONDS),
    db
      .prepare(
        `INSERT INTO demo_attempts (kind, ip_hash, created_at)
         SELECT ?1, ?2, ?3
         WHERE (SELECT COUNT(*) FROM demo_attempts
                 WHERE kind = ?1 AND ip_hash = ?2 AND created_at > ?4) < ?5`
      )
      .bind(REPORT, key, now, now - DAY_SECONDS, limit),
  ])
  return results[1]?.meta?.changes === 1
}

/** Gives one back, when nothing was sent after all. */
export async function refund(key: string): Promise<void> {
  const db = (await siteEnv()).AUTH_DB
  await db
    .prepare(
      `DELETE FROM demo_attempts WHERE id = (
         SELECT id FROM demo_attempts WHERE kind = ?1 AND ip_hash = ?2
         ORDER BY id DESC LIMIT 1)`
    )
    .bind(REPORT, key)
    .run()
}

/** Notes that an inbox has had its report; false if it already had. */
export async function firstTime(inboxHash: string): Promise<boolean> {
  const db = (await siteEnv()).AUTH_DB
  const result = await db
    .prepare(
      'INSERT OR IGNORE INTO demo_sends (kind, address_hash, created_at) VALUES (?1, ?2, ?3)'
    )
    .bind(REPORT, inboxHash, Math.floor(DateTime.now().toSeconds()))
    .run()
  return result.meta?.changes === 1
}

export async function forget(inboxHash: string): Promise<void> {
  const db = (await siteEnv()).AUTH_DB
  await db
    .prepare('DELETE FROM demo_sends WHERE kind = ?1 AND address_hash = ?2')
    .bind(REPORT, inboxHash)
    .run()
}

const EMAIL_PATTERN = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/

export function isEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_PATTERN.test(value)
}

/** One inbox, however it is written: case, a +tag, and Gmail's dots. Never sent to. */
export function inboxOf(email: string): string {
  const [local = '', domain = ''] = email
    .trim()
    .toLowerCase()
    .split(/@(?=[^@]*$)/)
  const host = domain
    .replace(/\.+$/, '')
    .replace(/^googlemail\.com$/, 'gmail.com')
  let name = local.split('+')[0] ?? ''
  if (host === 'gmail.com') name = name.replace(/\./g, '')
  return `${name}@${host}`.normalize('NFKC')
}
