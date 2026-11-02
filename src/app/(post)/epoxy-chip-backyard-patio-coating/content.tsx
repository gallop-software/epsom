import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Epoxy-Chip Backyard Patio Coating'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/r14-patio-open.jpg"
        date="2026-04-01T17:03:58"
      />
      <PostBody categories={['Residential Concrete Flooring Projects']}>
        <Paragraph>
          {
            'This backyard slab got an epoxy-chip coating and a whole new look. It is built for Red Mesa sun and storms, and the family finally has a patio they want to use. '
          }
          <a href="https://www.instagram.com/explore/tags/residentialflooring/">
            #residentialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/r14-patio-open.jpg',
              alt: 'Epoxy-Chip Backyard Patio Coating',
            },
            {
              src: '/content/r21-patio-poolside.jpg',
              alt: 'Epoxy-Chip Backyard Patio Coating',
            },
            {
              src: '/content/r08-patio-brick.jpg',
              alt: 'Epoxy-Chip Backyard Patio Coating',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
