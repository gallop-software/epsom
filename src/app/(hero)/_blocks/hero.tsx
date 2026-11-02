import { Button } from '@/components/button'
import { Buttons } from '@/components/buttons'
import { Heading } from '@/components/heading'
import { HeroBanner } from '@/components/hero-banner'
import { TypewriterHeading } from '@/components/typewriter-heading'

export default function Hero() {
  return (
    <HeroBanner
      downLink="#feature"
      image="/heroes/hero-home.jpg"
      video="/videos/hero-home-hls/master.m3u8"
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
          'Polished',
          'Garage Epoxy',
          'Epoxy-Chip',
          'Resinous',
          'Sealed',
          'Retail Store',
          'Commercial',
          'Stained',
          'Warehouse',
          'Industrial',
          'Food Service',
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
          href="/industrial-flooring/"
          variant="outline"
          color="body"
          offset="light"
        >
          Industrial Floors
        </Button>
      </Buttons>
    </HeroBanner>
  )
}
