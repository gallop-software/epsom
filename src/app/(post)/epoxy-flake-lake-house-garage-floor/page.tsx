import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Epoxy-Flake Lake House Garage Floor - Bedrock Flooring',
  path: '/epoxy-flake-lake-house-garage-floor/',
  publishDate: '2026-04-22T21:50:34+00:00',
  modifiedDate: '2026-04-22T21:50:34+00:00',
  date: '2026-04-22T16:50:34',
  author: 'Bedrock Flooring',
  categories: ['Residential Concrete Flooring Projects'],
  featuredImage: '/content/r19-lake-garage.jpg',
  excerpt:
    'We put down an epoxy-flake floor in the garage of this waterfront home. Boats, coolers and wet gear can all sit on it without the owners giving it a second thought. #residentialflooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Epoxy-Flake Lake House Garage Floor',
    wordCount: 32,
  },
  openGraph: {
    type: 'article',
    description:
      'We put down an epoxy-flake floor in the garage of this waterfront home. Boats, coolers and wet gear can all sit on it without the owners giving it a second thought. #residentialflooring',
    image: {
      url: '/content/r19-lake-garage.jpg',
      type: 'image/jpeg',
      caption: 'Epoxy-Flake Lake House Garage Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Epoxy-Flake Lake House Garage Floor',
      href: '/epoxy-flake-lake-house-garage-floor/',
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
