import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Self-Leveling Resinous Food Prep Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/content/f02-kitchen-gray.jpg"
        date="2026-02-23T15:43:18"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          A worn rubber floor came out of this grocery prep room so we could
          pour a self-leveling resinous system. The crew now has one continuous
          surface from wall to wall.
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/content/f02-kitchen-gray.jpg',
              alt: 'Self-Leveling Resinous Food Prep Floor',
            },
            {
              src: '/content/f04-prep-room.jpg',
              alt: 'Self-Leveling Resinous Food Prep Floor',
            },
            {
              src: '/content/f01-kitchen-line.jpg',
              alt: 'Self-Leveling Resinous Food Prep Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
