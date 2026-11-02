import { PageWrapper } from '@/components/page-wrapper'
import { PostArchive } from '@/components/post-archive'
import { archivePath, getPosts, pageSuffix } from '@/utils/blog'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'

const posts = getPosts()
const page = 1

function Content() {
  return (
    <PostArchive
      title="Blog"
      posts={posts}
      path="/blog/"
    />
  )
}

// The posts page (paged archives: blog/page/[page])
const metadata: PageMetadata = {
  title: `Flooring Blog${pageSuffix(posts, page)} - Bedrock Flooring`,
  path: archivePath('/blog/', page),
  publishDate: '2026-02-03T02:17:30+00:00',
  modifiedDate: '2026-02-03T02:17:30+00:00',
  pageType: ['WebPage', 'CollectionPage'],
  openGraph: { type: 'article', url: '/blog/' },
  primaryImage: false,
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: archivePath('/blog/', page) },
  ],
}

export const generateMetadata = () => generatePageMetadata(metadata)

export default function Page() {
  return (
    <PageWrapper metadata={metadata}>
      <Content />
    </PageWrapper>
  )
}
