import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { MobileCta } from '@/components/navbar/mobile-cta'

/** Blog posts: the featured-image title band under a transparent header. */
export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar transparent />
      <main className="wrap-break-word">{children}</main>
      <Footer />
      <MobileCta />
    </>
  )
}
