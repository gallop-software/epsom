export const baseURL =
  process.env.NEXT_PUBLIC_PRODUCTION_URL || 'http://localhost:3000'

export const siteName = 'Bedrock Flooring'
export const siteDescription =
  'Polished Concrete and Resinous Floors, Installed Right'

export const siteLogo = '/brand/logo-white.png'

// Share image for pages without their own: the logo on navy, 1200×630.
export const siteShareImage = '/brand/share.jpg'

export const defaultSEOConfig = {
  creator: siteName,
  publisher: siteName,
  // Emitted as one robots tag.
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
    'max-video-preview': -1,
  },
}

/**
 * Site-wide JSON-LD nodes.
 * Relative ids are prefixed with baseURL and Studio keys under
 * image/logo/url resolve to CDN URLs in PageWrapper.
 */
export const defaultStructuredData: object[] = [
  {
    '@type': 'Organization',
    '@id': '/#organization',
    name: siteName,
    url: '/',
    logo: {
      '@type': 'ImageObject',
      inLanguage: 'en-US',
      '@id': '/#/schema/logo/image/',
      url: siteLogo,
      contentUrl: siteLogo,
      width: 220,
      height: 106,
      caption: siteName,
    },
    image: { '@id': '/#/schema/logo/image/' },
  },
]
