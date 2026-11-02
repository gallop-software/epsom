import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { VideoFeature } from '@/components/video-feature'

export default function Video() {
  return (
    <Container
      width="wide"
      id="video"
    >
      <div
        id="aviation-video"
        className="mt-25 md:mt-30"
      >
        <VideoFeature
          src="/videos/placeholder-video-hls/master.m3u8"
          poster="/placeholder.png"
          title="Bedrock Flooring Hangar Floors Video"
          pattern="/uploads/2024/02/dots.png"
        >
          <Heading
            as="h2"
            textAlign="max-md:text-center"
            className="large-anchor-offset"
          >
            Hangar Floor Coatings From Your Red Mesa Crew
          </Heading>
          <Heading
            as="h4"
            color="text-accent2"
            textAlign="max-md:text-center"
          >
            TOUGH, GOOD-LOOKING FLOORS MADE FOR AIRCRAFT SPACES
          </Heading>
        </VideoFeature>
      </div>
    </Container>
  )
}
