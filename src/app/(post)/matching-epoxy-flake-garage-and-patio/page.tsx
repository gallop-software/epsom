import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Matching Epoxy-Flake Garage and Patio - Bedrock Flooring',
  path: '/matching-epoxy-flake-garage-and-patio/',
  publishDate: '2021-05-05T21:25:28+00:00',
  modifiedDate: '2022-01-14T03:44:09+00:00',
  date: '2021-05-05T16:25:28',
  author: 'Bedrock Flooring',
  categories: ['Residential Concrete Flooring Projects'],
  featuredImage: '/placeholder.png',
  excerpt:
    'New owners asked us to coat both the garage and the back patio with the same flake system. It handles the outdoor weather well and gives them a good spot to host friends. #residentialflooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Matching Epoxy-Flake Garage and Patio',
    wordCount: 34,
  },
  openGraph: {
    type: 'article',
    description:
      'New owners asked us to coat both the garage and the back patio with the same flake system. It handles the outdoor weather well and gives them a good spot to host friends. #residentialflooring',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'Matching Epoxy-Flake Garage and Patio',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Matching Epoxy-Flake Garage and Patio',
      href: '/matching-epoxy-flake-garage-and-patio/',
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
