import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Header from './_blocks/header'

function Content() {
  return <Header />
}

const metadata: PageMetadata = {
  title: 'Book a Free Estimate - Bedrock Flooring',
  path: '/schedule-free-estimate/',
  publishDate: '2026-02-02T04:21:28+00:00',
  modifiedDate: '2026-02-02T04:21:28+00:00',
  openGraph: { type: 'article' },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Book a Free Estimate', href: '/schedule-free-estimate/' },
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
