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
        image="/placeholder.png"
        date="2021-02-23T15:43:18"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          A worn rubber floor came out of this grocery prep room so we could pour a self-leveling resinous system. The crew now has one continuous surface from wall to wall.
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/placeholder.png',
              alt: 'Self-Leveling Resinous Food Prep Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Self-Leveling Resinous Food Prep Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Self-Leveling Resinous Food Prep Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Self-Leveling Resinous Food Prep Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Self-Leveling Resinous Food Prep Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
