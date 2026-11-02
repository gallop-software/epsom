import { clsx } from 'clsx'
import type { ReactNode } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/** Theme heading scale: ≤860 / 861–1023 / 1024–1200 / ≥1201. */
const HEADING_SIZE: Record<HeadingLevel, string> = {
  h1: 'text-4xl md:text-[48px] lg:text-6xl xl:text-7xl',
  h2: 'text-[30px] lg:text-5xl',
  h3: 'text-[22px] lg:text-3xl',
  h4: 'text-lg lg:text-xl',
  h5: 'text-sm',
  h6: 'text-lg italic',
}

export interface HeadingProps {
  /** Semantic element. */
  as?: HeadingLevel
  /** Visual scale; defaults to `as`. */
  styleAs?: HeadingLevel
  id?: string | undefined
  /** Text colour class (default `text-contrast-light`). */
  color?: string | undefined
  margin?: string | undefined
  fontSize?: string | undefined
  fontWeight?: string | undefined
  /** Letter spacing (default the theme's 2px). */
  letterSpacing?: string | undefined
  /** Line height (default the theme's 1.2). */
  lineHeight?: string | undefined
  /** Font family (default Oswald). */
  fontFamily?: string | undefined
  /** Uppercase, as every theme heading is (default true). */
  uppercase?: boolean
  textAlign?: string | undefined
  className?: string | undefined
  children?: ReactNode
}

/** Oswald, bold, uppercase, 2px tracking, line-height 1.2, 30px bottom margin. */
export function Heading({
  as: Component = 'h2',
  styleAs,
  id,
  color = 'text-contrast-light',
  margin = 'mb-7.5',
  fontSize,
  fontWeight = 'font-bold',
  letterSpacing = 'tracking-heading',
  lineHeight = 'leading-heading',
  fontFamily = 'font-heading',
  uppercase = true,
  textAlign,
  className,
  children,
}: HeadingProps) {
  return (
    <Component
      id={id}
      className={clsx(
        fontFamily,
        uppercase && 'uppercase',
        letterSpacing,
        fontSize || HEADING_SIZE[styleAs || Component],
        lineHeight,
        fontWeight,
        color,
        margin,
        textAlign,
        className
      )}
    >
      {children}
    </Component>
  )
}
