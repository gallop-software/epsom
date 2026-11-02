import { ShowcaseGallery } from '@/components/showcase-gallery'

export default function Gallery() {
  return (
    <ShowcaseGallery
      images={[
        {
          src: '/content/c05-grocery-produce.jpg',
          width: 1024,
          height: 768,
          alt: 'Polished concrete business floor',
          caption: 'Polished concrete grocery floor',
        },
        {
          src: '/content/c13-laundry.jpg',
          width: 768,
          height: 1024,
          alt: 'Sealed concrete business floor',
          caption: 'Sealed concrete floor',
        },
        {
          src: '/content/c02-grocery-aisle.jpg',
          width: 1024,
          height: 768,
          alt: 'Polished concrete business floor',
          caption: 'Polished concrete grocery aisle, Red Mesa, TX',
        },
        {
          src: '/content/c07-office-stained.jpg',
          width: 768,
          height: 1024,
          alt: 'Stained concrete business floor',
          caption: 'Stained and sealed office floor',
        },
        {
          src: '/content/c04-venue.jpg',
          width: 1024,
          height: 768,
          alt: 'Polished concrete business floor',
          caption: 'Polished concrete event venue floor',
        },
        {
          src: '/content/c14-supermarket.jpg',
          width: 1024,
          height: 768,
          alt: 'Polished concrete business floor',
          caption: 'Polished concrete showroom floor, Red Mesa, TX',
        },
        {
          src: '/content/f06-deli.jpg',
          width: 1024,
          height: 768,
          alt: 'Resinous business floor',
          caption: 'Resinous deli prep room floor',
        },
        {
          src: '/content/c17-gym.jpg',
          width: 1024,
          height: 768,
          alt: 'Coated home garage floor',
          caption: 'Salt and pepper flake garage floor',
        },
        {
          src: '/content/c08-school-hall.jpg',
          width: 1024,
          height: 768,
          alt: 'Polished concrete business floor',
          caption: 'Polished concrete school hallway',
        },
        {
          src: '/content/c09-store-entrance.jpg',
          width: 768,
          height: 1024,
          alt: 'Polished concrete business floor',
          caption: 'Polished concrete store entrance',
        },
        {
          src: '/content/c10-polished-epoxy.jpg',
          width: 768,
          height: 1024,
          alt: 'Polished concrete business floor',
          caption: 'Polished concrete and epoxy floor',
        },
        {
          src: '/content/c11-checkout.jpg',
          width: 1024,
          height: 768,
          alt: 'Polished concrete business floor',
          caption: 'Polished concrete checkout area',
        },
        {
          src: '/content/c12-restaurant.jpg',
          width: 1024,
          height: 768,
          alt: 'Polished concrete business floor',
          caption: 'Polished concrete restaurant floor, Red Mesa, TX',
        },
        {
          src: '/content/f08-bakery.jpg',
          width: 1024,
          height: 768,
          alt: 'Resinous business floor',
          caption: 'Resinous food prep room floor',
        },
        {
          src: '/content/c16-hotel-lobby.jpg',
          width: 768,
          height: 1024,
          alt: 'Sealed concrete business floor',
          caption: 'Sealed concrete laundry room floor',
        },
        {
          src: '/content/c03-office-lobby.jpg',
          width: 1024,
          height: 768,
          alt: 'Polished concrete business floor',
          caption: 'Polished concrete supermarket floor',
        },
        {
          src: '/content/f09-dish-area.jpg',
          width: 1024,
          height: 768,
          alt: 'Resinous kitchen floor',
          caption: 'Resinous restaurant kitchen floor',
        },
        {
          src: '/content/f05-meat-room.jpg',
          width: 768,
          height: 1024,
          alt: 'Resinous food prep floor',
          caption: 'Resinous meat cutting room floor, Red Mesa, TX',
        },
      ]}
    />
  )
}
