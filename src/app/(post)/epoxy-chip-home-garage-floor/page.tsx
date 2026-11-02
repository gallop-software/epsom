import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Epoxy-Chip Home Garage Floor - Bedrock Flooring',
  path: '/epoxy-chip-home-garage-floor/',
  publishDate: '2021-02-19T07:12:58+00:00',
  modifiedDate: '2022-01-14T03:44:10+00:00',
  date: '2021-02-19T07:12:58',
  author: 'Bedrock Flooring',
  categories: ['Residential Concrete Flooring Projects'],
  featuredImage:
    '/placeholder.png',
  excerpt:
    'We wrapped up this home garage with a black and white chip blend. The textured finish hides dust between cleanings and rinses off without much effort.',
  authors: [{ name: 'Bedrock Flooring' }],
  article: { headline: 'Epoxy-Chip Home Garage Floor', wordCount: 26 },
  openGraph: {
    type: 'article',
    description:
      'We wrapped up this home garage with a black and white chip blend. The textured finish hides dust between cleanings and rinses off without much effort.',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'Epoxy-Chip Home Garage Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Epoxy-Chip Home Garage Floor',
      href: '/epoxy-chip-home-garage-floor/',
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
