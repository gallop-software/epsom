'use client'

import type { MouseEvent, ReactNode } from 'react'
import { buttonClasses, type ButtonStyleProps } from '@/components/button'
import { openCalendly } from '@/utils/calendly'

/**
 * Theme button that opens the Calendly "free estimate" popup. With `href` it
 * is a link to that page, which the popup replaces when JavaScript runs.
 */
export function CalendlyButton({
  href,
  children,
  ...style
}: ButtonStyleProps & { href?: string; children?: ReactNode }) {
  if (href) {
    const open = (event: MouseEvent) => {
      event.preventDefault()
      openCalendly()
    }
    return (
      <a
        href={href}
        onClick={open}
        className={buttonClasses(style)}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      type="button"
      onClick={openCalendly}
      className={buttonClasses(style)}
    >
      {children}
    </button>
  )
}
