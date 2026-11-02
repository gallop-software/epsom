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
        image="/placeholder.png"
        date="2021-04-01T17:03:58"
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
              src: '/placeholder.png',
              alt: 'Epoxy-Chip Backyard Patio Coating',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Chip Backyard Patio Coating',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Chip Backyard Patio Coating',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Chip Backyard Patio Coating',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Chip Backyard Patio Coating',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Chip Backyard Patio Coating',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
