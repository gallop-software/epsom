import { ShowcaseGallery } from '@/components/showcase-gallery'

export default function Gallery() {
  return (
    <ShowcaseGallery
      images={[
        {
          src: '/content/f03-cooler.jpg',
          width: 700,
          height: 525,
          alt: 'Commercial kitchen floor running from the cook line back to the walk-in cooler.',
          caption: 'Commercial Kitchen Floor From Line to Walk-In',
        },
        {
          src: '/content/f10-restaurant-epoxy.jpg',
          width: 700,
          height: 467,
          alt: 'Restaurant dining floor',
          caption: 'Coated Restaurant Floor',
        },
        {
          src: '/content/f07-brewery.jpg',
          width: 700,
          height: 467,
          alt: 'Brewery production floor',
          caption: 'Brewery Floor Finish',
        },
        {
          src: '/content/f08-bakery.jpg',
          width: 700,
          height: 467,
          alt: 'New coating in a food prep area',
          caption: 'Coated Food Prep Area',
        },
        {
          src: '/content/f01-kitchen-line.jpg',
          width: 700,
          height: 467,
          alt: 'Finished walk-in cooler floor',
          caption: 'Walk-In Cooler Floor',
        },
        {
          src: '/content/f09-dish-area.jpg',
          width: 700,
          height: 463,
          alt: 'Finished commercial kitchen',
          caption: 'Coated Kitchen Floor',
        },
      ]}
    />
  )
}
