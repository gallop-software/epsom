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

const pattern = '/uploads/2021/02/dot-wave-sec-1.svg'

export default function Courts() {
  return (
    <StickyScroll>
      <StickyImage
        src="/placeholder.png"
        alt="Pickleball Court Builders"
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
          Pickleball Court Builders
        </Heading>
        <Paragraph
          fontSize="text-lg"
          color="text-overlay-text"
        >
          Pickleball keeps growing, and Bedrock can help your facility keep up
          with courts built for steady, regular use. We lay tough acrylic
          surfaces that ask for little upkeep and play well inside a gym or out
          in the open air. Players get a predictable bounce and sure footing,
          and you get a court that is simple to look after. Whether your group
          plays for fun or keeps score in league games, we can set up the colors
          and surface to suit how you play.
        </Paragraph>
        <Buttons>
          <Button
            href="#our-courts"
            textColor="text-contrast"
          >
            See the Features
          </Button>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/placeholder.png"
        alt="Pickleball Court Builders"
      />
      <ScrollPanel>
        <Heading
          as="h2"
          id="our-courts"
        >
          Every court we build is…
        </Heading>
        <List spacing="medium">
          <Li>
            Made to take regular, heavy play and keep its good looks for the
            long haul.
          </Li>
          <Li>
            Finished with a texture that holds its grip under quick feet.
          </Li>
          <Li>
            Simple to look after, with far less upkeep than a lawn or clay
            surface.
          </Li>
          <Li>
            A good fit for every player, from first-timers to seasoned league
            regulars.
          </Li>
          <Li>
            Surfaced with a little cushion that feels easier on knees and
            ankles.
          </Li>
          <Li>
            Set up the way you want to play, with a surface tuned to your group.
          </Li>
          <Li>Coated with acrylic products chosen for serious, regular play.</Li>
        </List>
        <Spacer height="h-7.5" />
        <Buttons>
          <CalendlyButton textColor="text-contrast">
            Book a Free Estimate
          </CalendlyButton>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/placeholder.png"
        alt="Finished Pickleball Court"
      />
      <ScrollPanel
        highlight
        bgColor="bg-accent"
        pattern={pattern}
      >
        <Heading as="h2">Tough Acrylic Courts</Heading>
        <Paragraph
          fontSize="text-xl"
          color="text-contrast-light"
        >
          A Bedrock court looks as good as it plays, with a clean surface that
          feels steady and comfortable underfoot. Pick bright colors and line
          layouts that suit your gym, park or backyard and make the space your
          own. Then step out on a court that is ready for regular games and open
          to new players and old hands alike.
        </Paragraph>
      </ScrollPanel>
    </StickyScroll>
  )
}
