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
        id="food-service-video"
        className="mt-25 md:mt-30"
      >
        <VideoFeature
          src="/videos/placeholder-video-hls/master.m3u8"
          poster="/placeholder.png"
          title="Bedrock Flooring Food Service Floors Video"
          pattern="/uploads/2024/02/dots.png"
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
        </VideoFeature>
      </div>
    </Container>
  )
}
