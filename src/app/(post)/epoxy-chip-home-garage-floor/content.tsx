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
        image="/content/r01-garage-chip.jpg"
        date="2026-02-19T07:12:58"
      />
      <PostBody categories={['Residential Concrete Flooring Projects']}>
        <Paragraph>
          We wrapped up this home garage with a black and white chip blend. The
          textured finish hides dust between cleanings and rinses off without
          much effort.
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/r01-garage-chip.jpg',
              alt: 'Epoxy-Chip Home Garage Floor',
            },
            {
              src: '/content/r07-garage-workbench.jpg',
              alt: 'Epoxy-Chip Home Garage Floor',
            },
            {
              src: '/content/r15-chip-closeup.jpg',
              alt: 'Epoxy-Chip Home Garage Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
