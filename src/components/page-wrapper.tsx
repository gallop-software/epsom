import Script from 'next/script'
import type { ReactNode } from 'react'
import { baseURL, defaultStructuredData } from '@/app/metadata'
import type { PageMetadata } from '@/utils/page-helpers'
import { buildPageGraph } from '@/utils/structured-data'
import { studioUrl } from '@/utils/studio-helpers'

interface PageWrapperProps {
  children: ReactNode
  metadata: PageMetadata
}

const IMAGE_KEYS = new Set(['image', 'logo', 'thumbnailUrl', 'contentUrl'])
const URL_KEYS = new Set(['@id', 'url', 'item', 'target'])

// Resolve Studio keys to CDN URLs and relative ids/urls to absolute ones.
function processStructuredData(data: unknown, key?: string): unknown {
  if (Array.isArray(data)) return data.map((v) => processStructuredData(v, key))
  if (data && typeof data === 'object') {
    const result: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(data))
      result[k] = processStructuredData(v, k)
    return result
  }
  if (typeof data === 'string' && key) {
    // A Studio key is an image wherever it appears (ImageObject.url included).
    if (
      (IMAGE_KEYS.has(key) || URL_KEYS.has(key)) &&
      data.startsWith('/uploads/')
    ) {
      return studioUrl(data, 'full')
    }
    if ((URL_KEYS.has(key) || IMAGE_KEYS.has(key)) && data.startsWith('/')) {
      return `${baseURL}${data}`
    }
  }
  return data
}

export function PageWrapper({ children, metadata }: PageWrapperProps) {
  const structuredData = processStructuredData({
    '@context': 'https://schema.org',
    '@graph': [
      ...buildPageGraph(metadata),
      ...defaultStructuredData,
      ...(metadata.structuredData || []),
    ],
  })

  return (
    <>
      <Script
        id="site-schema"
        type="application/ld+json"
      >
        {JSON.stringify(structuredData)}
      </Script>
      <article className="main-content [&_p_a]:highlight-link">
        {children}
      </article>
    </>
  )
}
