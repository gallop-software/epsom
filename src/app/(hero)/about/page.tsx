import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Hero from './_blocks/hero'
import Intro from './_blocks/intro'
import Story from './_blocks/story'
import Brands from './_blocks/brands'
import Cta from './_blocks/cta'

function Content() {
  return (
    <>
      <Hero />
      <Intro />
      <Story />
      <Brands />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title: 'About Bedrock Flooring - Your Red Mesa Concrete Floor Crew',
  path: '/about/',
  description:
    'Meet Bedrock Flooring, the Red Mesa, Texas crew that puts down polished, epoxy and resinous concrete floors with straight talk and careful work.',
  publishDate: '2026-02-02T04:14:01+00:00',
  modifiedDate: '2026-02-02T04:14:01+00:00',
  openGraph: {
    type: 'article',
    image: {
      url: '/content/c04-venue.jpg',
      type: 'image/jpeg',
      caption: 'Polished Concrete Office Floor in Red Mesa, TX',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about/' },
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
