'use client'

import { ErrorContent } from '@/components/error-content'
import { Navbar } from '@/components/navbar'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <>
      <Navbar />
      <main className="wrap-break-word lg:pt-header">
        <ErrorContent reset={reset} />
      </main>
    </>
  )
}
