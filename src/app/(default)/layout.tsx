import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { MobileCta } from '@/components/navbar/mobile-cta'

/** Pages with the white header; content starts below the fixed bar. */
export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <main className="wrap-break-word lg:pt-header">{children}</main>
      <Footer />
      <MobileCta />
    </>
  )
}
