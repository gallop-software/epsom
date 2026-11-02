import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Gallery from './_blocks/gallery'

function Content() {
  return <Gallery />
}

const metadata: PageMetadata = {
  title: 'Finished Floors Gallery - Bedrock Flooring',
  path: '/gallery/',
  description:
    'Thinking about a new finish for your shop, business or garage? Browse photos of concrete floors and coatings to see what could work for you.',
  publishDate: '2021-02-02T04:19:19+00:00',
  modifiedDate: '2022-04-16T15:16:49+00:00',
  openGraph: {
    type: 'article',
    image: { url: '/placeholder.png', type: 'image/png' },
  },
  // Yoast's primary image is the first gallery photo, not the share image
  primaryImage: { url: '/placeholder.png' },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery/' },
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
