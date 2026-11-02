import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Garage Floor Coating From Slab to Finish'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/r11-garage-shop.jpg"
        date="2026-02-26T10:21:34"
      />
      <PostBody categories={['Residential Concrete Flooring Projects']}>
        <Paragraph>
          This garage went from a bare slab to a finished coating in a few
          careful steps: walk the job, prep the concrete, then roll the coat.
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/g02-walkthrough.jpg',
              alt: 'Walking the slab before the job starts',
            },
            {
              src: '/content/g03-roller.jpg',
              alt: 'Rolling on a floor coating',
            },
            {
              src: '/content/r23-garage-storage.jpg',
              alt: 'Finished epoxy-chip garage floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
