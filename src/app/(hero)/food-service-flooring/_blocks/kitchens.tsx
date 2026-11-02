import { Button } from '@/components/button'
import { Buttons } from '@/components/buttons'
import { CalendlyButton } from '@/components/calendly-button'
import { Heading } from '@/components/heading'
import { Li, List } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Spacer } from '@/components/spacer'
import {
  ScrollPanel,
  StickyImage,
  StickyScroll,
} from '@/components/sticky-scroll'

const pattern = '/patterns/dot-wave-sec-1.svg'

export default function Kitchens() {
  return (
    <StickyScroll>
      <StickyImage
        src="/content/f01-kitchen-line.jpg"
        alt="Food Service Floor Systems"
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
          Food Service Floor Systems
        </Heading>
        <Paragraph
          fontSize="text-lg"
          color="text-overlay-text"
        >
          Food service work is hard on a slab, and Bedrock can help your kitchen
          keep up with floors built for steady, daily use. We lay tough resin
          surfaces that ask for little upkeep and work well in a restaurant, a
          prep room or a walk-in cooler. Cooks get sure footing on a textured
          surface, and you get a floor that is simple to look after. Whether you
          run a small cafe or a busy brewery, we can set up the colors and
          texture to suit how you work.
        </Paragraph>
        <Buttons>
          <Button
            href="#our-kitchens"
            textColor="text-contrast"
          >
            See the Features
          </Button>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/content/f08-bakery.jpg"
        alt="Food Service Floor Systems"
      />
      <ScrollPanel>
        <Heading
          as="h2"
          id="our-kitchens"
        >
          Every floor we build is…
        </Heading>
        <List spacing="medium">
          <Li>
            Made to take daily kitchen traffic and keep its good looks for the
            long haul.
          </Li>
          <Li>Finished with a texture that holds its grip under quick feet.</Li>
          <Li>
            Simple to look after, with routine mopping and washdowns at closing
            time.
          </Li>
          <Li>
            A good fit for every room, from the dining area to the walk-in
            cooler and dock.
          </Li>
          <Li>
            Surfaced to feel steady and sure underfoot through a long, busy
            shift.
          </Li>
          <Li>
            Set up the way you want to work, with a surface tuned to your
            kitchen.
          </Li>
          <Li>
            Coated with resin products chosen for serious, regular kitchen use.
          </Li>
        </List>
        <Spacer height="h-7.5" />
        <Buttons>
          <CalendlyButton textColor="text-contrast">
            Book a Free Estimate
          </CalendlyButton>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/content/f09-dish-area.jpg"
        alt="Finished Food Service Floor"
      />
      <ScrollPanel
        highlight
        bgColor="bg-accent"
        pattern={pattern}
      >
        <Heading as="h2">Tough Kitchen Floors</Heading>
        <Paragraph
          fontSize="text-xl"
          color="text-contrast-light"
        >
          A Bedrock floor looks as good as it works, with a clean surface that
          feels steady and comfortable underfoot. Pick bright colors and
          finishes that suit your restaurant, kitchen or brewery and make the
          space your own. Then step out on a floor that is ready for the regular
          rush and open to new cooks and old hands alike.
        </Paragraph>
      </ScrollPanel>
    </StickyScroll>
  )
}
