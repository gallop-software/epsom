import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Epoxy-Chip Backyard Patio Coating - Bedrock Flooring',
  path: '/epoxy-chip-backyard-patio-coating/',
  publishDate: '2021-04-01T22:03:58+00:00',
  modifiedDate: '2022-01-14T03:44:10+00:00',
  date: '2021-04-01T17:03:58',
  author: 'Bedrock Flooring',
  categories: ['Residential Concrete Flooring Projects'],
  featuredImage: '/placeholder.png',
  excerpt:
    'This backyard slab got an epoxy-chip coating and a whole new look. It is built for Red Mesa sun and storms, and the family finally has a patio they want to use. #residentialflooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: { headline: 'Epoxy-Chip Backyard Patio Coating', wordCount: 33 },
  openGraph: {
    type: 'article',
    description:
      'This backyard slab got an epoxy-chip coating and a whole new look. It is built for Red Mesa sun and storms, and the family finally has a patio they want to use. #residentialflooring',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'Epoxy-Chip Backyard Patio Coating',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Epoxy-Chip Backyard Patio Coating',
      href: '/epoxy-chip-backyard-patio-coating/',
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
