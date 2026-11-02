import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { Spacer } from '@/components/spacer'
import { ImageFeature } from '@/components/image-feature'

export default function Feature() {
  return (
    <>
      <Spacer height="h-[39px]" />
      <Container
        width="wide"
        id="feature"
        className="mt-25 md:mt-30"
      >
        <ImageFeature
          image="/content/c14-supermarket.jpg"
          title="Bedrock Flooring Commercial Floors"
          pattern="/patterns/dots.png"
        >
          <Heading
            as="h2"
            textAlign="max-md:text-center"
            className="large-anchor-offset"
          >
            Red Mesa Concrete Floors, Done Right
          </Heading>
          <Heading
            as="h4"
            color="text-accent2"
            textAlign="max-md:text-center"
          >
            <strong>
              {'Skilled Crews, Hard-Wearing '}
              <strong>finishes on every slab</strong>
            </strong>
          </Heading>
        </ImageFeature>
      </Container>
      <Spacer height="h-[101px]" />
    </>
  )
}
