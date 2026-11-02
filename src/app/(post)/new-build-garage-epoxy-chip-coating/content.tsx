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
        image="/content/r13-mudroom-chip.jpg"
        date="2026-03-05T09:32:01"
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
              src: '/content/r13-mudroom-chip.jpg',
              alt: 'New-Build Garage Epoxy-Chip Coating',
            },
            {
              src: '/content/r22-garage-tan.jpg',
              alt: 'New-Build Garage Epoxy-Chip Coating',
            },
            {
              src: '/content/r07-garage-workbench.jpg',
              alt: 'New-Build Garage Epoxy-Chip Coating',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
