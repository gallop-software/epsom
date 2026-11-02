import { Button } from '@/components/button'
import { Buttons } from '@/components/buttons'
import { CalendlyButton } from '@/components/calendly-button'
import { Heading } from '@/components/heading'
import { Li, List } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Quote } from '@/components/quote'
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
        caption="Polished concrete showroom floor, Red Mesa, TX"
      />
      <ScrollPanel
        highlight
        bgColor="bg-accent2"
        pattern={pattern}
        patternOpacity="opacity-20"
      >
        <Heading
          as="h2"
          color="text-overlay-text"
          textAlign="text-left"
        >
          Looking for a tougher, cleaner floor for your plant, shop or
          storefront?
        </Heading>
        <Paragraph
          fontSize="text-lg"
          color="text-overlay-text"
        >
          Bedrock puts down floors built for the way businesses actually run.
          Polished concrete suits showrooms, offices, event spaces, production
          areas and most other working interiors. For restaurant kitchens and
          food prep rooms, we install resinous systems that stand up to hard
          daily use and wipe clean at the end of a shift. Tell us how the space
          gets used, and we will point you to the system that fits your budget
          and your day-to-day.
        </Paragraph>
        <Buttons>
          <Button href="#polished-concrete-options">See Your Options</Button>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/placeholder.png"
        caption="Polished concrete grocery aisle, Red Mesa, TX"
        captionAlign="left"
      />
      <ScrollPanel>
        <Heading
          as="h2"
          id="polished-concrete-options"
        >
          See What Polished Concrete Can Do for You
        </Heading>
        <Paragraph fontSize="text-lg">
          Want a floor that looks sharp and asks very little of your staff? We
          start by grinding the slab, then step through finer diamond tooling
          while a chemical hardener densifies the surface. The result is a
          bright, clean finish that pays you back over the long haul. Because
          nothing sits on top of the slab, there is no coating to peel. You will
          find it in stores, dining rooms, gyms and home workshops.
        </Paragraph>
        <Paragraph>
          <strong>What you get with a polished floor:</strong>
        </Paragraph>
        <List>
          <Li>Tough&nbsp;and&nbsp;long&nbsp;wearing</Li>
          <Li>Good&nbsp;traction&nbsp;underfoot</Li>
          <Li>Brightens&nbsp;the&nbsp;whole&nbsp;room</Li>
          <Li>Shrugs&nbsp;off&nbsp;spills&nbsp;and&nbsp;scuffs</Li>
          <Li>Stands&nbsp;up&nbsp;to&nbsp;hard&nbsp;knocks</Li>
          <Li>
            Simple
            upkeep.&nbsp;Forget&nbsp;the&nbsp;strip&nbsp;and&nbsp;wax&nbsp;routine
          </Li>
          <Li>
            Far&nbsp;harder&nbsp;wearing
            than&nbsp;a&nbsp;bare,&nbsp;unpolished&nbsp;slab
          </Li>
        </List>
        <Quote cite="– Priya S., Store Manager">
          <Paragraph>
            Our doors stayed open for the whole job, and the new floor has taken
            everything our busy aisles can dish out so far.
          </Paragraph>
        </Quote>
        <Buttons>
          <CalendlyButton>Request Your Free Estimate</CalendlyButton>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/placeholder.png"
        caption="Epoxy mortar coating on a shop floor, Red Mesa, TX"
      />
      <ScrollPanel>
        <Heading as="h2">Is a Resinous Coating Right for You?</Heading>
        <Paragraph>
          When a room sees constant traffic and has to stay safe and spotless, a
          resinous coating is a strong answer.&nbsp; These seamless systems work
          well in production areas, restaurant kitchens, animal clinics,
          changing rooms and public washrooms.
        </Paragraph>
        <Paragraph>
          <strong>Why customers pick resinous systems:</strong>
        </Paragraph>
        <List>
          <Li>Long wearing</Li>
          <Li>Takes hard hits</Li>
          <Li>No joints or seams</Li>
          <Li>Sure grip</Li>
          <Li>Keeps spills on top</Li>
          <Li>Quick to wipe down</Li>
          <Li>
            Quartz systems are made to hold their finish without peeling.&nbsp;
          </Li>
        </List>
        <Buttons>
          <CalendlyButton href="/contact/">
            Talk to Us About Your Floor
          </CalendlyButton>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/placeholder.png"
        alt="Polished concrete in a commercial space"
        caption="Polished concrete office lobby, Red Mesa, TX"
        captionAlign="left"
      />
      <ScrollPanel
        highlight
        bgColor="bg-accent"
        pattern={pattern}
      >
        <Heading as="h2">Color Stained and Polished Floors</Heading>
        <Paragraph
          fontSize="text-lg"
          color="text-contrast"
        >
          Stain opens up a huge range of looks that paint and tile cannot match.
          It soaks into the slab instead of sitting on top, which gives the
          color real depth and a glow you can see through. Pick from a wide
          palette, then choose a water-based or acid-based stain to suit the
          result you want, whether that is aged and weathered, softly marbled,
          gently blotched or one even tone across the room.
        </Paragraph>
        <Spacer height="h-[54px]" />
      </ScrollPanel>
    </StickyScroll>
  )
}
