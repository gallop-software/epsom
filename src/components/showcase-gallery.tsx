import { clsx } from 'clsx'
import { Image } from '@/components/image'
import { LightboxWrapper } from '@/components/lightbox-wrapper'
import { studioUrl } from '@/utils/studio-helpers'

export interface ShowcaseImage {
  /** Studio key. */
  src: string
  alt?: string | undefined
  caption?: string | undefined
  /** Size WordPress declared for the tile; it sets the tile's aspect ratio. */
  width?: number | undefined
  height?: number | undefined
}

const COLUMNS = {
  5: { width: 'min-[600px]:w-1/5', sizes: '(max-width: 599px) 50vw, 20vw' },
  6: {
    width: 'min-[600px]:w-[16.66667%]',
    sizes: '(max-width: 599px) 50vw, 17vw',
  },
}

/**
 * Edge-to-edge photo tiles (five or six per row, two below 600px) whose
 * captions slide up on hover; a click opens the lightbox.
 */
export function ShowcaseGallery({
  images,
  columns = 6,
}: {
  images: ShowcaseImage[]
  /** Tiles per row from 600px (two below). */
  columns?: 5 | 6
}) {
  return (
    <LightboxWrapper className="relative flex flex-wrap overflow-hidden">
      {images.map((image, i) => (
        <figure
          key={`${image.src}-${i}`}
          className={clsx(
            'group relative m-0 flex w-1/2 max-w-full grow flex-col justify-center',
            COLUMNS[columns].width
          )}
        >
          <a
            href={studioUrl(image.src, 'full')}
            className="lightbox-item flex h-full w-full flex-[1_0_0%] flex-col transition-all duration-400"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              keepRatio
              size="large"
              sizes={COLUMNS[columns].sizes}
              className="block h-full w-full flex-[1_0_0%] object-cover align-bottom"
            />
          </a>
          {image.caption && (
            <figcaption className="absolute right-0 bottom-0 left-0 m-0 max-h-full translate-y-full overflow-auto bg-body/80 px-5 py-2.5 text-center font-heading text-[15px] leading-heading font-light tracking-heading wrap-break-word text-contrast-light uppercase transition-all duration-400 [scrollbar-color:transparent_transparent] [scrollbar-gutter:stable_both-edges] [scrollbar-width:thin] [text-shadow:0_0_1.5px_var(--color-overlay)] will-change-transform group-hover:translate-y-0">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </LightboxWrapper>
  )
}
