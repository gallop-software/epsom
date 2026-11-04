import { getCloudflareContext } from '@opennextjs/cloudflare'

/**
 * The Worker's bindings. `{ async: true }` so this also works during `next dev`,
 * where the context is resolved lazily rather than from a live request.
 */
export async function siteEnv(): Promise<CloudflareEnv> {
  const { env } = await getCloudflareContext({ async: true })
  return env
}
