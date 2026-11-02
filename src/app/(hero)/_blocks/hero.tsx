import { Button } from '@/components/button'
import { Buttons } from '@/components/buttons'
import { Heading } from '@/components/heading'
import { HeroVideo } from '@/components/hero-video'
import { PlayButton } from '@/components/play-button'
import { TypewriterHeading } from '@/components/typewriter-heading'

export default function Hero() {
  return (
    <HeroVideo
      video="/videos/placeholder-loop.mp4"
      caption="Working Out of Red Mesa, Texas"
    >
      <Heading
        as="h3"
        styleAs="h4"
        color="text-overlay-text"
        textAlign="text-center"
      >
        concrete floors done right
      </Heading>
      <TypewriterHeading
        word="Bedrock"
        words={[
          'Diamond-Polished',
          'Garage Epoxy',
          'Epoxy-Chip',
          'Resinous',
          'Sealed Concrete',
          'Retail Store',
          'Commercial',
          'Stained Concrete',
          'Warehouse',
          'Aviation',
          'Sports Court',
        ]}
        after="Flooring"
        startDelay={1500}
      />
      <Buttons justify="justify-center">
        <Button
          href="/residential-concrete-flooring/"
          offset="light"
        >
          Home & Garage Floors
        </Button>
        <Button
          href="/commercial-concrete-flooring/"
          color="accent2"
        >
          Commercial Floors
        </Button>
        <Button
          href="/aviation-flooring/"
          variant="outline"
          color="body"
          offset="light"
        >
          Aviation Floors
        </Button>
      </Buttons>
      <PlayButton href="#commercial-video" />
    </HeroVideo>
  )
}
