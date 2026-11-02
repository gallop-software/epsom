import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Resinous Walk-In Cooler Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/placeholder.png"
        date="2021-02-26T00:15:11"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          {'A new walk-in meat cooler at a grocery store needed a tough floor, so we installed a resinous system.'}
          <br />
          {' The cutting room floor is next on our list. '}
          <a href="https://www.instagram.com/explore/tags/concrete/">
            #concrete
          </a>{' '}
          <a href="https://www.instagram.com/explore/tags/decorativeflooring/">
            #decorativeflooring
          </a>{' '}
          <a href="https://www.instagram.com/explore/tags/commercialflooring/">
            #commercialflooring
          </a>{' '}
          <a href="https://www.instagram.com/explore/tags/concretefloors/">
            #concretefloors
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/placeholder.png',
              alt: 'Resinous Walk-In Cooler Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Resinous Walk-In Cooler Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Resinous Walk-In Cooler Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Resinous Walk-In Cooler Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Resinous Walk-In Cooler Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Resinous Walk-In Cooler Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
