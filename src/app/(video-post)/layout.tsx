import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { MobileCta } from '@/components/navbar/mobile-cta'

/** Video posts: the white header and a plain title band (no featured-image band). */
export default function VideoPostLayout({
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
