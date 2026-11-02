import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Sealed Concrete Agricultural Building Floor - Bedrock Flooring',
  path: '/sealed-concrete-agricultural-building-floor/',
  publishDate: '2021-04-05T19:52:08+00:00',
  modifiedDate: '2022-01-14T03:44:09+00:00',
  date: '2021-04-05T14:52:08',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage:
    '/placeholder.png',
  excerpt:
    'Years of tile adhesive covered the slab in this farm co-op building. We ground it clean and applied a tough sealer, and the old concrete came up with rich color. #commercialflooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Sealed Concrete Agricultural Building Floor',
    wordCount: 31,
  },
  openGraph: {
    type: 'article',
    description:
      'Years of tile adhesive covered the slab in this farm co-op building. We ground it clean and applied a tough sealer, and the old concrete came up with rich color. #commercialflooring',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'Sealed Concrete Agricultural Building Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Sealed Concrete Agricultural Building Floor',
      href: '/sealed-concrete-agricultural-building-floor/',
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
