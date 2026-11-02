import { clsx } from 'clsx'
import type { ReactNode } from 'react'

export interface QuoteProps {
  /** `large`: 38 / 28 / 22px instead of 26 / 24 / 22px. */
  size?: 'default' | 'large' | undefined
  /** Attribution, rendered as `<cite>`. */
  cite?: ReactNode
  /** Colour of the large opening quote mark (default `text-body-light`). */
  iconColor?: string | undefined
  margin?: string | undefined
  className?: string | undefined
  children?: ReactNode
}

/**
 * Theme blockquote: Oswald italic 22 / 24 / 26px with a large "leftquote"
 * mark behind the text and an accent2 citation.
 */
export function Quote({
  size = 'default',
  cite,
  iconColor = 'before:text-body-light',
  margin,
  className,
  children,
}: QuoteProps) {
  const large = size === 'large'
  return (
    <blockquote
      className={clsx(
        'relative z-0 px-[10%] font-heading leading-normal font-normal text-contrast italic',
        "before:relative before:-left-10 before:-z-1 before:block before:h-0 before:font-quote before:text-[140px] before:font-normal before:not-italic before:content-['“'] md:before:-left-15 md:before:text-[200px] xl:before:-left-20 xl:before:text-[280px]",
        large
          ? 'py-0 text-[22px] md:text-3xl xl:px-[1em] xl:text-[38px] before:-top-2.5 md:before:-top-5 xl:before:-top-7.5 [&_p]:leading-[1.6]'
          : 'py-5 text-[22px] md:text-xl xl:px-10 xl:text-2xl before:-top-2.5 md:before:-top-5 xl:before:-top-12.5',
        iconColor,
        margin ?? (large ? 'my-17.5 xl:my-25' : 'my-12.5 xl:my-20'),
        className
      )}
    >
      <div className="relative [&>p]:mb-7">{children}</div>
      {cite && (
        <cite
          className={clsx(
            'relative block text-left text-accent2',
            large ? 'text-lg md:text-xl' : 'text-lg'
          )}
        >
          {cite}
        </cite>
      )}
    </blockquote>
  )
}
