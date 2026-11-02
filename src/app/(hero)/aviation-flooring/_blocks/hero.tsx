import { Heading } from '@/components/heading'
import { HeroVideo } from '@/components/hero-video'
import { PlayButton } from '@/components/play-button'

export default function Hero() {
  return (
    <HeroVideo video="/videos/placeholder-loop.mp4">
      <Heading
        as="h1"
        color="text-overlay-text"
        textAlign="text-center"
        className="mx-auto max-w-[750px]"
      >
        Floors for Aircraft Hangars
      </Heading>
      <PlayButton href="#aviation-video" />
    </HeroVideo>
  )
}
