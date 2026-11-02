import { Buttons } from '@/components/buttons'
import { CalendlyButton } from '@/components/calendly-button'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'

/** The navy "Schedule A Free Estimate" band that closes most pages. */
export function EstimateCta({
  patternOpacity = 'opacity-40',
}: {
  /** Opacity class of the dot-wave pattern. */
  patternOpacity?: string
}) {
  return (
    <Section
      className="bg-accent2 px-col-5 py-col-30 text-overlay-text"
      maxWidth="max-w-[1600px]"
      imageSrc="/patterns/dot-wave-sec-1.svg"
      imageClassName={patternOpacity}
    >
      <Heading
        as="h2"
        styleAs="h1"
        color="text-overlay-text"
        textAlign="text-center"
      >
        Book Your Free Estimate
      </Heading>
      <Heading
        as="h4"
        color="text-overlay-text"
        textAlign="text-center"
      >
        Thinking About a Better Concrete Floor?
      </Heading>
      <Paragraph
        fontSize="text-lg"
        textAlign="text-center"
        className="mx-auto max-w-[700px]"
      >
        Bedrock Flooring offers coatings and finishes for all kinds of concrete
        floors. We work with proven materials to give you a floor that looks
        current and holds up to daily use. Reach out and we will talk through
        your space, answer your questions, and put together a free quote.
      </Paragraph>
      <Buttons
        justify="justify-center"
        margin="mb-6"
      >
        <CalendlyButton offset="light">
          Book My Free Estimate Today
        </CalendlyButton>
      </Buttons>
    </Section>
  )
}
