import { Buttons } from '@/components/buttons'
import { CalendlyButton } from '@/components/calendly-button'
import { Columns } from '@/components/columns'
import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { LogoGallery } from '@/components/logo-gallery'
import { Paragraph } from '@/components/paragraph'
import { Spacer } from '@/components/spacer'

export default function Intro() {
  return (
    <>
      <Container
        width="wide"
        className="mb-col-4"
      >
        <Columns
          cols="grid-cols-1 md:grid-cols-2"
          gap="gap-x-17"
          align="items-start"
          className="max-md:block"
        >
          <div>
            <Heading
              as="h2"
              styleAs="h3"
              id="learn-more"
            >
              Floors Built for Hard Work
            </Heading>
            <Paragraph>
              A business floor works a lot harder than the one in a typical
              home. It takes steady foot traffic, rolling carts, scrapes and
              spills, so it usually needs a tougher finish or coating that holds
              up and stays simple to care for. Good traction matters too,
              because staff and customers need safe footing all day long. In a
              restaurant, the surface also has to shed food and grease and clean
              up fast at closing time.
            </Paragraph>
            <Paragraph>
              In a storefront or dining room, the floor can also help sell the
              space. Decorative color and patterns set the mood, draw attention
              where you want it, and quietly guide people through the room from
              the door onward.
            </Paragraph>
          </div>
          <div>
            <LogoGallery
              columns={3}
              wide={false}
              caption="Businesses on Bedrock Flooring floors"
              logos={[
                { src: '/brand/client-01.png', alt: 'Grocery client logo' },
                { src: '/brand/client-02.png', alt: 'Supermarket client logo' },
                { src: '/brand/client-03.png', alt: 'Powersports client logo' },
                { src: '/brand/client-04.png', alt: 'Auto dealer client logo' },
                { src: '/brand/client-05.png', alt: 'Hotel client logo' },
                { src: '/brand/client-09.png', alt: 'Utility client logo' },
              ]}
            />
          </div>
        </Columns>
      </Container>
      <Spacer height="h-[47px]" />
      <Buttons justify="justify-center">
        <CalendlyButton>Request Your Free Estimate</CalendlyButton>
      </Buttons>
      <Spacer height="h-25" />
    </>
  )
}
