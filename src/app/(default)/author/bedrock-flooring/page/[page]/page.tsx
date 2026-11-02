import { PageWrapper } from '@/components/page-wrapper'
import { PostArchive } from '@/components/post-archive'
import {
  archiveImage,
  archivePath,
  getPosts,
  laterPages,
  pageSuffix,
} from '@/utils/blog'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'

const posts = getPosts()

export const dynamicParams = false
export const generateStaticParams = () => laterPages(posts)

interface PageProps {
  params: Promise<{ page: string }>
}

function pageMetadata(page: number): PageMetadata {
  return {
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
        title="Bedrock Flooring"
        posts={posts}
        page={page}
        path="/author/bedrock-flooring/"
      />
    </PageWrapper>
  )
}
