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
          image="/content/r05-living-polished.jpg"
          title="Bedrock Flooring Home and Garage Floors"
          pattern="/patterns/dots.png"
        >
          <Heading
            as="h2"
            textAlign="max-md:text-center"
            className="large-anchor-offset"
          >
            Your Red Mesa Garage Floor Crew!
          </Heading>
          <Heading
            as="h4"
            color="text-accent2"
            textAlign="max-md:text-center"
          >
            Bringing Our Commercial Know-How Home to Your Garage
          </Heading>
        </ImageFeature>
      </Container>
    </>
  )
}
