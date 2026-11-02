import { ShowcaseGallery } from '@/components/showcase-gallery'

export default function Gallery() {
  return (
    <ShowcaseGallery
      images={[
        {
          src: '/content/i01-distribution-chip.jpg',
          width: 1024,
          height: 769,
          alt: 'Chip-coated floor in a maintenance shop',
          caption: 'Chip-Coated Shop',
        },
        {
          src: '/content/i09-assembly-wide.jpg',
          width: 1024,
          height: 768,
          alt: 'Coated distribution center slab',
          caption: 'Coated Slab',
        },
        {
          src: '/content/i02-plant-polished.jpg',
          width: 1024,
          height: 768,
          alt: 'polished slab in a working warehouse space',
          caption: 'Polished Plant',
        },
        {
          src: '/content/i08-plant-chip-wide.jpg',
          width: 1024,
          height: 576,
          alt: 'Chip-coated warehouse slab',
          caption: 'Chip-Coated Plant',
        },
        {
          src: '/content/i03-maintenance-epoxy.jpg',
          width: 1024,
          height: 576,
          alt: 'Chip-coated warehouse slab',
          caption: 'Chip-Coated Plant',
        },
        {
          src: '/content/i10-coated-slab.jpg',
          width: 1024,
          height: 791,
          alt: 'Finished manufacturing floor',
          caption: 'Coated Slab',
        },
      ]}
    />
  )
}
