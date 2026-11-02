import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Self-Leveling Resinous Food Prep Floor - Bedrock Flooring',
  path: '/self-leveling-resinous-food-prep-floor/',
  publishDate: '2026-02-23T15:43:18+00:00',
  modifiedDate: '2026-02-23T15:43:18+00:00',
  date: '2026-02-23T15:43:18',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage: '/content/f02-kitchen-gray.jpg',
  excerpt:
    'A worn rubber floor came out of this grocery prep room so we could pour a self-leveling resinous system. The crew now has one continuous surface from wall to wall.',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Self-Leveling Resinous Food Prep Floor',
    wordCount: 30,
  },
  openGraph: {
    type: 'article',
    description:
      'A worn rubber floor came out of this grocery prep room so we could pour a self-leveling resinous system. The crew now has one continuous surface from wall to wall.',
    image: {
      url: '/content/f02-kitchen-gray.jpg',
      type: 'image/jpeg',
      caption: 'Self-Leveling Resinous Food Prep Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Self-Leveling Resinous Food Prep Floor',
      href: '/self-leveling-resinous-food-prep-floor/',
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
