import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Epoxy-Flake Lakeside Patio Coating'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/r20-patio-pergola.jpg"
        date="2026-05-05T16:16:06"
      />
      <PostBody categories={['Residential Concrete Flooring Projects']}>
        <Paragraph>
          {
            'This lakeside patio now has the same flake blend as the garage next to it. '
          }
          <a href="https://www.instagram.com/explore/tags/residentialflooring/">
            #residentialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/r20-patio-pergola.jpg',
              alt: 'Epoxy-Flake Lakeside Patio Coating',
            },
            {
              src: '/content/r03-patio-covered.jpg',
              alt: 'Epoxy-Flake Lakeside Patio Coating',
            },
            {
              src: '/content/r21-patio-poolside.jpg',
              alt: 'Epoxy-Flake Lakeside Patio Coating',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
