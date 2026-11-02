import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Seamless Epoxy Dining Room Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/f10-restaurant-epoxy.jpg"
        date="2026-05-05T16:20:28"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          {
            'We coated this restaurant dining room with a seamless epoxy system. With no grout lines to scrub, the staff can mop it down fast, and the lighter color opens up the room. '
          }
          <a href="https://www.instagram.com/explore/tags/commercialflooring/">
            #commercialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/f10-restaurant-epoxy.jpg',
              alt: 'Seamless Epoxy Dining Room Floor',
            },
            {
              src: '/content/c12-restaurant.jpg',
              alt: 'Seamless Epoxy Dining Room Floor',
            },
            {
              src: '/content/f11-kitchen-flake.jpg',
              alt: 'Seamless Epoxy Dining Room Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
