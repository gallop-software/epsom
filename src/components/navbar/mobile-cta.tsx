'use client'

import arrowLongRightIcon from '@iconify/icons-heroicons/arrow-long-right'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { Icon } from '@/components/icon'
import { openCalendly } from '@/utils/calendly'

/**
 * Below 1024px: a yellow "Schedule Free Estimate" bar that slides up from
 * the bottom once the page has scrolled 600px. Also opens the scheduler for
 * links to `?action=schedule`.
 */
export function MobileCta() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    if (window.location.search.includes('action=schedule')) openCalendly()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Schedule"
      className={clsx(
        'fixed bottom-0 left-0 z-9 w-full bg-body transition-all duration-400 lg:hidden',
        shown ? 'translate-y-0 shadow-mobile-cta' : 'translate-y-full'
      )}
    >
      <button
        type="button"
        onClick={openCalendly}
        className="block w-full cursor-pointer bg-accent px-5 pt-3 pb-3.75 text-center font-heading text-base leading-[1.2] font-normal tracking-button text-accent-contrast transition-all duration-400"
      >
        <span>
          {'Book a Free Estimate '}
          <Icon
            icon={arrowLongRightIcon}
            className="inline-block h-5 w-5 align-middle"
          />
        </span>
      </button>
    </nav>
  )
}
