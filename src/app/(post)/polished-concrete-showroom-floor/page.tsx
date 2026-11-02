import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Polished Concrete Showroom Floor - Bedrock Flooring',
  path: '/polished-concrete-showroom-floor/',
  publishDate: '2026-02-26T17:47:00+00:00',
  modifiedDate: '2026-02-26T17:47:00+00:00',
  date: '2026-02-26T11:47:00',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage: '/content/c01-showroom.jpg',
  excerpt:
    'We polished this dealership showroom floor and got it ready for the inventory to roll back in. #CommercialFlooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: { headline: 'Polished Concrete Showroom Floor', wordCount: 18 },
  openGraph: {
    type: 'article',
    description:
      'We polished this dealership showroom floor and got it ready for the inventory to roll back in. #CommercialFlooring',
    image: {
      url: '/content/c01-showroom.jpg',
      type: 'image/jpeg',
      caption: 'Polished Concrete Showroom Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Polished Concrete Showroom Floor',
      href: '/polished-concrete-showroom-floor/',
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
