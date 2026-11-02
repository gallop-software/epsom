import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Epoxy-Flake Lake House Garage Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/r19-lake-garage.jpg"
        date="2026-04-22T16:50:34"
      />
      <PostBody categories={['Residential Concrete Flooring Projects']}>
        <Paragraph>
          {
            'We put down an epoxy-flake floor in the garage of this waterfront home. Boats, coolers and wet gear can all sit on it without the owners giving it a second thought. '
          }
          <a href="https://www.instagram.com/explore/tags/residentialflooring/">
            #residentialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/r19-lake-garage.jpg',
              alt: 'Epoxy-Flake Lake House Garage Floor',
            },
            {
              src: '/content/r11-garage-shop.jpg',
              alt: 'Epoxy-Flake Lake House Garage Floor',
            },
            {
              src: '/content/r15-chip-closeup.jpg',
              alt: 'Epoxy-Flake Lake House Garage Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
