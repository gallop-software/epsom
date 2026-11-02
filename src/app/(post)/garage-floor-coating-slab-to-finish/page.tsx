import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Garage Floor Coating From Slab to Finish - Bedrock Flooring',
  path: '/garage-floor-coating-slab-to-finish/',
  publishDate: '2026-02-26T16:21:34+00:00',
  modifiedDate: '2026-02-26T16:21:34+00:00',
  date: '2026-02-26T10:21:34',
  author: 'Bedrock Flooring',
  categories: ['Residential Concrete Flooring Projects'],
  featuredImage: '/content/r11-garage-shop.jpg',
  excerpt:
    'This garage went from a bare slab to a finished coating in a few careful steps: walk the job, prep the concrete, then roll the coat.',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Garage Floor Coating From Slab to Finish',
    wordCount: 25,
  },
  openGraph: {
    type: 'article',
    description:
      'This garage went from a bare slab to a finished coating in a few careful steps: walk the job, prep the concrete, then roll the coat.',
    image: {
      url: '/content/r11-garage-shop.jpg',
      type: 'image/jpeg',
      caption: 'Garage Floor Coating From Slab to Finish',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Garage Floor Coating From Slab to Finish',
      href: '/garage-floor-coating-slab-to-finish/',
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
