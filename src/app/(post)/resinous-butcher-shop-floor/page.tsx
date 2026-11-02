import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Resinous Butcher Shop Floor - Bedrock Flooring',
  path: '/resinous-butcher-shop-floor/',
  publishDate: '2026-03-12T15:49:13+00:00',
  modifiedDate: '2026-03-12T15:49:13+00:00',
  date: '2026-03-12T09:49:13',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage: '/content/f05-meat-room.jpg',
  excerpt:
    'To close out a grocery remodel, we laid a resinous coating across the butcher area. It lines up with the walk-in cooler floor we did for the same store a few weeks earlier. #resinousflooring #commercialflooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Resinous Butcher Shop Floor',
    wordCount: 35,
  },
  openGraph: {
    type: 'article',
    description:
      'To close out a grocery remodel, we laid a resinous coating across the butcher area. It lines up with the walk-in cooler floor we did for the same store a few weeks earlier. #resinousflooring #commercialflooring',
    image: {
      url: '/content/f05-meat-room.jpg',
      type: 'image/jpeg',
      caption: 'Resinous Butcher Shop Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Resinous Butcher Shop Floor',
      href: '/resinous-butcher-shop-floor/',
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
