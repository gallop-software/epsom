import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Polished Concrete Manufacturing Shop Floor - Bedrock Flooring',
  path: '/polished-concrete-manufacturing-shop-floor/',
  publishDate: '2026-03-22T15:21:21+00:00',
  modifiedDate: '2026-03-22T15:21:21+00:00',
  date: '2026-03-22T10:21:21',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage: '/content/i02-plant-polished.jpg',
  excerpt:
    'We are polishing this manufacturing shop floor one section at a time. Working in stages lets their team stay in production while we move across the slab. #commercialflooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Polished Concrete Manufacturing Shop Floor',
    wordCount: 28,
  },
  openGraph: {
    type: 'article',
    description:
      'We are polishing this manufacturing shop floor one section at a time. Working in stages lets their team stay in production while we move across the slab. #commercialflooring',
    image: {
      url: '/content/i02-plant-polished.jpg',
      type: 'image/jpeg',
      caption: 'Polished Concrete Manufacturing Shop Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Polished Concrete Manufacturing Shop Floor',
      href: '/polished-concrete-manufacturing-shop-floor/',
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
