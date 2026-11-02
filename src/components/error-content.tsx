'use client'

import { buttonClasses } from '@/components/button'
import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'

/** Error page body with a retry button. */
export function ErrorContent({ reset }: { reset: () => void }) {
  return (
    <Container className="py-25 text-center">
      <Heading
        as="h1"
        textAlign="text-center"
      >
        We Hit a Snag
      </Heading>
      <Paragraph>
        Something broke on our end. Give it a moment and try once more.
      </Paragraph>
      <Buttons justify="justify-center">
        <button
          type="button"
          onClick={reset}
          className={buttonClasses({})}
        >
          Retry Page
        </button>
      </Buttons>
    </Container>
  )
}
