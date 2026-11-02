import { Heading } from '@/components/heading'
import { HeroBanner } from '@/components/hero-banner'

export default function Hero() {
  return (
    <HeroBanner
      downLink="#feature"
      image="/heroes/hero-food-service.jpg"
      overlayColor="bg-contrast-light"
    >
      <Heading
        as="h1"
        color="text-overlay-text"
        textAlign="text-center"
        className="mx-auto max-w-[750px]"
      >
        Food Service Floor Systems
      </Heading>
    </HeroBanner>
  )
}
