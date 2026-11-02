import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { Heading } from '@/components/heading'

/** The title band at the top of the plain (white-header) pages and archives. */
export function PageHeader({
  background = 'bg-body',
  children,
}: {
  /** `bg-body-light` on the blog archives. */
  background?: string
  children: ReactNode
}) {
  return (
    <header className={clsx(background, 'pt-15 pb-12.5 lg:py-20')}>
      <div className="site-wrap">
        <Heading
          as="h1"
          textAlign="text-center"
          margin="mb-5 lg:mx-20 lg:mb-0"
        >
          {children}
        </Heading>
      </div>
    </header>
  )
}
