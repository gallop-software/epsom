import { siteDescription, siteName } from '@/app/metadata'
import type { PageMetadata } from '@/utils/page-helpers'
import { getStudioImage } from '@/utils/studio-helpers'

// Stable JSON-LD id for the site's one author
const AUTHOR_ID = '/#/schema/person/bedrock-flooring'

/**
 * Per-page JSON-LD nodes, in order: [Article,] WebPage, ImageObject,
 * BreadcrumbList, WebSite [, Person]. Relative @id/url values are prefixed with baseURL by PageWrapper.
 */
export function buildPageGraph(metadata: PageMetadata): object[] {
  const url = metadata.path
  const image =
    metadata.primaryImage === false
      ? undefined
      : (metadata.primaryImage ?? metadata.openGraph?.image)
  const imageData = image ? getStudioImage(image.url, 'full') : undefined
  const breadcrumbs = metadata.breadcrumbs || []
  // Paged archives: pages 2+ use the archive's own id (see openGraph.url)
  const pageId = metadata.openGraph?.url ?? url
  const pageType = metadata.pageType || 'WebPage'
  const profile = pageType === 'ProfilePage'
  const article = metadata.article

  const graph: object[] = []

  if (article) {
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      isPartOf: { '@id': url },
      author: { name: metadata.author, '@id': AUTHOR_ID },
      headline: article.headline,
      datePublished: metadata.publishDate,
      dateModified: metadata.modifiedDate,
      mainEntityOfPage: { '@id': url },
      wordCount: article.wordCount,
      publisher: { '@id': '/#organization' },
      ...(image && {
        image: { '@id': `${url}#primaryimage` },
        thumbnailUrl: image.url,
      }),
      ...(metadata.categories && { articleSection: metadata.categories }),
      inLanguage: 'en-US',
    })
  }

  graph.push({
    '@type': pageType,
    '@id': pageId,
    url,
    name: metadata.title,
    isPartOf: { '@id': '/#website' },
    // Only the front page links the organization
    ...(url === '/' && { about: { '@id': '/#organization' } }),
    ...(image && {
      primaryImageOfPage: { '@id': `${url}#primaryimage` },
      image: { '@id': `${url}#primaryimage` },
      thumbnailUrl: image.url,
    }),
    ...(metadata.publishDate && { datePublished: metadata.publishDate }),
    ...(metadata.modifiedDate && { dateModified: metadata.modifiedDate }),
    description: metadata.description,
    ...(breadcrumbs.length && { breadcrumb: { '@id': `${url}#breadcrumb` } }),
    inLanguage: 'en-US',
    ...((pageType === 'WebPage' || profile) && {
      potentialAction: [{ '@type': 'ReadAction', target: [url] }],
    }),
  })

  if (image) {
    graph.push({
      '@type': 'ImageObject',
      inLanguage: 'en-US',
      '@id': `${url}#primaryimage`,
      url: image.url,
      contentUrl: image.url,
      ...(imageData && { width: imageData.width, height: imageData.height }),
      ...(image.caption && { caption: image.caption }),
    })
  }

  if (breadcrumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        // The current page's crumb has no item.
        ...(index < breadcrumbs.length - 1 && { item: item.href }),
      })),
    })
  }

  graph.push({
    '@type': 'WebSite',
    '@id': '/#website',
    url: '/',
    name: siteName,
    description: siteDescription,
    publisher: { '@id': '/#organization' },
    inLanguage: 'en-US',
  })

  if (article || profile) {
    graph.push({
      '@type': 'Person',
      '@id': AUTHOR_ID,
      name: metadata.author,
      image: {
        '@type': 'ImageObject',
        inLanguage: 'en-US',
        '@id': '/#/schema/person/image/',
        url: '/brand/icon-b.png',
        contentUrl: '/brand/icon-b.png',
        caption: metadata.author,
      },
      ...(profile
        ? { mainEntityOfPage: { '@id': pageId } }
        : { url: '/author/bedrock-flooring/' }),
    })
  }

  return graph
}
