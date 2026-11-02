import { PageWrapper } from '@/components/page-wrapper'
import { PostArchive } from '@/components/post-archive'
import { archivePath, getPosts, laterPages, pageSuffix } from '@/utils/blog'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'

const posts = getPosts()

export const dynamicParams = false
export const generateStaticParams = () => laterPages(posts)

interface PageProps {
  params: Promise<{ page: string }>
}

function pageMetadata(page: number): PageMetadata {
  return {
    title: `Flooring Blog${pageSuffix(posts, page)} - Bedrock Flooring`,
    path: archivePath('/blog/', page),
    publishDate: '2021-02-03T02:17:30+00:00',
    modifiedDate: '2021-05-18T13:58:44+00:00',
    pageType: ['WebPage', 'CollectionPage'],
    openGraph: { type: 'article', url: '/blog/' },
    primaryImage: false,
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: archivePath('/blog/', page) },
    ],
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { page } = await params
  return generatePageMetadata(pageMetadata(Number(page)))
}

export default async function Page({ params }: PageProps) {
  const page = Number((await params).page)
  return (
    <PageWrapper metadata={pageMetadata(page)}>
      <PostArchive
        title="Blog"
        posts={posts}
        page={page}
        path="/blog/"
      />
    </PageWrapper>
  )
}
