import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title:
    'Sealed Concrete Retail Display Floor - Bedrock Flooring',
  path: '/sealed-concrete-retail-display-floor/',
  publishDate: '2021-02-19T07:29:48+00:00',
  modifiedDate: '2022-01-14T03:44:10+00:00',
  date: '2021-02-19T07:29:48',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage:
    '/placeholder.png',
  excerpt:
    'Old VCT came up at this farm and ranch store so we could seal the concrete underneath. Products show well on the glossy surface, and upkeep is simple.',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Sealed Concrete Retail Display Floor',
    wordCount: 28,
  },
  openGraph: {
    type: 'article',
    description:
      'Old VCT came up at this farm and ranch store so we could seal the concrete underneath. Products show well on the glossy surface, and upkeep is simple.',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'Sealed Concrete Retail Display Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Sealed Concrete Retail Display Floor',
      href: '/sealed-concrete-retail-display-floor/',
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
