import { PageWrapper } from '@/components/page-wrapper'
import { PostArchive } from '@/components/post-archive'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'

// The "featured" tag: no post uses it, so WordPress showed an empty archive
function Content() {
  return (
    <PostArchive
      title="featured"
      posts={[]}
      path="/tag/featured/"
    />
  )
}

const metadata: PageMetadata = {
  title: 'Featured Posts - Bedrock Flooring',
  path: '/tag/featured/',
  pageType: 'CollectionPage',
  openGraph: { type: 'article' },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'featured', href: '/tag/featured/' },
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
