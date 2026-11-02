import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { Image } from '@/components/image'
import { studioUrl } from '@/utils/studio-helpers'

interface SectionProps {
  id?: string
  /** Background, padding and text colour classes. */
  className?: string
  /** Max-width class of the centred inner column. */
  maxWidth?: string
  /** Studio key of an image laid over the background. */
  imageSrc?: string
  /** Classes of that image (default `opacity-50`). */
  imageClassName?: string
  /** Draw `imageSrc` as an `<img>` (default) or a CSS background (cover). */
  imageMode?: 'img' | 'background'
  /** Background position of a parallax image (default `bg-center`). */
  imagePosition?: string
  /** Show `imageSrc` as a fixed background from 861px (parallax). */
  parallax?: boolean
  /** Overlay laid over a parallax background, e.g. `bg-body-light/60`. */
  overlayColor?: string
  children: ReactNode
}

/** Full-width section with an optional background image or pattern. */
export function Section({
  id,
  className,
  maxWidth,
  imageSrc,
  imageClassName = 'opacity-50',
  imageMode = 'img',
  imagePosition = 'bg-center',
  parallax = false,
  overlayColor,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        'relative',
        parallax && ['bg-cover bg-no-repeat md:bg-fixed', imagePosition],
        className
      )}
      style={
        parallax && imageSrc
          ? { backgroundImage: `url(${studioUrl(imageSrc, 'full')})` }
          : undefined
      }
    >
      {imageSrc && !parallax && imageMode === 'background' && (
        <div
          className={clsx(
            'absolute inset-0 bg-cover bg-center bg-no-repeat',
            imageClassName
          )}
          style={{ backgroundImage: `url("${studioUrl(imageSrc, 'full')}")` }}
        />
      )}
      {imageSrc && !parallax && imageMode === 'img' && (
        <Image
          src={imageSrc}
          alt=""
          srcSet={false}
          className={clsx(
            'absolute inset-0 h-full w-full object-cover',
            imageClassName
          )}
        />
      )}
      {overlayColor && (
        <div className={clsx('absolute inset-0', overlayColor)} />
      )}
      <div className={clsx('relative mx-auto', maxWidth)}>{children}</div>
    </section>
  )
}
