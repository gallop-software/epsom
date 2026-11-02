import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Hero from './_blocks/hero'
import Video from './_blocks/video'
import Benefits from './_blocks/benefits'
import Kitchens from './_blocks/kitchens'
import Gallery from './_blocks/gallery'
import Process from './_blocks/process'
import Cta from './_blocks/cta'

function Content() {
  return (
    <>
      <Hero />
      <Video />
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
  publishDate: '2024-04-11T16:07:15+00:00',
  modifiedDate: '2024-06-03T15:36:55+00:00',
  openGraph: {
    type: 'article',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
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
