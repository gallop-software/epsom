import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Seamless Epoxy Dining Room Floor - Bedrock Flooring',
  path: '/seamless-epoxy-dining-room-floor/',
  publishDate: '2021-05-05T21:20:28+00:00',
  modifiedDate: '2022-01-14T03:44:09+00:00',
  date: '2021-05-05T16:20:28',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage:
    '/placeholder.png',
  excerpt:
    'We coated this restaurant dining room with a seamless epoxy system. With no grout lines to scrub, the staff can mop it down fast, and the lighter color opens up the room. #commercialflooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Seamless Epoxy Dining Room Floor',
    wordCount: 33,
  },
  openGraph: {
    type: 'article',
    description:
      'We coated this restaurant dining room with a seamless epoxy system. With no grout lines to scrub, the staff can mop it down fast, and the lighter color opens up the room. #commercialflooring',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'Seamless Epoxy Dining Room Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Seamless Epoxy Dining Room Floor',
      href: '/seamless-epoxy-dining-room-floor/',
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
