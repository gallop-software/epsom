import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Hero from './_blocks/hero'
import Feature from './_blocks/feature'
import Intro from './_blocks/intro'
import FloorTypes from './_blocks/floor-types'
import Gallery from './_blocks/gallery'
import Process from './_blocks/process'
import Projects from './_blocks/projects'
import Cta from './_blocks/cta'

function Content() {
  return (
    <>
      <Hero />
      <Feature />
      <Intro />
      <FloorTypes />
      <Gallery />
      <Process />
      <Projects />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title: 'Concrete Floors for Businesses in Red Mesa - Bedrock Flooring',
  path: '/commercial-concrete-flooring/',
  description:
    'Need a tougher floor for your business? Bedrock Flooring installs polished concrete for showrooms, offices, event spaces and production areas, plus resinous systems for restaurant kitchens and food prep rooms.',
  publishDate: '2026-02-05T22:14:30+00:00',
  modifiedDate: '2026-02-05T22:14:30+00:00',
  openGraph: {
    type: 'article',
    image: {
      url: '/content/c01-showroom.jpg',
      type: 'image/jpeg',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    {
      name: 'Floors for Business',
      href: '/commercial-concrete-flooring/',
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
