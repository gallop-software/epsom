import { Button } from '@/components/button'
import { Buttons } from '@/components/buttons'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'
import { Spacer } from '@/components/spacer'

export default function About() {
  return (
    <Section
      className="bg-accent2 px-col-5 text-overlay-text"
      maxWidth="max-w-[1160px]"
      imageSrc="/uploads/2021/02/dot-wave-sec-1.svg"
    >
      <Spacer height="h-25" />
      <Paragraph
        fontSize="text-xl"
        textAlign="text-center"
      >
        <strong>Bedrock Flooring</strong> puts down concrete floors for homes
        and businesses around Red Mesa, Texas. We start by listening, tell you
        plainly what your slab needs, and then do the job the right way with a
        crew that cares how it turns out. Customers call us back because we keep
        our word, keep the site tidy, and follow through from the first visit to
        the final walkthrough.
      </Paragraph>
      <Spacer height="h-[23px]" />
      <Buttons justify="justify-center">
        <Button
          href="/about/"
          offset="light"
        >
          Meet Bedrock
        </Button>
      </Buttons>
      <Spacer height="h-25" />
    </Section>
  )
}
