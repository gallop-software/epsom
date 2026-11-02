import { ShowcaseGallery } from '@/components/showcase-gallery'

export default function Gallery() {
  return (
    <ShowcaseGallery
      images={[
        {
          src: '/placeholder.png',
          width: 700,
          height: 525,
          alt: 'Outdoor pickleball court with a basketball goal set up along one edge.',
          caption: 'Shared Pickleball and Half-Court Basketball',
        },
        {
          src: '/placeholder.png',
          width: 700,
          height: 467,
          alt: 'Tennis court surface',
          caption: 'Coated Tennis Surface',
        },
        {
          src: '/placeholder.png',
          width: 700,
          height: 467,
          alt: 'Basketball court surfacing',
          caption: 'Basketball Surface',
        },
        {
          src: '/placeholder.png',
          width: 700,
          height: 467,
          alt: 'New acrylic pickleball court',
          caption: 'Open-Air Pickleball Play',
        },
        {
          src: '/placeholder.png',
          width: 700,
          height: 467,
          alt: 'Finished pickleball court',
          caption: 'Pickleball in the Gym',
        },
        {
          src: '/placeholder.png',
          width: 700,
          height: 463,
          alt: 'Finished tennis surface',
          caption: 'Coated Tennis Surface',
        },
      ]}
    />
  )
}
