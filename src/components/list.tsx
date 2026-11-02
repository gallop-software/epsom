import { clsx } from 'clsx'
import type { ReactNode } from 'react'

/** Bulleted list: 30px indent, 28px bottom margin. */
export function List({
  bullets = true,
  spacing = 'default',
  margin = 'mb-7',
  className,
  children,
}: {
  /** Disc bullets with the 30px indent (default) or a bare list. */
  bullets?: boolean
  /** `medium`: 20px between items (the theme's medium-spacing list). */
  spacing?: 'default' | 'medium' | undefined
  margin?: string | undefined
  className?: string | undefined
  children?: ReactNode
}) {
  return (
    <ul
      className={clsx(
        bullets ? 'ml-7.5 list-outside list-disc' : 'list-none',
        spacing === 'medium' && '[&>li]:mb-5 [&>li:last-child]:mb-0',
        margin,
        className
      )}
    >
      {children}
    </ul>
  )
}

export function Li({
  className,
  children,
}: {
  className?: string | undefined
  children?: ReactNode
}) {
  return <li className={clsx(className || 'mb-[5px]')}>{children}</li>
}
