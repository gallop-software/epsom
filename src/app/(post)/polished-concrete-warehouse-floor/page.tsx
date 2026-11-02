import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Polished Concrete Warehouse Floor - Bedrock Flooring',
  path: '/polished-concrete-warehouse-floor/',
  publishDate: '2021-05-31T21:32:44+00:00',
  modifiedDate: '2022-01-14T03:44:09+00:00',
  date: '2021-05-31T16:32:44',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage:
    '/placeholder.png',
  excerpt:
    'A tired epoxy coating and chipped joints had to go in this storage warehouse. We ground the slab down to polished concrete and cut fresh joints, so the floor looks clean and can take daily forklift traffic. #commercialflooring #polishedconcrete',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Polished Concrete Warehouse Floor',
    wordCount: 39,
  },
  openGraph: {
    type: 'article',
    description:
      'A tired epoxy coating and chipped joints had to go in this storage warehouse. We ground the slab down to polished concrete and cut fresh joints, so the floor looks clean and can take daily forklift traffic. #commercialflooring #polishedconcrete',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'Polished Concrete Warehouse Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Polished Concrete Warehouse Floor',
      href: '/polished-concrete-warehouse-floor/',
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
