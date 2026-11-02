import { PageWrapper } from '@/components/page-wrapper'
import { PostArchive } from '@/components/post-archive'
import {
  archiveImage,
  archivePath,
  getCategories,
  getPostsInCategory,
  pageSuffix,
} from '@/utils/blog'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'

export const dynamicParams = false
export const generateStaticParams = () =>
  getCategories().map(({ slug }) => ({ slug }))

interface PageProps {
  params: Promise<{ slug: string }>
}

/** A category archive, first page (later pages: page/[page]). */
function pageMetadata(slug: string, page = 1): PageMetadata {
  const name = getCategories().find((c) => c.slug === slug)?.name ?? slug
  const posts = getPostsInCategory(slug)
  return {
    title: `${name} Project Posts${pageSuffix(posts, page)} - Bedrock Flooring`,
    path: archivePath(`/category/${slug}/`, page),
    pageType: 'CollectionPage',
    openGraph: { type: 'article', url: `/category/${slug}/` },
    primaryImage: archiveImage(posts, page),
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name, href: archivePath(`/category/${slug}/`, page) },
    ],
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  return generatePageMetadata(pageMetadata(slug))
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const metadata = pageMetadata(slug)
  return (
    <PageWrapper metadata={metadata}>
      <PostArchive
        title={metadata.breadcrumbs?.[1]?.name ?? slug}
        posts={getPostsInCategory(slug)}
        path={`/category/${slug}/`}
      />
    </PageWrapper>
  )
}
