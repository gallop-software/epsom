import { Image } from '@/components/image'
import { LightboxWrapper } from '@/components/lightbox-wrapper'
import { studioUrl } from '@/utils/studio-helpers'

export interface PostPhoto {
  /** Studio key. */
  src: string
  alt?: string | undefined
}

/** A post's photos, one per row at the column width; a click opens the lightbox. */
export function PostGallery({ images }: { images: PostPhoto[] }) {
  return (
    <LightboxWrapper className="flow-root">
      {images.map((image, i) => (
        <figure
          key={`${image.src}-${i}`}
          className="mb-7 text-center"
        >
          <a
            href={studioUrl(image.src, 'full')}
            className="lightbox-item"
          >
            <Image
              src={image.src}
              alt={image.alt}
              keepRatio
              sizes="(max-width: 833px) 90vw, 750px"
              className="inline h-auto max-w-full"
            />
          </a>
        </figure>
      ))}
    </LightboxWrapper>
  )
}
