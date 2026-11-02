import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Hero from './_blocks/hero'
import Video from './_blocks/video'
import Testimonial from './_blocks/testimonial'
import FloorTypes from './_blocks/floor-types'
import Gallery from './_blocks/gallery'
import Process from './_blocks/process'
import Projects from './_blocks/projects'
import Cta from './_blocks/cta'

function Content() {
  return (
    <>
      <Hero />
      <Video />
      <Testimonial />
      <FloorTypes />
      <Gallery />
      <Process />
      <Projects />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title:
    'Home and Garage Concrete Floors in Red Mesa - Bedrock Flooring',
  path: '/residential-concrete-flooring/',
  description:
    'More homeowners are picking coated concrete over carpet and tile. Bedrock Flooring finishes garages, living areas and patios with epoxy-chip systems, clear sealers and decorative stain.',
  publishDate: '2021-02-05T22:14:17+00:00',
  modifiedDate: '2024-02-22T14:40:04+00:00',
  openGraph: {
    type: 'article',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Floors for Home', href: '/residential-concrete-flooring/' },
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
