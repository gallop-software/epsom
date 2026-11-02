import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Polished Concrete Warehouse Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/i04-warehouse-polished.jpg"
        date="2026-05-31T16:32:44"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          {
            'A tired epoxy coating and chipped joints had to go in this storage warehouse. We ground the slab down to polished concrete and cut fresh joints, so the floor looks clean and can take daily forklift traffic. '
          }
          <a href="https://www.instagram.com/explore/tags/commercialflooring/">
            #commercialflooring
          </a>{' '}
          <a href="https://www.instagram.com/explore/tags/polishedconcrete/">
            #polishedconcrete
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/i04-warehouse-polished.jpg',
              alt: 'Polished Concrete Warehouse Floor',
            },
            {
              src: '/content/i09-assembly-wide.jpg',
              alt: 'Polished Concrete Warehouse Floor',
            },
            {
              src: '/content/i10-coated-slab.jpg',
              alt: 'Polished Concrete Warehouse Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
