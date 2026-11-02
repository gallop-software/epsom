import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Hero from './_blocks/hero'
import Video from './_blocks/video'
import Benefits from './_blocks/benefits'
import FloorTypes from './_blocks/floor-types'
import Gallery from './_blocks/gallery'
import Process from './_blocks/process'
import Contact from './_blocks/contact'

function Content() {
  return (
    <>
      <Hero />
      <Video />
      <Benefits />
      <FloorTypes />
      <Gallery />
      <Process />
      <Contact />
    </>
  )
}

const metadata: PageMetadata = {
  title: 'Industrial Floor Systems - Bedrock Flooring',
  path: '/industrial-flooring/',
  description:
    'Bedrock Flooring builds industrial floors that handle forklift traffic and shop work while keeping a clean, sharp look.',
  publishDate: '2024-01-12T19:32:39+00:00',
  modifiedDate: '2024-04-05T21:52:40+00:00',
  openGraph: {
    type: 'article',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'Industrial Floor Systems',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Industrial Floor Systems', href: '/industrial-flooring/' },
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
