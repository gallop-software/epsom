import { Button } from '@/components/button'
import { Buttons } from '@/components/buttons'
import { Heading } from '@/components/heading'
import { Li, List } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Spacer } from '@/components/spacer'
import {
  ScrollPanel,
  StickyImage,
  StickyScroll,
} from '@/components/sticky-scroll'

const pattern = '/uploads/2021/02/dot-wave-sec-1.svg'

export default function FloorTypes() {
  return (
    <StickyScroll>
      <StickyImage
        src="/placeholder.png"
        alt="Epoxy-chip coating on an aircraft hangar floor"
        caption="Chip Finish"
      />
      <ScrollPanel
        highlight
        bgColor="bg-accent2"
        pattern={pattern}
      >
        <Heading
          as="h2"
          id="more"
          color="text-overlay-text"
        >
          Coatings Built For Hangars
        </Heading>
        <Paragraph
          fontSize="text-lg"
          color="text-overlay-text"
        >
          We design hangar floors around what actually happens on them: heavy
          aircraft, loaded carts, tugs and the occasional fluid spill. Bedrock
          Flooring puts footing first, with slip-resistant textures that help
          people and equipment move safely. Pick a glossy polish or a textured
          coat and set the look you want for the hangar without giving up
          day-to-day function. Every floor we offer is simple to care for and
          made for years of steady work.
        </Paragraph>
        <Buttons>
          <Button
            href="#benefits"
            color="body"
            textColor="text-accent2"
          >
            See the Benefits
          </Button>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/placeholder.png"
        alt="Epoxy-chip coating on an aircraft hangar floor"
      />
      <ScrollPanel>
        <Heading
          as="h2"
          id="benefits"
        >
          Time to freshen up your hangar?
        </Heading>
        <Paragraph>
          A Bedrock floor gives you strength, easy care and clean style all at
          once. It holds up under daily traffic, keeps stains from setting in,
          and bounces light around the room, so the whole hangar feels brighter,
          roomier and better kept from the day we finish the job.
        </Paragraph>
        <Paragraph>
          <strong>What you get with a Bedrock hangar floor…</strong>
        </Paragraph>
        <List>
          <Li>Tough Under Load</Li>
          <Li>Easy To Care For</Li>
          <Li>Shrugs off stains and tire marks</Li>
          <Li>Handles spills</Li>
          <Li>Sure footing</Li>
          <Li>Made To Last</Li>
          <Li>Good Value</Li>
        </List>
        <Spacer height="h-7.5" />
        <Buttons>
          <Button
            href="#form"
            color="accent2"
          >
            Ready to Upgrade Your Hangar?
          </Button>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/placeholder.png"
        alt="polished concrete floor inside an aircraft hangar"
        caption="Polished Slab"
      />
      <ScrollPanel
        highlight
        bgColor="bg-accent"
        pattern={pattern}
      >
        <Heading as="h2">
          A hangar floor that never goes out of style
        </Heading>
        <Paragraph
          fontSize="text-xl"
          color="text-contrast-light"
        >
          A Bedrock hangar floor pairs real toughness with a look you can
          tailor, from sleek gloss to subtle texture. We help you pick the
          colors and finishes that turn a plain working space into a showpiece,
          so the room looks every bit as well kept as the aircraft parked inside
          it when guests come through.
        </Paragraph>
      </ScrollPanel>
    </StickyScroll>
  )
}
