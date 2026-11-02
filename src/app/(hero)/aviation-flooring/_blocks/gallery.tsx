import { ShowcaseGallery } from '@/components/showcase-gallery'

export default function Gallery() {
  return (
    <ShowcaseGallery
      images={[
        {
          src: '/placeholder.png',
          width: 1024,
          height: 769,
          alt: 'Chip-coated floor in an aircraft hangar',
          caption: 'Chip-Coated Hangar',
        },
        {
          src: '/placeholder.png',
          width: 1024,
          height: 768,
          alt: 'Coated aircraft hangar slab',
          caption: 'Coated Slab',
        },
        {
          src: '/placeholder.png',
          width: 1024,
          height: 768,
          alt: 'polished slab in a working aircraft hangar',
          caption: 'Polished Hangar',
        },
        {
          src: '/placeholder.png',
          width: 1024,
          height: 576,
          alt: 'Chip-coated hangar slab',
          caption: 'Chip-Coated Hangar',
        },
        {
          src: '/placeholder.png',
          width: 1024,
          height: 576,
          alt: 'Chip-coated hangar slab',
          caption: 'Chip-Coated Hangar',
        },
        {
          src: '/placeholder.png',
          width: 1024,
          height: 791,
          alt: 'Finished aircraft hangar floor',
          caption: 'Coated Slab',
        },
      ]}
    />
  )
}
