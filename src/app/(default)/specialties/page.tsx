import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Header from './_blocks/header'

function Content() {
  return <Header />
}

const metadata: PageMetadata = {
  title: 'What We Do - Bedrock Flooring',
  path: '/specialties/',
  publishDate: '2021-02-02T04:15:24+00:00',
  modifiedDate: '2021-05-18T13:58:46+00:00',
  openGraph: { type: 'article' },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'What We Do', href: '/specialties/' },
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
