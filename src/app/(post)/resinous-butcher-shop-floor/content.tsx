import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Resinous Butcher Shop Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/f05-meat-room.jpg"
        date="2026-03-12T09:49:13"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          {
            'To close out a grocery remodel, we laid a resinous coating across the butcher area. It lines up with the walk-in cooler floor we did for the same store a few weeks earlier. '
          }
          <a href="https://www.instagram.com/explore/tags/resinousflooring/">
            #resinousflooring
          </a>{' '}
          <a href="https://www.instagram.com/explore/tags/commercialflooring/">
            #commercialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/f05-meat-room.jpg',
              alt: 'Resinous Butcher Shop Floor',
            },
            {
              src: '/content/f06-deli.jpg',
              alt: 'Resinous Butcher Shop Floor',
            },
            {
              src: '/content/f04-prep-room.jpg',
              alt: 'Resinous Butcher Shop Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
