import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Careers from './_blocks/careers'

function Content() {
  return <Careers />
}

const metadata: PageMetadata = {
  title: 'Jobs at Bedrock Flooring',
  path: '/careers/',
  description:
    'Looking for steady work in the flooring trade? Bedrock Flooring wants people who take pride in the job, and our crews help new hires learn real concrete floor skills on the job.',
  publishDate: '2021-02-02T04:16:04+00:00',
  modifiedDate: '2021-05-18T13:58:44+00:00',
  openGraph: {
    type: 'article',
    image: { url: '/placeholder.png', type: 'image/png' },
  },
  // Yoast gave this page a share image but no primary image
  primaryImage: false,
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Careers', href: '/careers/' },
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
