import { ShowcaseGallery } from '@/components/showcase-gallery'

export default function Gallery() {
  return (
    <ShowcaseGallery
      images={[
        {
          src: '/content/r18-home-office.jpg',
          width: 525,
          height: 700,
          alt: 'Sealed concrete office floor',
          caption: 'Stained and sealed office floor',
        },
        {
          src: '/content/r01-garage-chip.jpg',
          width: 700,
          height: 525,
          alt: 'Epoxy-coated floor at a home',
          caption: 'Epoxy-chip garage floor, Red Mesa, TX',
        },
        {
          src: '/content/r05-living-polished.jpg',
          width: 700,
          height: 525,
          alt: 'Polished concrete floor at a home',
          caption: 'Polished concrete living area',
        },
        {
          src: '/content/r17-office-hall.jpg',
          width: 700,
          height: 525,
          alt: 'Sealed concrete office floor',
          caption: 'Sealed concrete office floor, Red Mesa, TX',
        },
        {
          src: '/content/r02-garage-metallic.jpg',
          width: 525,
          height: 700,
          alt: 'Sealed concrete office floor',
          caption: 'Stained and sealed work area',
        },
        {
          src: '/content/r07-garage-workbench.jpg',
          width: 700,
          height: 525,
          alt: 'Epoxy-coated floor at a home',
          caption: 'Epoxy-chip garage floor',
        },
        {
          src: '/content/r10-guestroom-sealed.jpg',
          width: 525,
          height: 700,
          alt: 'Sealed concrete guest room',
          caption: 'Sealed concrete guest room floor',
        },
        {
          src: '/content/r06-hallway-sealed.jpg',
          width: 525,
          height: 700,
          alt: 'Sealed concrete floor at a home',
          caption: 'Sealed concrete hallway, Red Mesa, TX',
        },
        {
          src: '/content/r03-patio-covered.jpg',
          width: 700,
          height: 391,
          alt: 'Epoxy-coated floor at a home',
          caption: 'Epoxy-chip patio, Red Mesa, TX',
        },
        {
          src: '/content/r08-patio-brick.jpg',
          width: 700,
          height: 525,
          alt: 'Epoxy-coated floor at a home',
          caption: 'Epoxy-chip covered patio',
        },
        {
          src: '/content/r14-patio-open.jpg',
          width: 700,
          height: 525,
          alt: 'Epoxy-coated floor at a home',
          caption: 'Epoxy-chip back patio',
        },
        {
          src: '/content/r11-garage-shop.jpg',
          width: 700,
          height: 525,
          alt: 'Epoxy-coated floor at a home',
          caption: 'Epoxy-chip two-car garage floor',
        },
        {
          src: '/content/r16-workshop-polished.jpg',
          width: 700,
          height: 525,
          alt: 'Sealed concrete floor at a home',
          caption: 'Colored concrete stain in a workshop',
        },
        {
          src: '/content/r12-kitchen-resin.jpg',
          width: 525,
          height: 700,
          alt: 'Sealed concrete office floor',
          caption: 'Stained and sealed office hallway',
        },
        {
          src: '/content/r13-mudroom-chip.jpg',
          width: 525,
          height: 700,
          alt: 'Epoxy-coated floor at a home',
          caption: 'Epoxy-chip home floor, Red Mesa, TX',
        },
        {
          src: '/content/r04-cabin-polished.jpg',
          width: 700,
          height: 525,
          alt: 'Resinous kitchen floor',
          caption: 'Resinous kitchen floor, Red Mesa, TX',
        },
        {
          src: '/content/r09-workshop-stain.jpg',
          width: 700,
          height: 525,
          alt: 'Polished concrete floor at a home',
          caption: 'Polished concrete floor in a country cabin',
        },
        {
          src: '/content/r19-lake-garage.jpg',
          width: 700,
          height: 525,
          alt: 'Epoxy-coated floor at a home',
          caption: 'Epoxy-chip garage and shop floor',
        },
      ]}
    />
  )
}
