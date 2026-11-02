import { getSlug } from '@/tools/get-slug'
import blogData from '@/data/_blog.json'

type CategorySlug = {
  slug: string
  uri: string
}

type BlogPost = {
  slug: string
  metadata: {
    categories?: string[]
  }
}

export async function getCategorySlugs(): Promise<{
  categorySlugs: CategorySlug[]
}> {
  const categorySet = new Set<string>()

  for (const post of blogData as BlogPost[]) {
    if (Array.isArray(post.metadata.categories)) {
      for (const category of post.metadata.categories) {
        if (typeof category === 'string' && category.trim()) {
          const slug = getSlug(category.trim())
          if (slug) {
            categorySet.add(slug)
          }
        }
      }
    }
  }

  const categorySlugs: CategorySlug[] = Array.from(categorySet)
    .sort((a, b) => a.localeCompare(b))
    .map((slug) => ({
      slug,
      uri: `/category/${slug}/`,
    }))

  return { categorySlugs }
}
