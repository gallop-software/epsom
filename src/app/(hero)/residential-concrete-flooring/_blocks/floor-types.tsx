import { Button } from '@/components/button'
import { Buttons } from '@/components/buttons'
import { CalendlyButton } from '@/components/calendly-button'
import { Heading } from '@/components/heading'
import { Li, List } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Quote } from '@/components/quote'
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
        alt="Epoxy-coated floor at a home"
        caption="Epoxy-chip back patio, Red Mesa, TX"
      />
      <ScrollPanel
        highlight
        bgColor="bg-accent2"
        pattern={pattern}
        patternOpacity="opacity-20"
      >
        <Heading
          as="h1"
          color="text-overlay-text"
          textAlign="text-left"
        >
          Concrete Coatings for Your Home
        </Heading>
        <Paragraph
          fontSize="text-xl"
          color="text-overlay-text"
        >
          More homeowners are choosing coated concrete over carpet and tile.
          Epoxy-chip finishes, clear sealers and coated patios all bring a
          clean, finished look to the house and the yard. Our crew will prepare
          your slab, lay down the finish you pick, and leave you with a floor
          you are proud to show off. New build or older house, we can work with
          it.
        </Paragraph>
      </ScrollPanel>

      <StickyImage
        src="/placeholder.png"
        alt="Epoxy-coated floor at a home"
        caption="Metallic epoxy garage floor, Red Mesa, TX"
        captionAlign="left"
      />
      <ScrollPanel
        highlight
        bgColor="bg-accent"
        pattern={pattern}
      >
        <Heading as="h2">Garage and Shop Floor Crews</Heading>
        <Paragraph
          fontSize="text-xl"
          color="text-contrast"
        >
          Make your <strong>garage</strong> <strong>or shop</strong> a place you want
          to spend time, a real <strong>living space</strong>, with a floor that
          fits how you use it. Pick from stained, sealed, epoxy-coated or polished
          concrete, and we will handle the job from bare slab to final coat.
        </Paragraph>
        <Buttons>
          <Button
            href="#polished-concrete-options"
            color="body"
          >
            See the Benefits
          </Button>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/placeholder.png"
        alt="Polished concrete floor at a home"
        caption="Polished concrete floor in a country cabin"
      />
      <ScrollPanel>
        <Heading
          as="h2"
          id="polished-concrete-options"
        >
          Why coat your garage floor…
        </Heading>
        <List>
          <Li>
            <strong>Easy upkeep:</strong> a mop and plain water handle most messes.
            Dust and grime sit on top instead of settling into the surface.
          </Li>
          <Li>
            <strong>Good value:</strong> Your existing slab does the heavy lifting,
            so there is less to buy and less to tear out. We also plan the work
            around your schedule, so the garage is not tied up for long.
          </Li>
          <Li>
            <strong>Lasting protection:</strong> A coating shields the slab from daily
            wear, which helps keep repair bills down over the years.
          </Li>
          <Li>
            <strong>Your style:</strong> Mix and match epoxy colors and flake blends
            until the floor looks the way you pictured it from the start.
          </Li>
          <Li>
            <strong>Spill protection:</strong> A tough topcoat helps keep motor oil,
            household chemicals, road grime and hot tires from marking the floor.
          </Li>
        </List>
        <Quote cite="– Nora B., Homeowner">
          <Paragraph>
            Easy to work with from start to finish. The crew did what they
            promised, and I would call them again.
          </Paragraph>
        </Quote>
        <Buttons>
          <CalendlyButton>Request Your Free Estimate</CalendlyButton>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/placeholder.png"
        caption="Epoxy-chip garage floor, Red Mesa, TX"
        captionAlign="left"
      />
      <ScrollPanel
        highlight
        bgColor="bg-accent2"
        pattern={pattern}
      >
        <Heading
          as="h2"
          color="text-overlay-text"
        >
          DECORATIVE CONCRETE WITH CHARACTER
        </Heading>
        <Paragraph
          fontSize="text-xl"
          color="text-overlay-text"
        >
          Give plain concrete the warmth and polish of a high-end floor. Go for a
          rustic scored layout in several shades, a single clean stain color, or
          a one-of-a-kind pattern, and we will work with you until it looks right.
          Indoors or out, <strong>Bedrock Flooring</strong>{' '}
          delivers a finish that shrugs off everyday spills and stays simple to
          keep clean. We top the work with protective sealers that help guard the
          color against sun and wear, so the finished surface keeps looking good.
        </Paragraph>
      </ScrollPanel>
    </StickyScroll>
  )
}
