import { clsx } from 'clsx'
import { containerClasses } from '@/components/container'
import { Image } from '@/components/image'

export interface Logo {
  /** Studio key. */
  src: string
  alt?: string | undefined
}

const COLUMNS = {
  3: 'min-[600px]:w-[calc(33.33333%_-_40px)]',
  5: 'min-[600px]:w-[calc(20%_-_48px)]',
}

/**
 * Brand logos up to 80px tall, three or five per row (two below 600px).
 */
export function LogoGallery({
  logos,
  columns = 5,
  caption,
  wide = true,
}: {
  logos: Logo[]
  columns?: 3 | 5
  caption?: string
  /** Span the wide column (default) or fill the parent. */
  wide?: boolean
}) {
  return (
    <figure
      className={clsx(
        wide && containerClasses.wide,
        'mb-15 flex flex-wrap justify-center gap-15 max-sm:px-[13.5vw]'
      )}
    >
      {logos.map((logo) => (
        <figure
          key={logo.src}
          className={clsx(
            'relative m-0 flex w-[calc(50%_-_30px)] grow-0 flex-col items-center justify-center',
            COLUMNS[columns]
          )}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            sizes="(max-width: 600px) 50vw, 200px"
            className="block h-auto max-h-20 w-auto max-w-full object-contain"
          />
        </figure>
      ))}
      {caption && (
        <figcaption className="mb-7.5 basis-full text-center text-2xs text-muted italic md:text-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
