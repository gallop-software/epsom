'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import chevronRightIcon from '@iconify/icons-lucide/chevron-right'
import type { ReactNode } from 'react'
import { Icon } from '@/components/icon'

/** One accordion row (the theme's Genesis accordion): a navy question with a chevron that turns when open. */
export function Details({
  summary,
  open = false,
  children,
}: {
  summary: ReactNode
  open?: boolean | undefined
  children?: ReactNode | undefined
}) {
  return (
    <Disclosure
      as="div"
      defaultOpen={open}
      className="relative mb-[1.2em] [&+&]:-mt-[0.6em]"
    >
      <DisclosureButton className="group relative block w-full cursor-pointer py-2.5 pl-7.5 text-left text-lg font-light text-accent2">
        <Icon
          icon={chevronRightIcon}
          className="absolute top-[15px] -left-1 h-5 w-5 transition-transform duration-200 group-data-[open]:rotate-90"
        />
        {summary}
      </DisclosureButton>
      <DisclosurePanel className="py-2.5 pl-7.5">{children}</DisclosurePanel>
    </Disclosure>
  )
}
