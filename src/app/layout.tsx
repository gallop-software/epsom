import '@/styles/tailwind.css'
import { _bodyFont } from '@/fonts/body'
import { _headingFont } from '@/fonts/heading'
import { _quoteFont } from '@/fonts/quote'
import type { Metadata } from 'next'
import IframeHeight from '@/hooks/use-iframe-height'
import SmoothScroll from '@/hooks/smooth-scroll'
import TransitionsReady from '@/hooks/transitions-ready'
import FlowTrace from '@/hooks/flow-trace'
import PageView from '@/hooks/page-view'
import { AdminBarGate } from '@/components/admin-bar-gate'
import { AdminDialogs } from '@/components/admin-dialogs'
import { baseURL, siteName } from './metadata'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  metadataBase: new URL(String(baseURL)),
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    siteName,
    locale: 'en_US',
    type: 'website',
  },
}

const rootStyle = {
  ['--font-body-family' as string]: _bodyFont.style.fontFamily,
  ['--font-heading-family' as string]: _headingFont.style.fontFamily,
  ['--font-quote-family' as string]: _quoteFont.style.fontFamily,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Tracking only where TRACK_ANALYTICS=true (the live site), never on test
  // deploys or local builds.
  const track =
    process.env.NODE_ENV === 'production' &&
    process.env.TRACK_ANALYTICS === 'true'

  return (
    <html
      lang="en-US"
      style={rootStyle}
    >
      <body className="bg-body font-body text-base font-light text-contrast max-lg:mb-12">
        {children}
        <SmoothScroll />
        <TransitionsReady />
        <IframeHeight />
        <FlowTrace />
        <PageView />
        <AdminBarGate />
        <AdminDialogs />
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
      {track && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <GoogleAnalytics
          gaId={String(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS)}
        />
      )}
    </html>
  )
}
