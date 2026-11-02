import { Buttons } from '@/components/buttons'
import { CalendlyButton } from '@/components/calendly-button'
import { Container } from '@/components/container'
import { Paragraph } from '@/components/paragraph'
import { Quote } from '@/components/quote'
import { Spacer } from '@/components/spacer'

export default function Testimonial() {
  return (
    <>
      <Container width="wide">
        <Quote
          size="large"
          cite="– Caleb W., Homeowner"
        >
          <Paragraph>
            The Bedrock crew took real care, arrived right on time, and made our
            tired garage the best room in the house.
          </Paragraph>
        </Quote>
      </Container>
      <Buttons justify="justify-center">
        <CalendlyButton>Request Your Free Estimate</CalendlyButton>
      </Buttons>
      <Spacer height="h-25" />
    </>
  )
}
