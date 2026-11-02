import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Matching Epoxy-Flake Garage and Patio'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/r23-garage-storage.jpg"
        date="2026-05-05T16:25:28"
      />
      <PostBody categories={['Residential Concrete Flooring Projects']}>
        <Paragraph>
          {
            'New owners asked us to coat both the garage and the back patio with the same flake system. It handles the outdoor weather well and gives them a good spot to host friends. '
          }
          <a href="https://www.instagram.com/explore/tags/residentialflooring/">
            #residentialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/r23-garage-storage.jpg',
              alt: 'Matching Epoxy-Flake Garage and Patio',
            },
            {
              src: '/content/r20-patio-pergola.jpg',
              alt: 'Matching Epoxy-Flake Garage and Patio',
            },
            {
              src: '/content/r22-garage-tan.jpg',
              alt: 'Matching Epoxy-Flake Garage and Patio',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
