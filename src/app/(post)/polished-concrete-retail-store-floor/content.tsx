import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Polished Concrete Retail Store Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/placeholder.png"
        date="2021-05-20T08:56:41"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          {
            'This shop had a waxed floor that was showing its age in every aisle. We took it down and polished the concrete, so now there is no wax to strip and cleaning is a quick job. '
          }
          <a href="https://www.instagram.com/explore/tags/commercialflooring/">
            #commercialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Retail Store Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Retail Store Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Retail Store Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Retail Store Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Retail Store Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Retail Store Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
