import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { Spacer } from '@/components/spacer'
import { VideoFeature } from '@/components/video-feature'

export default function Video() {
  return (
    <>
      <Spacer height="h-[39px]" />
      <Container
        width="wide"
        id="video"
        className="mt-25 md:mt-30"
      >
        <VideoFeature
          src="/videos/placeholder-video-hls/master.m3u8"
          poster="/placeholder.png"
          title="Bedrock Flooring Home and Garage Floors Video"
          pattern="/uploads/2024/02/dots.png"
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
        </VideoFeature>
      </Container>
    </>
  )
}
