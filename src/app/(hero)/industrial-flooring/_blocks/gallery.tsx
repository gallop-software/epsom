import { ShowcaseGallery } from '@/components/showcase-gallery'

export default function Gallery() {
  return (
    <ShowcaseGallery
      images={[
        {
          src: '/placeholder.png',
          width: 1024,
          height: 769,
          alt: 'Chip-coated floor in a maintenance shop',
          caption: 'Chip-Coated Shop',
        },
        {
          src: '/placeholder.png',
          width: 1024,
          height: 768,
          alt: 'Coated distribution center slab',
          caption: 'Coated Slab',
        },
        {
          src: '/placeholder.png',
          width: 1024,
          height: 768,
          alt: 'polished slab in a working warehouse space',
          caption: 'Polished Plant',
        },
        {
          src: '/placeholder.png',
          width: 1024,
          height: 576,
          alt: 'Chip-coated warehouse slab',
          caption: 'Chip-Coated Plant',
        },
        {
          src: '/placeholder.png',
          width: 1024,
          height: 576,
          alt: 'Chip-coated warehouse slab',
          caption: 'Chip-Coated Plant',
        },
        {
          src: '/placeholder.png',
          width: 1024,
          height: 791,
          alt: 'Finished manufacturing floor',
          caption: 'Coated Slab',
        },
      ]}
    />
  )
}
