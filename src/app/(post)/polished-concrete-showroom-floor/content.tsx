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
        image="/content/c01-showroom.jpg"
        date="2026-02-26T11:47:00"
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
              src: '/content/c01-showroom.jpg',
              alt: 'Polished Concrete Showroom Floor',
            },
            {
              src: '/content/c03-office-lobby.jpg',
              alt: 'Polished Concrete Showroom Floor',
            },
            {
              src: '/content/c10-polished-epoxy.jpg',
              alt: 'Polished Concrete Showroom Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
