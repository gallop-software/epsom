import { readdirSync, readFileSync, existsSync } from 'fs'
import path from 'path'

type PageSlugItem = {
  slug: string
  /** The page's metadata.modifiedDate, when it has one. */
  modified?: string | undefined
  uri: string
}

// (post): posts are listed from _data/_blog.json (getPostSlugs)
// (admin): /login and /dashboard only redirect, and are not for search
const BLOCKED_ROUTE_GROUPS = ['(demo)', '(post)', '(admin)']
const EXCLUDED_FOLDERS = [
  'api',
  'post', // Posts are handled separately
]

/**
 * The page's own metadata.modifiedDate. File modification times are not used:
 * they reflect when the build machine wrote the file, so they differed between
 * Vercel and Cloudflare and changed on every checkout.
 */
function modifiedDate(pagePath: string): string | undefined {
  return readFileSync(pagePath, 'utf8').match(
    /\bmodifiedDate:\s*['"]([^'"]+)['"]/
  )?.[1]
}

export async function getPageSlugs(): Promise<{ pageSlugs: PageSlugItem[] }> {
  const appDir = path.join(process.cwd(), 'src/app')
  const out: PageSlugItem[] = []

  function scanRouteGroup(routeGroupPath: string): void {
    const entries = readdirSync(routeGroupPath, { withFileTypes: true })

    // Check for home page (page.tsx directly in route group)
    const homePagePath = path.join(routeGroupPath, 'page.tsx')
    if (existsSync(homePagePath)) {
      out.push({
        slug: '',
        modified: modifiedDate(homePagePath),
        uri: '/',
      })
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      if (EXCLUDED_FOLDERS.includes(entry.name)) continue
      if (entry.name.startsWith('[') && entry.name.endsWith(']')) continue
      if (entry.name.startsWith('(') && entry.name.endsWith(')')) continue

      const pagePath = path.join(routeGroupPath, entry.name, 'page.tsx')
      if (existsSync(pagePath)) {
        out.push({
          slug: entry.name,
          modified: modifiedDate(pagePath),
          uri: '/' + entry.name + '/',
        })
      }
    }
  }

  // Scan all route groups in app directory
  const appEntries = readdirSync(appDir, { withFileTypes: true })
  for (const entry of appEntries) {
    if (
      entry.isDirectory() &&
      entry.name.startsWith('(') &&
      entry.name.endsWith(')')
    ) {
      if (BLOCKED_ROUTE_GROUPS.includes(entry.name)) continue
      scanRouteGroup(path.join(appDir, entry.name))
    }
  }

  // Remove duplicate home pages (keep first one)
  const seen = new Set<string>()
  const unique = out.filter((item) => {
    if (seen.has(item.uri)) return false
    seen.add(item.uri)
    return true
  })

  return { pageSlugs: unique }
}
