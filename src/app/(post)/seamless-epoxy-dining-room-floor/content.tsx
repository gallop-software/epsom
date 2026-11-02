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
        image="/placeholder.png"
        date="2021-05-05T16:20:28"
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
              src: '/placeholder.png',
              alt: 'Seamless Epoxy Dining Room Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Seamless Epoxy Dining Room Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Seamless Epoxy Dining Room Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Seamless Epoxy Dining Room Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Seamless Epoxy Dining Room Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
