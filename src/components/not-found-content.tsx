import Link from 'next/link'
import { Container } from '@/components/container'
import { PageHeader } from '@/components/page-header'
import { Paragraph } from '@/components/paragraph'

/** 404 page body: the theme's title band and message. */
export function NotFoundContent() {
  return (
    <>
      <PageHeader>404: Nothing Here</PageHeader>
      <Container className="pb-12.5 [&_a]:highlight-link">
        <Paragraph>
          We could not find anything at this address. It may have moved or been
          taken down. Head over to the <Link href="/">homepage</Link> and pick
          up from there to find what you need.
        </Paragraph>
      </Container>
    </>
  )
}
