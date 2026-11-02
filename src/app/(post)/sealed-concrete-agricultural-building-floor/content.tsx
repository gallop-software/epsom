import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Sealed Concrete Agricultural Building Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/i07-ag-building.jpg"
        date="2026-04-05T14:52:08"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          {
            'Years of tile adhesive covered the slab in this farm co-op building. We ground it clean and applied a tough sealer, and the old concrete came up with rich color. '
          }
          <a href="https://www.instagram.com/explore/tags/commercialflooring/">
            #commercialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/i07-ag-building.jpg',
              alt: 'Sealed Concrete Agricultural Building Floor',
            },
            {
              src: '/content/i04-warehouse-polished.jpg',
              alt: 'Sealed Concrete Agricultural Building Floor',
            },
            {
              src: '/content/i05-truck-bay.jpg',
              alt: 'Sealed Concrete Agricultural Building Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
