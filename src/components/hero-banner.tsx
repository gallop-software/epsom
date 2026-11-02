import arrowLongDownIcon from '@iconify/icons-heroicons/arrow-long-down'
import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { Icon } from '@/components/icon'
import { studioUrl } from '@/utils/studio-helpers'

export interface HeroBannerProps {
  /** Studio key of the background photo. */
  image: string
  /** Bottom-left caption (desktop) / centred under the content (≤1023px). */
  caption?: string | undefined
  /** Scrim opacity over the photo (default `opacity-50`). */
  dim?: string | undefined
  /** Scrim colour (default `bg-overlay`, black). */
  overlayColor?: string | undefined
  /** Anchor for the bobbing down arrow at the bottom (none by default). */
  downLink?: string | undefined
  children?: ReactNode
}

/**
 * Full-viewport photo hero with a chevron bottom edge (auto height
 * below 1024px).
 */
export function HeroBanner({
  image,
  caption,
  dim = 'opacity-50',
  overlayColor = 'bg-overlay',
  downLink,
  children,
}: HeroBannerProps) {
  return (
    <section
      className={clsx(
        'relative z-1 flex w-full items-center overflow-hidden bg-overlay',
        'min-h-100 py-17.5 lg:h-screen lg:min-h-0 lg:pt-header lg:pb-0',
        '[@media(max-height:600px)]:h-auto [@media(max-height:600px)]:min-h-100',
        '[clip-path:polygon(0_0,100%_0,100%_calc(100%_-_40px),50%_100%,0_calc(100%_-_40px))]',
        'md:[clip-path:polygon(0_0,100%_0,100%_calc(100%_-_60px),50%_100%,0_calc(100%_-_60px))]'
      )}
    >
      <div
        className="absolute inset-0 -z-2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${studioUrl(image, 'full')}")` }}
      />
      <div className={clsx('absolute inset-0 z-1', overlayColor, dim)} />
      <div className="relative z-2 w-full px-[5%] lg:[@media(max-height:600px)]:py-17.5">
        <div className="mx-auto max-w-[1120px] [&>:last-child]:mb-0">
          {children}
          {caption && (
            <p className="mx-auto mt-10 text-center text-xs font-bold text-overlay-text italic opacity-70 lg:hidden">
              {caption}
            </p>
          )}
        </div>
      </div>
      {caption && (
        <p
          className={clsx(
            'absolute bottom-[14%] left-[5%] z-1 hidden max-w-[260px] text-left text-xs font-bold text-overlay-text italic opacity-70 lg:block',
            "before:absolute before:-top-[75px] before:left-[15px] before:h-12.5 before:w-12.5 before:-skew-y-45 before:border-t-[3px] before:border-l-2 before:border-solid before:border-overlay-text before:content-['']",
            "after:absolute after:-top-[103px] after:left-15 after:h-2.5 after:w-2.5 after:rounded-full after:bg-accent after:content-['']"
          )}
        >
          {caption}
        </p>
      )}
      {downLink && (
        <div className="absolute right-0 bottom-10 left-0 z-2 m-0 flex justify-center sm:bottom-12.5">
          <a
            href={downLink}
            aria-label="Scroll down"
            className="block h-12.5 w-12.5 animate-mover cursor-pointer p-0 text-center text-overlay-text transition-all duration-400"
          >
            <Icon
              icon={arrowLongDownIcon}
              className="inline-block h-10 w-10 align-middle [&_path]:stroke-1"
            />
          </a>
        </div>
      )}
    </section>
  )
}
