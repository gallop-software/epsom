import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Hero from './_blocks/hero'
import Feature from './_blocks/feature'
import Benefits from './_blocks/benefits'
import Kitchens from './_blocks/kitchens'
import Gallery from './_blocks/gallery'
import Process from './_blocks/process'
import Cta from './_blocks/cta'

function Content() {
  return (
    <>
      <Hero />
      <Feature />
      <Benefits />
      <Kitchens />
      <Gallery />
      <Process />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title: 'Food Service Floor Systems - Bedrock Flooring',
  path: '/food-service-flooring/',
  description:
    'Food service floors built in Red Mesa for restaurants, kitchens, prep areas and breweries. Made for daily work, simple to clean, your colors.',
  publishDate: '2026-04-11T16:07:15+00:00',
  modifiedDate: '2026-04-11T16:07:15+00:00',
  openGraph: {
    type: 'article',
    image: {
      url: '/content/f01-kitchen-line.jpg',
      type: 'image/jpeg',
      caption: 'Food Service Floor Systems',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    {
      name: 'Food Service Floor Systems',
      href: '/food-service-flooring/',
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
