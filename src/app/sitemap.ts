import { getPageSlugs } from '@/tools/get-page-slugs'
import { getPostSlugs } from '@/tools/get-post-slugs'
import { getCategorySlugs } from '@/tools/get-category-slugs'
import { baseURL } from '@/app/metadata'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ pageSlugs }, { postSlugs }, { categorySlugs }] = await Promise.all([
    getPageSlugs(),
    getPostSlugs(),
    getCategorySlugs(),
  ])

  const pages = pageSlugs.map((item) => ({
    url: baseURL + item.uri,
    ...(item.modified && { lastModified: new Date(item.modified) }),
    changeFrequency: 'weekly' as const,
  }))

  const posts = postSlugs.map((item) => ({
    url: baseURL + item.uri,
    ...(item.modified && { lastModified: new Date(item.modified) }),
    changeFrequency: 'monthly' as const,
  }))

  const categories = categorySlugs.map((item) => ({
    url: baseURL + item.uri,
    changeFrequency: 'weekly' as const,
  }))

  // The other archives Yoast listed: the author and the (empty) "featured" tag
  const archives = ['/author/bedrock-flooring/', '/tag/featured/'].map(
    (uri) => ({ url: baseURL + uri, changeFrequency: 'weekly' as const })
  )

  return [...pages, ...posts, ...categories, ...archives]
}
