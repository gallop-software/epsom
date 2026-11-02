import { PageHeader } from '@/components/page-header'
import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import Details from './_blocks/details'
import ContactForm from './_blocks/contact-form'

function Content() {
  return (
    <>
      <PageHeader>Contact</PageHeader>
      <Details />
      <ContactForm />
    </>
  )
}

const metadata: PageMetadata = {
  title: 'Talk to a Concrete Floor Contractor - Bedrock Flooring',
  path: '/contact/',
  description:
    'Call Bedrock Flooring to set up a free estimate. We will come look at your slab, talk through your options and share straight advice.',
  publishDate: '2021-02-02T04:15:38+00:00',
  modifiedDate: '2021-05-18T13:58:45+00:00',
  openGraph: {
    type: 'article',
    image: { url: '/placeholder.png', type: 'image/png' },
  },
  // Yoast gave this page a share image but no primary image
  primaryImage: false,
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact/' },
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
