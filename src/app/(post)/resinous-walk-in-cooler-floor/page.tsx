import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title:
    'Resinous Walk-In Cooler Floor - Bedrock Flooring',
  path: '/resinous-walk-in-cooler-floor/',
  publishDate: '2021-02-26T06:15:11+00:00',
  modifiedDate: '2022-01-14T03:44:10+00:00',
  date: '2021-02-26T00:15:11',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage:
    '/placeholder.png',
  excerpt:
    'A new walk-in meat cooler at a grocery store needed a tough floor, so we installed a resinous system. The cutting room floor is next on our list. #concrete #decorativeflooring #commercialflooring #concretefloors',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Resinous Walk-In Cooler Floor',
    wordCount: 33,
  },
  openGraph: {
    type: 'article',
    description:
      'A new walk-in meat cooler at a grocery store needed a tough floor, so we installed a resinous system. The cutting room floor is next on our list. #concrete #decorativeflooring #commercialflooring #concretefloors',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption:
        'Resinous Walk-In Cooler Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Resinous Walk-In Cooler Floor',
      href: '/resinous-walk-in-cooler-floor/',
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
