import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { MobileCta } from '@/components/navbar/mobile-cta'

/** Pages that open with a full-bleed hero under a transparent header. */
export default function HeroLayout({
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
