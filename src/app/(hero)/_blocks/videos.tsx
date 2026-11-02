import { Heading } from '@/components/heading'
import { Spacer } from '@/components/spacer'
import { VideoFilter } from '@/components/video-filter'

function Intro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <Heading
        as="h2"
        textAlign="max-md:text-center"
        className="large-anchor-offset"
      >
        {title}
      </Heading>
      <Heading
        as="h4"
        color="text-accent2"
        textAlign="max-md:text-center"
      >
        {subtitle}
      </Heading>
    </>
  )
}

export default function Videos() {
  return (
    <>
      <Spacer height="h-28.5" />
      <VideoFilter
        id="video"
        pattern="/uploads/2024/02/dots.png"
        panels={[
          {
            id: 'commercial-video',
            label: 'Commercial',
            src: '/videos/placeholder-video-hls/master.m3u8',
            poster: '/placeholder.png',
            title: 'A Look at Bedrock Commercial Floors',
            children: (
              <Intro
                title="Concrete Floors Are All We Do"
                subtitle="A Look at Our Work…"
              />
            ),
          },
          {
            id: 'residential-video',
            label: 'Residential',
            src: '/videos/placeholder-video-hls/master.m3u8',
            poster: '/placeholder.png',
            title: 'A Look at Bedrock Residential Floors',
            children: (
              <Intro
                title="Your Red Mesa Garage Floor Crew"
                subtitle="The Same Care We Bring to Big Jobs, Right at Your Home"
              />
            ),
          },
          {
            id: 'industrial-video',
            label: 'Industrial',
            src: '/videos/placeholder-video-hls/master.m3u8',
            poster: '/placeholder.png',
            title: 'A Look at Bedrock Industrial Floors',
            children: (
              <Intro
                title="Floors for Industry"
                subtitle="Tough Floor Systems Made for Plants and Warehouse Work"
              />
            ),
          },
        ]}
      />
      <Spacer height="h-[37px]" />
    </>
  )
}
