import { clsx } from 'clsx'
import { getStudioImage, getStudioSrcSet } from '@/utils/studio-helpers'

export interface ImageProps {
  /** Studio key, e.g. `/uploads/2021/02/photo.jpg`. */
  src: string
  alt?: string | undefined
  /** Intrinsic size, as the WordPress markup declared it. */
  width?: number | undefined
  height?: number | undefined
  /**
   * Keep the declared width:height ratio after the file loads. WordPress's
   * resized copies round to their own sizes (525×700); Studio's do not.
   */
  keepRatio?: boolean | undefined
  /** `sizes` attribute (defaults to WordPress's `(max-width: Wpx) 100vw, Wpx`). */
  sizes?: string | undefined
  /** Studio variant used as the fallback `src`. */
  size?: 'small' | 'medium' | 'large' | 'full' | undefined
  /** Emit a responsive srcset from the Studio variants (default true). */
  srcSet?: boolean
  rounded?: string | undefined
  aspect?: string | undefined
  className?: string | undefined
  lazy?: boolean | undefined
}

/** Plain `<img>` backed by Gallop Studio (`next/image` is not used). */
export function Image({
  src,
  alt = '',
  width,
  height,
  keepRatio = false,
  sizes,
  size = 'full',
  srcSet = true,
  rounded = 'rounded-none',
  aspect,
  className,
  lazy = true,
}: ImageProps) {
  const studio = getStudioImage(src, size)
  const w = width ?? studio?.width
  const h = height ?? studio?.height
  const set = srcSet ? getStudioSrcSet(src) : undefined

  return (
    <img
      src={studio?.url || src}
      {...(set && {
        srcSet: set,
        sizes: sizes || (w ? `(max-width: ${w}px) 100vw, ${w}px` : '100vw'),
      })}
      alt={alt}
      width={w}
      height={h}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      {...(keepRatio && w && h && { style: { aspectRatio: `${w} / ${h}` } })}
      className={clsx(rounded, aspect, className)}
    />
  )
}
