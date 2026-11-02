import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { Image } from '@/components/image'

/**
 * "sticky-scroll" section: from 1024px each image sticks at 40% width under
 * the header while its 60% panel scrolls past; below 1024px they stack.
 */
export function StickyScroll({ children }: { children?: ReactNode }) {
  return <div className="flow-root bg-body">{children}</div>
}

export interface StickyImageProps {
  /** Studio key. */
  src: string
  alt?: string | undefined
  caption?: string | undefined
  /** Caption corner: bottom right (default) or bottom left. */
  captionAlign?: 'left' | 'right' | undefined
}

export function StickyImage({
  src,
  alt,
  caption,
  captionAlign = 'right',
}: StickyImageProps) {
  const left = captionAlign === 'left'
  return (
    <figure className="relative z-1 mb-0 h-[calc(var(--viewport-height,100vh)*0.7)] w-full overflow-hidden lg:sticky lg:top-header lg:float-left lg:h-screen-header lg:w-2/5 [.scroll-panel+&]:clear-both">
      <Image
        src={src}
        alt={alt}
        sizes="(max-width: 1023px) 100vw, 40vw"
        className="h-full w-full object-cover object-center"
      />
      {caption && (
        <figcaption
          className={clsx(
            'absolute bottom-[14%] z-1 m-0 block max-w-[260px] p-0 text-xs font-bold text-overlay-text italic opacity-70',
            "before:absolute before:-top-[75px] before:h-12.5 before:w-12.5 before:border-t-[3px] before:border-solid before:border-overlay-text before:content-['']",
            "after:absolute after:-top-[103px] after:h-2.5 after:w-2.5 after:rounded-full after:bg-accent after:content-['']",
            left
              ? // only left captions widen to 90% at ≤860px (the theme's rule order)
                'left-[5%] text-left max-md:max-w-[90%] before:left-[15px] before:-skew-y-45 before:border-l-2 after:left-15'
              : 'right-[5%] text-right before:right-[15px] before:skew-y-45 before:border-r-2 after:right-15'
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export interface ScrollPanelProps {
  /**
   * Highlighted panel: solid background with the dot-wave pattern instead of
   * the accent bar and the grey fade at the bottom.
   */
  highlight?: boolean
  /** Background colour class (default `bg-body` for highlighted panels). */
  bgColor?: string | undefined
  /** Studio key of the pattern drawn over a highlighted panel. */
  pattern?: string | undefined
  /** Opacity class of the pattern (default `opacity-10`). */
  patternOpacity?: string | undefined
  children?: ReactNode
}

export function ScrollPanel({
  highlight = false,
  bgColor,
  pattern,
  patternOpacity = 'opacity-10',
  children,
}: ScrollPanelProps) {
  return (
    <div
      className={clsx(
        'scroll-panel relative w-full py-25 lg:float-right lg:min-h-screen-header lg:w-3/5 lg:pt-75 lg:pb-22.5',
        bgColor,
        !highlight &&
          "after:absolute after:bottom-0 after:h-22.5 after:w-full after:bg-linear-to-b after:from-body after:from-50% after:to-body2 after:content-['']"
      )}
    >
      {highlight && pattern && (
        <div className="absolute inset-0 z-0">
          <Image
            src={pattern}
            alt=""
            srcSet={false}
            className={clsx('h-full w-full object-cover', patternOpacity)}
          />
        </div>
      )}
      <div
        className={clsx(
          !highlight &&
            "relative after:absolute after:top-0 after:left-0 after:block after:h-full after:w-3.5 after:bg-accent after:content-[''] max-sm:after:hidden"
        )}
      >
        <div className="relative mx-auto max-w-[850px] px-[10%] lg:m-0 lg:px-25 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  )
}
