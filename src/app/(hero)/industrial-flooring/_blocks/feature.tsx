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
        id="industrial-feature"
        className="mt-25 md:mt-30"
      >
        <ImageFeature
          image="/content/i09-assembly-wide.jpg"
          title="Bedrock Flooring Industrial Floors"
          pattern="/patterns/dots.png"
        >
          <Heading
            as="h2"
            textAlign="max-md:text-center"
            className="large-anchor-offset"
          >
            Industrial Floor Coatings From Your Red Mesa Crew
          </Heading>
          <Heading
            as="h4"
            color="text-accent2"
            textAlign="max-md:text-center"
          >
            TOUGH, GOOD-LOOKING FLOORS MADE FOR WORKING PLANTS
          </Heading>
        </ImageFeature>
      </div>
    </Container>
  )
}
