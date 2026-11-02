import { Heading } from '@/components/heading'
import { Spacer } from '@/components/spacer'
import { ImageFilter } from '@/components/image-filter'

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

export default function Features() {
  return (
    <>
      <Spacer height="h-28.5" />
      <ImageFilter
        id="feature"
        pattern="/patterns/dots.png"
        panels={[
          {
            id: 'commercial-feature',
            label: 'Commercial',
            image: '/content/c05-grocery-produce.jpg',
            title: 'A Look at Bedrock Commercial Floors',
            children: (
              <Intro
                title="Concrete Floors Are All We Do"
                subtitle="A Look at Our Work…"
              />
            ),
          },
          {
            id: 'residential-feature',
            label: 'Residential',
            image: '/content/r04-cabin-polished.jpg',
            title: 'A Look at Bedrock Residential Floors',
            children: (
              <Intro
                title="Your Red Mesa Garage Floor Crew"
                subtitle="The Same Care We Bring to Big Jobs, Right at Your Home"
              />
            ),
          },
          {
            id: 'industrial-feature',
            label: 'Industrial',
            image: '/content/g02-walkthrough.jpg',
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
