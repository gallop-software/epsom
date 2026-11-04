import { clsx } from 'clsx'
import type { ReactNode } from 'react'

export interface ParagraphProps {
  id?: string | undefined
  role?: string | undefined
  /** Text colour class (inherits by default). */
  color?: string | undefined
  /** Font size class (inherits the 17px body size by default). */
  fontSize?: string | undefined
  fontWeight?: string | undefined
  margin?: string | undefined
  lineHeight?: string | undefined
  textAlign?: string | undefined
  className?: string | undefined
  children?: ReactNode
}

/** Body paragraph: Muli light, 28px bottom margin, underlined links. */
export function Paragraph({
  id,
  role,
  color,
  fontSize,
  fontWeight,
  margin = 'mb-7',
  lineHeight,
  textAlign,
  className,
  children,
}: ParagraphProps) {
  return (
    <p
      id={id}
      role={role}
      className={clsx(
        '[&_a]:underline',
        fontSize,
        fontWeight,
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
