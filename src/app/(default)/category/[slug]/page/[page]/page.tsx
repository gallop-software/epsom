import { PageWrapper } from '@/components/page-wrapper'
import { PostArchive } from '@/components/post-archive'
import {
  archiveImage,
  archivePath,
  getCategories,
  getPostsInCategory,
  laterPages,
  pageSuffix,
} from '@/utils/blog'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'

export const dynamicParams = false
export const generateStaticParams = () =>
  getCategories().flatMap(({ slug }) =>
    laterPages(getPostsInCategory(slug)).map(({ page }) => ({ slug, page }))
  )

interface PageProps {
  params: Promise<{ slug: string; page: string }>
}

function pageMetadata(slug: string, page: number): PageMetadata {
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
  const { slug, page } = await params
  return generatePageMetadata(pageMetadata(slug, Number(page)))
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = Number((await params).page)
  const metadata = pageMetadata(slug, page)
  return (
    <PageWrapper metadata={metadata}>
      <PostArchive
        title={metadata.breadcrumbs?.[1]?.name ?? slug}
        posts={getPostsInCategory(slug)}
        page={page}
        path={`/category/${slug}/`}
      />
    </PageWrapper>
  )
}
