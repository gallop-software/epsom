import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Hero from './_blocks/hero'
import Video from './_blocks/video'
import Benefits from './_blocks/benefits'
import Courts from './_blocks/courts'
import Gallery from './_blocks/gallery'
import Process from './_blocks/process'
import Cta from './_blocks/cta'

function Content() {
  return (
    <>
      <Hero />
      <Video />
      <Benefits />
      <Courts />
      <Gallery />
      <Process />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title: 'Pickleball Court Builders - Bedrock Flooring',
  path: '/pickleball-court-installers/',
  description:
    'Pickleball courts built in Red Mesa for schools, parks, clubs and backyards. Made for the weather, simple to care for, your colors.',
  publishDate: '2024-04-11T16:07:15+00:00',
  modifiedDate: '2024-06-03T15:36:55+00:00',
  openGraph: {
    type: 'article',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'Pickleball Court Builders',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    {
      name: 'Pickleball Court Builders',
      href: '/pickleball-court-installers/',
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
