import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { MobileCta } from '@/components/navbar/mobile-cta'
import { NotFoundContent } from '@/components/not-found-content'

export const metadata: Metadata = {
  title: 'We Could Not Find That Page - Bedrock Flooring',
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="wrap-break-word lg:pt-header">
        <NotFoundContent />
      </main>
      <Footer />
      <MobileCta />
    </>
  )
}
