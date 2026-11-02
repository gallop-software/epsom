import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Epoxy-Flake Lakeside Patio Coating - Bedrock Flooring',
  path: '/epoxy-flake-lakeside-patio-coating/',
  publishDate: '2026-05-05T21:16:06+00:00',
  modifiedDate: '2026-05-05T21:16:06+00:00',
  date: '2026-05-05T16:16:06',
  author: 'Bedrock Flooring',
  categories: ['Residential Concrete Flooring Projects'],
  featuredImage: '/content/r20-patio-pergola.jpg',
  excerpt:
    'This lakeside patio now has the same flake blend as the garage next to it. #residentialflooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Epoxy-Flake Lakeside Patio Coating',
    wordCount: 16,
  },
  openGraph: {
    type: 'article',
    description:
      'This lakeside patio now has the same flake blend as the garage next to it. #residentialflooring',
    image: {
      url: '/content/r20-patio-pergola.jpg',
      type: 'image/jpeg',
      caption: 'Epoxy-Flake Lakeside Patio Coating',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Epoxy-Flake Lakeside Patio Coating',
      href: '/epoxy-flake-lakeside-patio-coating/',
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
