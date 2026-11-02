import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { Content } from './content'

const metadata: PageMetadata = {
  title: 'Garage Floor Coating Time-Lapse - Bedrock Flooring',
  path: '/garage-floor-coating-time-lapse/',
  publishDate: '2021-02-26T16:21:34+00:00',
  modifiedDate: '2022-01-14T03:44:10+00:00',
  date: '2021-02-26T10:21:34',
  author: 'Bedrock Flooring',
  categories: ['Residential Concrete Flooring Projects'],
  featuredImage:
    '/placeholder.png',
  excerpt:
    'Here is a #residentialflooring job sped up, showing a garage floor coating from bare slab to finished surface.',
  video: '/videos/placeholder-video-hls/master.m3u8',
  authors: [{ name: 'Bedrock Flooring' }],
  article: {
    headline: 'Garage Floor Coating Time-Lapse',
    wordCount: 18,
  },
  openGraph: {
    type: 'article',
    description:
      'Here is a #residentialflooring job sped up, showing a garage floor coating from bare slab to finished surface.',
    image: {
      url: '/placeholder.png',
      type: 'image/png',
      caption: 'Garage Floor Coating Time-Lapse',
    },
  },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    {
      name: 'Garage Floor Coating Time-Lapse',
      href: '/garage-floor-coating-time-lapse/',
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
