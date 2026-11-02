import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE = 'New-Build Garage Epoxy-Chip Coating'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/placeholder.png"
        date="2021-03-05T09:32:01"
      />
      <PostBody categories={['Residential Concrete Flooring Projects']}>
        <Paragraph>
          {
            'One of the last jobs on this new home was the garage floor. We coated it with epoxy chips in a salt-and-pepper blend just before the owners moved in. '
          }
          <a href="https://www.instagram.com/explore/tags/residentialflooring/">
            #residentialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/placeholder.png',
              alt: 'New-Build Garage Epoxy-Chip Coating',
            },
            {
              src: '/placeholder.png',
              alt: 'New-Build Garage Epoxy-Chip Coating',
            },
            {
              src: '/placeholder.png',
              alt: 'New-Build Garage Epoxy-Chip Coating',
            },
            {
              src: '/placeholder.png',
              alt: 'New-Build Garage Epoxy-Chip Coating',
            },
            {
              src: '/placeholder.png',
              alt: 'New-Build Garage Epoxy-Chip Coating',
            },
            {
              src: '/placeholder.png',
              alt: 'New-Build Garage Epoxy-Chip Coating',
            },
            {
              src: '/placeholder.png',
              alt: 'New-Build Garage Epoxy-Chip Coating',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
