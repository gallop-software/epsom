import { clsx } from 'clsx'
import Link from 'next/link'
import type { ReactNode } from 'react'

export type ButtonColor = 'accent' | 'accent2' | 'body'

export interface ButtonStyleProps {
  /** `fill` (solid background) or `outline` (2px border, transparent). */
  variant?: 'fill' | 'outline' | undefined
  /** Background colour for `fill`, border and text colour for `outline`. */
  color?: ButtonColor | undefined
  /** Offset border colour: `dark` (black) or `light` (white, "alternate" style). */
  offset?: 'dark' | 'light' | undefined
  /** Text colour class for `fill`, replacing the colour's own contrast text. */
  textColor?: string | undefined
  /** `large`: 20px text (the theme's large-font button group). */
  size?: 'default' | 'large' | undefined
  className?: string | undefined
}

const FILL: Record<ButtonColor, string> = {
  accent: 'bg-accent hover:bg-accent-light',
  accent2: 'bg-accent2 hover:bg-accent2-light',
  body: 'bg-body',
}

const FILL_TEXT: Record<ButtonColor, string> = {
  accent: 'text-accent-contrast',
  accent2: 'text-accent2-contrast',
  body: 'text-contrast',
}

const OUTLINE: Record<ButtonColor, string> = {
  accent: 'border-accent text-accent',
  accent2: 'border-accent2 text-accent2',
  body: 'border-body text-body',
}

/**
 * Theme button: Oswald 17px, a 1px offset border drawn 4px down-right that
 * slides under the button and fades out on hover.
 */
export function buttonClasses({
  variant = 'fill',
  color = 'accent',
  offset = 'dark',
  textColor,
  size = 'default',
  className,
}: ButtonStyleProps) {
  return clsx(
    'relative inline-block cursor-pointer text-center font-heading leading-none font-normal tracking-button no-underline transition-all duration-400',
    "after:absolute after:z-1 after:border after:border-solid after:transition-all after:duration-300 after:content-[''] hover:after:top-0 hover:after:left-0 hover:after:border-transparent",
    size === 'large' ? 'text-lg' : 'text-base',
    offset === 'light' ? 'after:border-body' : 'after:border-contrast-dark',
    variant === 'fill'
      ? [
          'px-6.5 py-3.5 after:top-1 after:left-1 after:h-full after:w-full',
          FILL[color],
          textColor ?? FILL_TEXT[color],
        ]
      : [
          'border-2 border-solid bg-transparent px-6.5 py-3 after:top-[3px] after:left-[3px] after:h-[calc(100%+3px)] after:w-[calc(100%+3px)]',
          OUTLINE[color],
        ],
    className
  )
}

export interface ButtonProps extends ButtonStyleProps {
  href: string
  children?: ReactNode
}

export function Button({ href, children, ...style }: ButtonProps) {
  return (
    <Link
      href={href}
      className={buttonClasses(style)}
    >
      {children}
    </Link>
  )
}
