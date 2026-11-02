import { clsx } from 'clsx'
import type { ReactNode } from 'react'

export type ContainerWidth = 'content' | 'wide'

/**
 * The theme's two column widths, relative to the full-width section:
 * content = 90% up to 640px, 750px from 1024px;
 * wide = content up to 860px, then 750 / 910 / 1040px, and 1120px from 1361px.
 */
export const containerClasses: Record<ContainerWidth, string> = {
  content: 'mx-auto w-[90%] max-w-[640px] lg:w-187.5 lg:max-w-none',
  wide: 'mx-auto w-[90%] max-w-[640px] md:w-187.5 md:max-w-none lg:w-227.5 xl:w-260 min-[1361px]:w-280',
}

export function Container({
  as: Component = 'div',
  width = 'content',
  id,
  className,
  children,
}: {
  as?: 'div' | 'section' | 'figure' | 'header'
  width?: ContainerWidth
  id?: string | undefined
  className?: string | undefined
  children?: ReactNode
}) {
  return (
    <Component
      id={id}
      className={clsx(containerClasses[width], className)}
    >
      {children}
    </Component>
  )
}
