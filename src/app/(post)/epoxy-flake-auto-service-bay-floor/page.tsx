import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Epoxy-Flake Auto Service Bay Floor - Bedrock Flooring',
  path: '/epoxy-flake-auto-service-bay-floor/',
  publishDate: '2026-04-14T14:07:47+00:00',
  modifiedDate: '2026-04-14T14:07:47+00:00',
  date: '2026-04-14T09:07:47',
  author: 'Bedrock Flooring',
  categories: ['Commercial Concrete Flooring Projects'],
  featuredImage: '/content/i06-repair-bay.jpg',
  excerpt:
    'We finished an epoxy-flake floor in the service bays at a local auto shop. Oil and road grime clean up easily, and the textured surface gives the techs secure footing. #commercialflooring',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Epoxy-Flake Auto Service Bay Floor',
    wordCount: 31,
  },
  openGraph: {
    type: 'article',
    description:
      'We finished an epoxy-flake floor in the service bays at a local auto shop. Oil and road grime clean up easily, and the textured surface gives the techs secure footing. #commercialflooring',
    image: {
      url: '/content/i06-repair-bay.jpg',
      type: 'image/jpeg',
      caption: 'Epoxy-Flake Auto Service Bay Floor',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Epoxy-Flake Auto Service Bay Floor',
      href: '/epoxy-flake-auto-service-bay-floor/',
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
