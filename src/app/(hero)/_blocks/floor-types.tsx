import { Button } from '@/components/button'
import { Buttons } from '@/components/buttons'
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

const pattern = '/patterns/dot-wave-sec-1.svg'

export default function FloorTypes() {
  return (
    <StickyScroll>
      <StickyImage
        src="/content/r02-garage-metallic.jpg"
        caption="Garage Floor in Metallic Epoxy"
      />
      <ScrollPanel
        highlight
        bgColor="bg-accent"
        pattern={pattern}
      >
        <Heading
          as="h2"
          styleAs="h1"
          id="residential-flooring"
          textAlign="text-left"
        >
          Time to Retire That Tired Slab?
        </Heading>
        <Quote iconColor="before:text-body">
          <Paragraph>
            A coated or polished concrete floor, put down by a crew that does
            this every day, guards the slab underneath and makes an old or new
            room look finished.
          </Paragraph>
        </Quote>
        <Buttons>
          <Button
            href="/residential-concrete-flooring/"
            color="body"
          >
            How We Work
          </Button>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/content/c18-salesfloor-chip.jpg"
        caption="Shop Floor in Epoxy Chip"
        captionAlign="left"
      />
      <ScrollPanel>
        <Heading
          as="h2"
          styleAs="h1"
          id="next-deadline"
          className="large-anchor-offset"
        >
          Floors for Home and Garage
        </Heading>
        <div className="[&>:last-child]:mb-0">
          <Spacer height="h-10" />
          <Heading
            as="h3"
            color="text-accent2"
          >
            From garage slabs to patios, Bedrock Flooring has a coating to suit.
          </Heading>
          <Quote cite="– Dana R., Homeowner">
            <Paragraph>
              The Bedrock crew took real care, arrived right on schedule, and
              our old garage floor came out better than we had pictured.
            </Paragraph>
          </Quote>
        </div>
        <Spacer height="h-[73px]" />
        <Buttons>
          <Button href="/residential-concrete-flooring/">
            Explore Our Home and Garage Floors
          </Button>
        </Buttons>
      </ScrollPanel>

      <StickyImage
        src="/content/c02-grocery-aisle.jpg"
        caption="Polished Concrete on a Busy Grocery Sales Floor"
      />
      <ScrollPanel bgColor="bg-body">
        <Heading
          as="h2"
          styleAs="h1"
          id="commercial-flooring"
          textAlign="text-left"
        >
          Floors for Working Businesses
        </Heading>
        <Paragraph>
          When a floor takes constant foot traffic, carts and forklifts, it has
          to stay grippy, safe, and simple to keep clean. We build concrete
          floors for shops, food service kitchens, warehouses, showrooms,
          offices, and plenty of other busy workplaces.
        </Paragraph>
        <Paragraph>What you get with a Bedrock floor:</Paragraph>
        <List>
          <Li>Built to last</Li>
          <Li>Stands up to impacts</Li>
          <Li>Free of seams</Li>
          <Li>Good grip underfoot</Li>
          <Li>Shrugs off stains</Li>
          <Li>Quick to mop</Li>
          <Li>Low upkeep&nbsp;</Li>
        </List>
        <Spacer height="h-7.5" />
        <Buttons>
          <Button href="/commercial-concrete-flooring/">
            See Our Commercial Floor Options
          </Button>
        </Buttons>
        <Quote cite="– Alex P., Site Superintendent">
          <Paragraph>
            I have run plenty of job sites and good flooring crews are hard to
            find. Bedrock follows through, and I send people their way when a
            floor has to be right.
          </Paragraph>
        </Quote>
      </ScrollPanel>

      <ScrollPanel
        highlight
        bgColor="bg-accent"
        pattern={pattern}
      >
        <Heading
          as="h2"
          styleAs="h1"
          textAlign="text-left"
        >
          Floors for Industrial Spaces
        </Heading>
        <Spacer height="h-14" />
        <Heading as="h2">More to come…</Heading>
        <Spacer height="h-14" />
        <Buttons>
          <Button
            href="/industrial-flooring/"
            color="body"
          >
            Read About Our Industrial Floors
          </Button>
        </Buttons>
      </ScrollPanel>
    </StickyScroll>
  )
}
