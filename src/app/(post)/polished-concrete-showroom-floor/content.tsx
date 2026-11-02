import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Polished Concrete Showroom Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/placeholder.png"
        date="2021-02-26T11:47:00"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          {
            'We polished this dealership showroom floor and got it ready for the inventory to roll back in. '
          }
          <a href="https://www.instagram.com/explore/tags/CommercialFlooring/">
            #CommercialFlooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Showroom Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Showroom Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Showroom Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Showroom Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Showroom Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Showroom Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Showroom Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
