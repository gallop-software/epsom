import { getCloudflareContext } from '@opennextjs/cloudflare'

/**
 * One server-side setting, by name, read when it is asked for.
 *
 * Two places can hold it. On the deployed Worker every secret is on both `process.env` and
 * the Worker's `env`. Under `next dev` they are not the same set: `.env.local` fills
 * `process.env` and `.dev.vars` fills the Worker `env`. Reading both means a setting works
 * from whichever file it was put in.
 *
 * Never capture the result at module scope: on Workers a module is evaluated before any
 * request has an `env`.
 */
export async function serverEnv(name: string): Promise<string | undefined> {
  const fromProcess = process.env[name]
  if (fromProcess) return fromProcess
  try {
    const { env } = await getCloudflareContext({ async: true })
    const value = (env as unknown as Record<string, unknown>)[name]
    return typeof value === 'string' && value ? value : undefined
  } catch {
    return undefined
  }
}

/** The site's own address, without a trailing slash. Email links and the logo hang off it. */
export async function siteUrl(): Promise<string> {
  const url =
    (await serverEnv('AUTH_URL')) ||
    process.env.NEXT_PUBLIC_PRODUCTION_URL ||
    'https://epsom.gallop.software'
  return url.replace(/\/+$/, '')
}
