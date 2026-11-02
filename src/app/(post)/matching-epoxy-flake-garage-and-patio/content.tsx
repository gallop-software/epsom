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
        image="/placeholder.png"
        date="2021-05-05T16:25:28"
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
              src: '/placeholder.png',
              alt: 'Matching Epoxy-Flake Garage and Patio',
            },
            {
              src: '/placeholder.png',
              alt: 'Matching Epoxy-Flake Garage and Patio',
            },
            {
              src: '/placeholder.png',
              alt: 'Matching Epoxy-Flake Garage and Patio',
            },
            {
              src: '/placeholder.png',
              alt: 'Matching Epoxy-Flake Garage and Patio',
            },
            {
              src: '/placeholder.png',
              alt: 'Matching Epoxy-Flake Garage and Patio',
            },
            {
              src: '/placeholder.png',
              alt: 'Matching Epoxy-Flake Garage and Patio',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
