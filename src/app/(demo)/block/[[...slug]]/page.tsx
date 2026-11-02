import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LightboxWrapper } from '@/components/lightbox-wrapper'
import clsx from 'clsx'
import { blockImports, blockSlugs } from './_block-index'

// Block previews are thin, repeated fragments: keep them out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{
    slug?: string[]
  }>
}

function getSlugPath(slug?: string[]): string | null {
  // If no slug or empty slug array, return null to trigger 404
  if (!slug || slug.length === 0) {
    return null
  }
  // Decode then re-encode to lowercase to match actual filenames
  const normalizedSlug = slug.map((segment) => {
    // First decode in case it's already encoded, then encode to lowercase
    const decoded = decodeURIComponent(segment)
    return encodeURIComponent(decoded).toLowerCase()
  })
  // Join slug parts with '/' for nested routes
  return normalizedSlug.join('/')
}

// Generate static params for all blocks from the index
export async function generateStaticParams() {
  return blockSlugs.map((slug) => ({
    slug: slug.split('/'),
  }))
}

// This makes the route optional, so it can handle both "/" and "/slug"
export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const slugPath = getSlugPath(slug)

  // If no slug provided, show 404
  if (!slugPath || typeof slugPath !== 'string') {
    notFound()
  }

  const importFn = blockImports[slugPath]
  if (!importFn) {
    notFound()
  }

  const { default: Content } = await importFn()

  return (
    // overflow-clip, not overflow-hidden: hidden makes this the scroll container,
    // which stops sticky blocks from sticking. No header here, so no header offset.
    <div className="overflow-clip [--spacing-header:0px]">
      <main
        className={clsx(
          '[&>.content-wrapper]:px-6 [&>.content-wrapper]:lg:px-8 [&>.content-wrapper]:mx-auto [&>.content-wrapper]:max-w-3xl',
          '[&>.aligncontent]:px-6 [&>.aligncontent]:lg:px-8 [&>.aligncontent]:mx-auto [&>.aligncontent]:max-w-3xl',
          '[&>*:last-child:not(div):not(section)]:mb-40 [&>*:last-child:is(.content-wrapper)]:mb-40'
        )}
      >
        <LightboxWrapper>
          <Content />
        </LightboxWrapper>
      </main>
    </div>
  )
}
