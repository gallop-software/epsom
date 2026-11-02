import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Epoxy-Chip Home Garage Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/placeholder.png"
        date="2021-02-19T07:12:58"
      />
      <PostBody categories={['Residential Concrete Flooring Projects']}>
        <Paragraph>
          We wrapped up this home garage with a black and white chip blend. The textured finish hides dust between cleanings and rinses off without much effort.
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Chip Home Garage Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Chip Home Garage Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Chip Home Garage Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Chip Home Garage Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
