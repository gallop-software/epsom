import type { ReactNode } from 'react'
import { Icon } from '@/components/icon'

/** Row of large linked icons with a caption (the theme's hover-icons), centred in a 500px column. */
export function ContactIcons({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto block max-w-[500px] justify-center sm:flex">
      {children}
    </div>
  )
}

export interface ContactIconProps {
  icon: { body: string; width?: number; height?: number }
  href: string
  children: ReactNode
}

export function ContactIcon({ icon, href, children }: ContactIconProps) {
  return (
    <div className="mb-15 w-full transition-all duration-150 ease-linear hover:scale-110 sm:mb-0 sm:max-w-1/3 sm:flex-auto sm:p-[25px] sm:first:pl-0 sm:last:pr-0 lg:max-w-none lg:flex-1">
      <a
        href={href}
        aria-hidden="true"
        tabIndex={-1}
        className="flex h-12.5 items-center justify-center text-accent2 lg:h-[70px]"
      >
        <Icon
          icon={icon}
          className="h-9 w-9 lg:h-[52px] lg:w-[52px]"
        />
      </a>
      <p className="mt-[15px] mb-0 text-center text-xs sm:mt-7.5 lg:mt-10 [&_a]:highlight-link [&_a]:font-bold [&_a]:text-accent2 [&_a]:hover:text-accent2-light!">
        <a href={href}>{children}</a>
      </p>
    </div>
  )
}
