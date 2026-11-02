import { ElegantHeading } from '@/components/elegant-heading'
import { LogoGallery } from '@/components/logo-gallery'

/** "Brands with Bedrock Floors": client logos shown on the home and About pages (fictional demo brands). */
export function Brands() {
  return (
    <>
      <ElegantHeading
        bold="Standing"
        light="on Bedrock Floors"
        margin="mt-25 mb-20"
      />
      <LogoGallery
        logos={[
          { src: '/brand/client-01.png', alt: 'Harvest Markets' },
          { src: '/brand/client-02.png', alt: 'Homestead Supermarkets' },
          { src: '/brand/client-03.png', alt: 'Trailhead Powersports' },
          { src: '/brand/client-04.png', alt: 'Summit Motors' },
          { src: '/brand/client-05.png', alt: 'Mesa Court Hotel' },
          { src: '/brand/client-06.png', alt: 'Stone Ridge Winery' },
          { src: '/brand/client-07.png', alt: 'Cluck & Co.' },
          { src: '/brand/client-08.png', alt: 'Prairie Farm Supply' },
          { src: '/brand/client-09.png', alt: 'Mesa Electric Co-op' },
          { src: '/brand/client-10.png', alt: 'Touchdown Grill' },
        ]}
      />
    </>
  )
}
