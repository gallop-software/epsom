import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Epoxy-Flake Auto Service Bay Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/i06-repair-bay.jpg"
        date="2026-04-14T09:07:47"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          {
            'We finished an epoxy-flake floor in the service bays at a local auto shop. Oil and road grime clean up easily, and the textured surface gives the techs secure footing. '
          }
          <a href="https://www.instagram.com/explore/tags/commercialflooring/">
            #commercialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/i06-repair-bay.jpg',
              alt: 'Epoxy-Flake Auto Service Bay Floor',
            },
            {
              src: '/content/c18-salesfloor-chip.jpg',
              alt: 'Epoxy-Flake Auto Service Bay Floor',
            },
            {
              src: '/content/i10-coated-slab.jpg',
              alt: 'Epoxy-Flake Auto Service Bay Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
