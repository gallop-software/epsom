// See https://opennext.js.org/cloudflare for configuration options.
import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache'

// Everything on this site comes from the codebase and only changes with a
// deploy, so every page and the sitemap are prerendered once at build and
// served read-only from Workers static assets; nothing regenerates at runtime.
// That is why no route may set `revalidate` (see src/app/sitemap.ts, which
// reads page sources at build). If content ever comes from an external source
// that must refresh between deploys, switch to the R2 cache + queue instead.
//
// Do not enable `enableCacheInterception`: it answers Next 16 segment-prefetch
// requests (Next-Router-Segment-Prefetch) with the full page RSC payload, and
// the client router retries them forever (millions of requests a day).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
})
