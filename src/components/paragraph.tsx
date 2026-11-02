import { clsx } from 'clsx'
import type { ReactNode } from 'react'

export interface ParagraphProps {
  id?: string | undefined
  /** Text colour class (inherits by default). */
  color?: string | undefined
  /** Font size class (inherits the 17px body size by default). */
  fontSize?: string | undefined
  margin?: string | undefined
  lineHeight?: string | undefined
  textAlign?: string | undefined
  className?: string | undefined
  children?: ReactNode
}

/** Body paragraph: Muli light, 28px bottom margin, underlined links. */
export function Paragraph({
  id,
  color,
  fontSize,
  margin = 'mb-7',
  lineHeight,
  textAlign,
  className,
  children,
}: ParagraphProps) {
  return (
    <p
      id={id}
      className={clsx(
        '[&_a]:underline',
        fontSize,
        lineHeight,
        color,
        margin,
        textAlign,
        className
      )}
    >
      {children}
    </p>
  )
}
