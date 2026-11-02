import { PageHeader } from '@/components/page-header'
import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Questions from './_blocks/questions'

function Content() {
  return (
    <>
      <PageHeader>FAQ</PageHeader>
      <Questions />
    </>
  )
}

const metadata: PageMetadata = {
  title: 'FAQ - Bedrock Flooring',
  path: '/faq/',
  publishDate: '2026-02-03T14:33:00+00:00',
  modifiedDate: '2026-02-03T14:33:00+00:00',
  openGraph: { type: 'article' },
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'FAQ', href: '/faq/' },
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
