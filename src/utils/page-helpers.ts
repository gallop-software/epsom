import type { Metadata } from 'next'
import {
  baseURL,
  defaultSEOConfig,
  siteName,
  siteShareImage,
} from '@/app/metadata'
import { getStudioImage } from '@/utils/studio-helpers'

export interface BreadcrumbItem {
  name: string
  href: string
}

export interface PageMetadata {
  title?: string
  description?: string
  keywords?: string[]
  /** Route path with trailing slash ('/' for home). Used for canonical, og:url and JSON-LD ids. */
  path: string
  publishDate?: string
  modifiedDate?: string
  noindex?: boolean
  authors?: { name: string; url?: string }[]
  openGraph?: {
    type?: 'website' | 'article' | 'profile'
    /**
     * The archive's first-page URL on its later pages: Yoast used it for og:url
     * and the page's JSON-LD @id there (canonical stays the page's own URL).
     */
    url?: string
    locale?: string
    siteName?: string
    title?: string
    description?: string
    image?: {
      /** Studio key, e.g. /uploads/2025/01/photo.jpeg */
      url: string
      alt?: string
      type?: string
      /** The image's media caption (Yoast put it on the ImageObject). */
      caption?: string
    }
  }
  /**
   * JSON-LD primary image when it is not the share image: another image, or
   * `false` for none (Yoast's graph for pages whose content has no image).
   */
  primaryImage?: false | { url: string; caption?: string }
  /** Breadcrumb trail for this page (home first, current page last). */
  breadcrumbs?: BreadcrumbItem[]
  /**
   * Yoast's page type: archives are `CollectionPage` (the posts page
   * `['WebPage', 'CollectionPage']`), the author archive `ProfilePage`.
   */
  pageType?: 'WebPage' | 'CollectionPage' | 'ProfilePage' | string[]
  /** Blog posts: Yoast's Article node (with the author's Person node). */
  article?: { headline: string; wordCount: number }
  // Blog post fields, read by `npm run blog` into _data/_blog.json (Speedwell's names)
  /** Publication date, YYYY-MM-DD. */
  date?: string
  author?: string
  categories?: string[]
  /** Studio key of the featured image. */
  featuredImage?: string
  /** Archive card text (WordPress's excerpt). */
  excerpt?: string
  /** Video posts: the HLS playlist path, shown in place of the featured image in the archives. */
  video?: string
  /** Extra JSON-LD nodes appended to the page graph. */
  structuredData?: object[]
}

function defaultShareImage() {
  const image = getStudioImage(siteShareImage, 'full')
  return {
    url: image?.url || siteShareImage,
    ...(image && { width: image.width, height: image.height }),
    type: 'image/jpeg',
  }
}

export function generatePageMetadata(metadata: PageMetadata): Metadata {
  const url = `${baseURL}${metadata.path}`
  // Yoast printed no article dates on archives (the posts page included)
  const archive = !!metadata.pageType && metadata.pageType !== 'WebPage'
  const og = metadata.openGraph
  const ogImageData = og?.image ? getStudioImage(og.image.url, 'full') : null
  const images = og?.image
    ? [
        {
          url: ogImageData?.url || og.image.url,
          ...(ogImageData && {
            width: ogImageData.width,
            height: ogImageData.height,
          }),
          ...(og.image.type && { type: og.image.type }),
          ...(og.image.alt && { alt: og.image.alt }),
        },
      ]
    : // pages without their own share image use the logo card (meta only:
      // the JSON-LD keeps Yoast's graph, which had no image there)
      [defaultShareImage()]

  return {
    ...(metadata.title && { title: metadata.title }),
    ...(metadata.description && { description: metadata.description }),
    ...(metadata.keywords && { keywords: metadata.keywords }),
    alternates: { canonical: url },
    generator: 'Next.js',
    robots: metadata.noindex
      ? { index: false, follow: false }
      : defaultSEOConfig.robots,
    openGraph: {
      type: og?.type || 'article',
      locale: og?.locale || 'en_US',
      url: og?.url ? `${baseURL}${og.url}` : url,
      siteName: og?.siteName || siteName,
      ...(og?.title || metadata.title
        ? { title: og?.title || metadata.title }
        : {}),
      ...(og?.description || metadata.description
        ? { description: og?.description || metadata.description }
        : {}),
      ...(!archive &&
        metadata.publishDate && { publishedTime: metadata.publishDate }),
      ...(!archive &&
        metadata.modifiedDate && { modifiedTime: metadata.modifiedDate }),
      ...(images && { images }),
    },
    // Yoast printed <meta name="author"> on posts (not article:author)
    ...(metadata.authors && { authors: metadata.authors }),
    twitter: { card: 'summary_large_image' },
    // Yoast emitted the modified time on every page, websites included.
    ...(!archive &&
      metadata.modifiedDate && {
        other: { 'article:modified_time': metadata.modifiedDate },
      }),
  }
}
