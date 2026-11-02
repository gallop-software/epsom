import blogData from '@/data/_blog.json'

type PostSlugItem = {
  slug: string
  modified: string
  uri: string
}

type BlogPost = {
  slug: string
  metadata: {
    date?: string
    modified?: string
  }
}

export async function getPostSlugs(): Promise<{ postSlugs: PostSlugItem[] }> {
  const postSlugs: PostSlugItem[] = (blogData as BlogPost[]).map((post) => ({
    slug: post.slug,
    modified: post.metadata.modified || post.metadata.date || '',
    // WordPress post URLs sit at the site root
    uri: `/${post.slug}/`,
  }))

  return { postSlugs }
}
