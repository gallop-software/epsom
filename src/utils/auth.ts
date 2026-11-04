import 'server-only'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { betterAuth, type BetterAuthOptions } from 'better-auth'
import { APIError } from 'better-auth/api'
import { nextCookies } from 'better-auth/next-js'
import { emailOTP } from 'better-auth/plugins/email-otp'
import { magicLink } from 'better-auth/plugins/magic-link'
import { isAllowedEmail } from '@/utils/auth-allowlist'
import { AUTH_EMAIL_MINUTES, sendSignInEmail } from '@/utils/auth-email'

// Sign-in for the client and the web developers, by email only: a six-digit
// code or a sign-in link. There are no passwords and no sign-up: only the
// addresses in AUTH_ALLOWED_EMAILS are ever sent a code or a link, and only
// they can have an account. Users, sessions and pending codes live in D1 (the
// AUTH_DB binding); the tables are in _scripts/migrations/0001_auth.sql.

const productionUrl =
  process.env.NEXT_PUBLIC_PRODUCTION_URL || 'http://localhost:3000'

// A send that failed for an allowed address is said so; one for any other
// address is answered the same as a success, so the form cannot be used to
// find out who has an account.
async function sendIfAllowed(
  email: string,
  sign: { code: string } | { url: string }
) {
  if (!isAllowedEmail(email)) return
  const sent = await sendSignInEmail(email, sign)
  // Locally the code or link is in the dev server log, so a send that fails
  // (the remote EMAIL binding needs `wrangler login`) need not stop sign-in.
  if (!sent && process.env.NODE_ENV === 'development') return
  if (!sent) {
    throw new APIError('INTERNAL_SERVER_ERROR', {
      message: 'The email could not be sent. Please try again.',
    })
  }
}

function hostOf(url: string): string | null {
  try {
    return new URL(url).host
  } catch {
    return null
  }
}

function createAuth(database: BetterAuthOptions['database']) {
  return betterAuth({
    database,
    secret: process.env.BETTER_AUTH_SECRET,
    // Links and redirects use the host the request came to: the live site,
    // the dev hostname, or localhost while working on it (development only).
    baseURL: {
      allowedHosts: [
        ...new Set(
          [
            hostOf(productionUrl),
            // Never trusted on the live site
            process.env.NODE_ENV === 'development' ? 'localhost:*' : null,
          ].filter((host): host is string => Boolean(host))
        ),
      ],
      fallback: productionUrl,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 30,
      updateAge: 60 * 60 * 24,
      // Pages check the signed cookie instead of D1 for five minutes at a time
      cookieCache: { enabled: true, maxAge: 5 * 60 },
    },
    // In D1, because a Worker's memory is not shared between requests
    rateLimit: { enabled: true, storage: 'database' },
    advanced: {
      ipAddress: { ipAddressHeaders: ['cf-connecting-ip'] },
      // The site's addresses end in a slash (trailingSlash in next.config),
      // so every call to these routes arrives with one.
      skipTrailingSlashes: true,
    },
    databaseHooks: {
      user: {
        create: {
          // No account for anyone else, whatever the way in
          before: async (user) => {
            if (!isAllowedEmail(user.email)) {
              throw new APIError('FORBIDDEN', {
                message: 'This address cannot sign in.',
              })
            }
            return { data: user }
          },
        },
      },
    },
    plugins: [
      emailOTP({
        otpLength: 6,
        expiresIn: AUTH_EMAIL_MINUTES * 60,
        allowedAttempts: 5,
        async sendVerificationOTP({ email, otp, type }) {
          if (type !== 'sign-in') return
          await sendIfAllowed(email, { code: otp })
        },
      }),
      magicLink({
        expiresIn: AUTH_EMAIL_MINUTES * 60,
        storeToken: 'hashed',
        async sendMagicLink({ email, url }) {
          await sendIfAllowed(email, { url })
        },
      }),
      // Lets server actions set the session cookie; must be last
      nextCookies(),
    ],
  })
}

type Auth = ReturnType<typeof createAuth>

// One instance per DB binding: the binding only exists inside a request, and
// is the same object for every request an isolate serves. Async for the
// same reason as the binding.
const instances = new WeakMap<object, Auth>()

export async function getAuth(): Promise<Auth> {
  const { env: raw } = await getCloudflareContext({ async: true })
  const env = raw as unknown as {
    AUTH_DB?: BetterAuthOptions['database'] & object
  }
  if (!env.AUTH_DB) throw new Error('The AUTH_DB binding is not configured')
  let auth = instances.get(env.AUTH_DB)
  if (!auth) {
    auth = createAuth(env.AUTH_DB)
    instances.set(env.AUTH_DB, auth)
  }
  return auth
}

export type Session = NonNullable<
  Awaited<ReturnType<Auth['api']['getSession']>>
>

/**
 * The signed-in user's session, or null. An address taken off
 * AUTH_ALLOWED_EMAILS loses access at once, even with a session left.
 */
export async function getSession(headers: Headers): Promise<Session | null> {
  const auth = await getAuth()
  const session = await auth.api.getSession({ headers })
  if (!session || !isAllowedEmail(session.user.email)) return null
  return session
}
