import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'Polished Concrete Manufacturing Shop Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/placeholder.png"
        date="2021-03-22T10:21:21"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          {
            'We are polishing this manufacturing shop floor one section at a time. Working in stages lets their team stay in production while we move across the slab. '
          }
          <a href="https://www.instagram.com/explore/tags/commercialflooring/">
            #commercialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Manufacturing Shop Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Manufacturing Shop Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Manufacturing Shop Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Manufacturing Shop Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Manufacturing Shop Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Manufacturing Shop Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Polished Concrete Manufacturing Shop Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
