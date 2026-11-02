import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { ImageFeature } from '@/components/image-feature'

export default function Feature() {
  return (
    <Container
      width="wide"
      id="feature"
    >
      <div
        id="food-service-feature"
        className="mt-25 md:mt-30"
      >
        <ImageFeature
          image="/content/f07-brewery.jpg"
          title="Bedrock Flooring Food Service Floors"
          pattern="/patterns/dots.png"
        >
          <Heading
            as="h2"
            textAlign="max-md:text-center"
            className="large-anchor-offset"
          >
            Kitchen Floors Built Right Here in Red Mesa
          </Heading>
          <Heading
            as="h4"
            color="text-accent2"
            textAlign="max-md:text-center"
          >
            Floors for every kitchen
          </Heading>
        </ImageFeature>
      </div>
    </Container>
  )
}
