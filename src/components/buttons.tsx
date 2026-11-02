import { clsx } from 'clsx'
import type { ReactNode } from 'react'

/** Wrapping row of buttons. */
export function Buttons({
  justify,
  margin,
  className,
  children,
}: {
  justify?: 'justify-center' | 'justify-start' | undefined
  margin?: string | undefined
  className?: string | undefined
  children?: ReactNode
}) {
  return (
    <div
      className={clsx(
        'flex flex-wrap items-center gap-[8.5px]',
        justify,
        margin,
        className
      )}
    >
      {children}
    </div>
  )
}
