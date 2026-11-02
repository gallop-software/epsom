import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { MobileCta } from '@/components/navbar/mobile-cta'

/**
 * White-header pages without the photo strip above the footer.
 */
export default function NoCtaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <main className="wrap-break-word lg:pt-header">{children}</main>
      <Footer gallery={false} />
      <MobileCta />
    </>
  )
}
