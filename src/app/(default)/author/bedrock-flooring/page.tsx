import { PageWrapper } from '@/components/page-wrapper'
import { PostArchive } from '@/components/post-archive'
import { archiveImage, archivePath, getPosts, pageSuffix } from '@/utils/blog'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'

const posts = getPosts()
const page = 1

function Content() {
  return (
    <PostArchive
      title="Bedrock Flooring"
      posts={posts}
      path="/author/bedrock-flooring/"
    />
  )
}

// The one WordPress author's archive (paged: page/[page])
const metadata: PageMetadata = {
  title: `Posts by the Bedrock Flooring Crew${pageSuffix(posts, page)}`,
  path: archivePath('/author/bedrock-flooring/', page),
  pageType: 'ProfilePage',
  author: 'Bedrock Flooring',
  openGraph: {
    type: 'profile',
    url: '/author/bedrock-flooring/',
    image: {
      url: '/brand/favicon.png',
      type: 'image/png',
    },
  },
  primaryImage: archiveImage(posts, page),
  breadcrumbs: [
    { name: 'Home', href: '/' },
    {
      name: 'All Posts from Bedrock Flooring',
      href: archivePath('/author/bedrock-flooring/', page),
    },
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
