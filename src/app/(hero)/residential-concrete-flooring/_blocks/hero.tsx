import { Heading } from '@/components/heading'
import { HeroVideo } from '@/components/hero-video'

export default function Hero() {
  return (
    <HeroVideo
      video="/videos/placeholder-loop.mp4"
      caption="Coating a garage floor"
      downLink="#video"
    >
      <Heading
        as="h1"
        color="text-overlay-text"
        textAlign="text-center"
        className="mx-auto max-w-[750px]"
      >
        Concrete Floors for Your Home
      </Heading>
    </HeroVideo>
  )
}
