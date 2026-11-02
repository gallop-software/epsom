import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title:
    'Resinous Butcher Shop Floor - Bedrock Flooring',
  path: '/resinous-butcher-shop-floor/',
  publishDate: '2021-03-12T15:49:13+00:00',
  modifiedDate: '2022-01-14T03:44:10+00:00',
  date: '2021-03-12T09:49:13',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage:
    '/placeholder.png',
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
      url: '/placeholder.png',
      type: 'image/png',
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
