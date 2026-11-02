import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostGallery } from '@/components/post-gallery'
import { PostHero } from '@/components/post-hero'

const TITLE =
  'Epoxy-Flake Auto Service Bay Floor'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        image="/placeholder.png"
        date="2021-04-14T09:07:47"
      />
      <PostBody categories={['Commercial Concrete Flooring Projects']}>
        <Paragraph>
          {
            'We finished an epoxy-flake floor in the service bays at a local auto shop. Oil and road grime clean up easily, and the textured surface gives the techs secure footing. '
          }
          <a href="https://www.instagram.com/explore/tags/commercialflooring/">
            #commercialflooring
          </a>
        </Paragraph>
        <PostGallery
          images={[
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Flake Auto Service Bay Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Flake Auto Service Bay Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Flake Auto Service Bay Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Flake Auto Service Bay Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Flake Auto Service Bay Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Flake Auto Service Bay Floor',
            },
            {
              src: '/placeholder.png',
              alt: 'Epoxy-Flake Auto Service Bay Floor',
            },
          ]}
        />
      </PostBody>
    </>
  )
}
