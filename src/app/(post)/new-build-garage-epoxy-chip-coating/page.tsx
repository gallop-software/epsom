import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'New-Build Garage Epoxy-Chip Coating - Bedrock Flooring',
  path: '/new-build-garage-epoxy-chip-coating/',
  publishDate: '2021-03-05T15:32:01+00:00',
  modifiedDate: '2022-01-14T03:44:10+00:00',
  date: '2021-03-05T09:32:01',
  author: 'Bedrock Flooring',
  categories: ['Residential Concrete Flooring Projects'],
  featuredImage:
    '/placeholder.png',
  excerpt:
    'One of the last jobs on this new home was the garage floor. We coated it with epoxy chips in a salt-and-pepper blend just before the owners moved in. #residentialflooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'New-Build Garage Epoxy-Chip Coating',
    wordCount: 30,
  },
  openGraph: {
    type: 'article',
    description:
      'One of the last jobs on this new home was the garage floor. We coated it with epoxy chips in a salt-and-pepper blend just before the owners moved in. #residentialflooring',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'New-Build Garage Epoxy-Chip Coating',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'New-Build Garage Epoxy-Chip Coating',
      href: '/new-build-garage-epoxy-chip-coating/',
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
