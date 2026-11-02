import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'

/**
 * Navy band that, from 1024px, waits pinned to the bottom of the viewport
 * behind the hero and is revealed as the hero scrolls away.
 */
export default function Intro() {
  return (
    <Section
      id="more"
      className="flex items-center overflow-hidden bg-accent2 px-[5vw] pb-17.5 text-overlay-text sm:pt-17.5 lg:sticky lg:bottom-0 lg:h-screen-header lg:py-0"
      maxWidth="w-full max-w-[750px]"
      imageSrc="/patterns/dot-wave-sec-1.svg"
      imageClassName="opacity-100"
      imageMode="background"
      overlayColor="bg-accent2/50"
    >
      <Heading
        as="h2"
        styleAs="h1"
        id="about"
        color="text-overlay-text"
        textAlign="text-center"
      >
        Who We Are
      </Heading>
      <Heading
        as="h3"
        color="text-overlay-text"
        textAlign="text-center"
      >
        A Red Mesa Crew Focused on Concrete Floors
      </Heading>
      <Paragraph
        fontSize="text-lg"
        textAlign="text-center"
        margin="mb-0"
      >
        <strong>Bedrock Flooring</strong> is a hands-on concrete floor crew in
        Red Mesa, Texas. We look at your slab, explain your options in plain
        language, and give you a floor that fits how the space gets used.
        Homeowners and business owners alike hire us because we show up ready,
        take care with the details, and treat every job site as if it were our
        own.
      </Paragraph>
    </Section>
  )
}
