import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title:
    'Polished Concrete Retail Store Floor - Bedrock Flooring',
  path: '/polished-concrete-retail-store-floor/',
  publishDate: '2021-05-20T13:56:41+00:00',
  modifiedDate: '2022-01-14T03:44:09+00:00',
  date: '2021-05-20T08:56:41',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage:
    '/placeholder.png',
  excerpt:
    'This shop had a waxed floor that was showing its age in every aisle. We took it down and polished the concrete, so now there is no wax to strip and cleaning is a quick job. #commercialflooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Polished Concrete Retail Store Floor',
    wordCount: 37,
  },
  openGraph: {
    type: 'article',
    description:
      'This shop had a waxed floor that was showing its age in every aisle. We took it down and polished the concrete, so now there is no wax to strip and cleaning is a quick job. #commercialflooring',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'Polished Concrete Retail Store Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Polished Concrete Retail Store Floor',
      href: '/polished-concrete-retail-store-floor/',
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
