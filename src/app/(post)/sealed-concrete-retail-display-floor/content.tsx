import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Sealed Concrete Retail Display Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/c06-sealed-corridor.jpg"
        date="2026-02-19T07:29:48"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          Old VCT came up at this farm and ranch store so we could seal the
          concrete underneath. Products show well on the glossy surface, and
          upkeep is simple.
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/c06-sealed-corridor.jpg',
              alt: 'Sealed Concrete Retail Display Floor',
            },
            {
              src: '/content/c09-store-entrance.jpg',
              alt: 'Sealed Concrete Retail Display Floor',
            },
            {
              src: '/content/c16-hotel-lobby.jpg',
              alt: 'Sealed Concrete Retail Display Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
