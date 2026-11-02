import { Heading } from '@/components/heading'
import { HeroBanner } from '@/components/hero-banner'

export default function Hero() {
  return (
    <HeroBanner
      image="/heroes/hero-industrial.jpg"
      downLink="#feature"
    >
      <Heading
        as="h1"
        color="text-overlay-text"
        textAlign="text-center"
        className="mx-auto max-w-[750px]"
      >
        Floors for Industrial Spaces
      </Heading>
    </HeroBanner>
  )
}
