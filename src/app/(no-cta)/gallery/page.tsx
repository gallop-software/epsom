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
  publishDate: '2026-02-02T04:19:19+00:00',
  modifiedDate: '2026-02-02T04:19:19+00:00',
  openGraph: {
    type: 'article',
    image: { url: '/content/c01-showroom.jpg', type: 'image/jpeg' },
  },
  // The primary image is the first gallery photo, not the share image
  primaryImage: { url: '/content/c01-showroom.jpg' },
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
