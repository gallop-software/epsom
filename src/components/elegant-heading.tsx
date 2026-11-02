import { clsx } from 'clsx'
import { containerClasses } from '@/components/container'

export interface ElegantHeadingProps {
  /** Bold first part, e.g. "Recent". */
  bold: string
  /** Light italic second part, e.g. "Projects". */
  light: string
  margin?: string | undefined
}

/**
 * Section heading with bold and light italic words, a faint bracket at the
 * left and a hairline running to the right.
 */
export function ElegantHeading({
  bold,
  light,
  margin = 'mt-25 mb-25',
}: ElegantHeadingProps) {
  return (
    <h2
      className={clsx(
        containerClasses.wide,
        'relative font-heading text-[30px] leading-heading font-bold tracking-heading text-contrast-light normal-case lg:text-5xl',
        "before:absolute before:top-[calc(50%_-_50px)] before:left-0 before:h-25 before:w-12.5 before:border-[5px] before:border-solid before:border-body-dark before:opacity-50 before:content-['']",
        "after:absolute after:bottom-[40%] after:left-0 after:h-px after:w-full after:bg-body-dark after:opacity-50 after:content-['']",
        margin
      )}
    >
      <strong className="relative z-1 bg-body">{`${bold} `}</strong>
      <em className="relative z-1 bg-body pr-7.5 font-light italic">{light}</em>
    </h2>
  )
}
