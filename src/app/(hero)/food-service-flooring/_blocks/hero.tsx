import { Heading } from '@/components/heading'
import { HeroVideo } from '@/components/hero-video'
import { PlayButton } from '@/components/play-button'

export default function Hero() {
  return (
    <HeroVideo
      video="/videos/placeholder-loop.mp4"
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
      <PlayButton href="#food-service-video" />
    </HeroVideo>
  )
}
