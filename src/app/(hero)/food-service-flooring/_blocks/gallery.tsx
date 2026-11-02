import { ShowcaseGallery } from '@/components/showcase-gallery'

export default function Gallery() {
  return (
    <ShowcaseGallery
      images={[
        {
          src: '/placeholder.png',
          width: 700,
          height: 525,
          alt: 'Commercial kitchen floor running from the cook line back to the walk-in cooler.',
          caption: 'Commercial Kitchen Floor From Line to Walk-In',
        },
        {
          src: '/placeholder.png',
          width: 700,
          height: 467,
          alt: 'Restaurant dining floor',
          caption: 'Coated Restaurant Floor',
        },
        {
          src: '/placeholder.png',
          width: 700,
          height: 467,
          alt: 'Brewery production floor',
          caption: 'Brewery Floor Finish',
        },
        {
          src: '/placeholder.png',
          width: 700,
          height: 467,
          alt: 'New coating in a food prep area',
          caption: 'Coated Food Prep Area',
        },
        {
          src: '/placeholder.png',
          width: 700,
          height: 467,
          alt: 'Finished walk-in cooler floor',
          caption: 'Walk-In Cooler Floor',
        },
        {
          src: '/placeholder.png',
          width: 700,
          height: 463,
          alt: 'Finished commercial kitchen',
          caption: 'Coated Kitchen Floor',
        },
      ]}
    />
  )
}
