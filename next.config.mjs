/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include TSX files
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Every route and link ends in a slash.
  trailingSlash: true,
  // Optionally, add any other Next.js config below
  images: {
    // Image optimization for local images
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      // /schedule/ opens the home page with the Calendly popup open (the navbar
      // handles ?action=schedule).
      {
        source: '/schedule/',
        destination: '/?action=schedule',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

// Cloudflare Workers (OpenNext) — enables getCloudflareContext()/bindings during
// `next dev`. No-op in production builds, so Vercel is unaffected.
import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev())
