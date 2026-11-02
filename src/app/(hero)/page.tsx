import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Hero from './_blocks/hero'
import Videos from './_blocks/videos'
import Services from './_blocks/services'
import FloorTypes from './_blocks/floor-types'
import Cta from './_blocks/cta'
import RecentProjects from './_blocks/recent-projects'
import About from './_blocks/about'
import Brands from './_blocks/brands'

function Content() {
  return (
    <>
      <Hero />
      <Videos />
      <Services />
      <FloorTypes />
      <Cta />
      <RecentProjects />
      <About />
      <Brands />
    </>
  )
}

const metadata: PageMetadata = {
  title: 'Bedrock Flooring - Concrete Floors Built for Red Mesa, Texas',
  path: '/',
  description:
    'Bedrock Flooring installs polished, epoxy and resinous concrete floors for homes and businesses in Red Mesa, Texas and the surrounding area.',
  publishDate: '2021-02-02T04:05:56+00:00',
  modifiedDate: '2024-04-04T20:10:14+00:00',
  openGraph: {
    type: 'website',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
    },
  },
  breadcrumbs: [{ name: 'Home', href: '/' }],
}

export const generateMetadata = () => generatePageMetadata(metadata)

export default function Page() {
  return (
    <PageWrapper metadata={metadata}>
      <Content />
    </PageWrapper>
  )
}
