import { Heading } from '@/components/heading'
import { Li, List } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import {
  ScrollPanel,
  StickyImage,
  StickyScroll,
} from '@/components/sticky-scroll'

export default function Story() {
  return (
    <StickyScroll>
      <StickyImage
        src="/placeholder.png"
        caption="Concrete Polished with Diamond Tooling"
      />
      <ScrollPanel>
        <Heading as="h2">What We Install</Heading>
        <Paragraph>
          Every floor we put down starts with a sound slab and a clear plan.
          These are the systems our crews know best and install most often
          around Red Mesa.
        </Paragraph>
        <List margin="mb-0">
          <Li>Diamond-Polished Floors</Li>
          <Li>Resinous&nbsp;Floor Coatings</Li>
          <Li>Home Garage Coatings</Li>
          <Li>Sealed and Stained Slabs</Li>
          <Li>Epoxy for Shops and Bays</Li>
        </List>
      </ScrollPanel>

      <StickyImage
        src="/placeholder.png"
        caption="Seamless High-Build Coating in a Shop"
        captionAlign="left"
      />
      <ScrollPanel>
        <Heading as="h2">How We Operate</Heading>
        <Paragraph>
          The way we treat people matters as much as the floor we leave behind.
          Everyone on our crew is expected to bring these four habits to each
          job, large or small.
        </Paragraph>
        <List margin="mb-0">
          <Li>Responsibility</Li>
          <Li>Honesty</Li>
          <Li>Energy</Li>
          <Li>Drive</Li>
        </List>
      </ScrollPanel>
    </StickyScroll>
  )
}
