'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { state } from '@/state'

const SmoothScroll = () => {
  const offset = 30
  const pathname = usePathname()

  useEffect(() => {
    const smoothScroll = (hash: string) => {
      const targetElement = document.querySelector(hash)
      if (targetElement) {
        state.scrollingDirection = 'down'
        state.lockScrollDirection = true

        // Unlock after scroll completes
        window.addEventListener(
          'scrollend',
          () => {
            state.lockScrollDirection = false
          },
          { once: true }
        )

        // The theme's anchor offset: 30px, plus the header while it is fixed,
        // plus 60px for `.large-anchor-offset` targets.
        const header = document.querySelector<HTMLElement>('.site-header')
        const headerOffset =
          header && getComputedStyle(header).position === 'fixed'
            ? header.offsetHeight
            : 0
        const large =
          targetElement.classList.contains('large-anchor-offset') ||
          targetElement.parentElement?.classList.contains('large-anchor-offset')
        const scrollOffset = offset + headerOffset + (large ? 60 : 0)

        window.scrollTo({
          top:
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            scrollOffset,
          behavior: 'smooth',
        })

        history.pushState(null, '', hash)
      }
    }

    // Main links: preventDefault for smooth scroll
    const handleMainClick = (event: MouseEvent) => {
      const anchor = event.currentTarget as HTMLAnchorElement
      const hash = anchor.hash
      if (!hash) return

      const targetElement = document.querySelector(hash)
      if (targetElement) {
        event.preventDefault()
        smoothScroll(hash)
      }
    }

    // Header links: no preventDefault (allows CloseButton to work)
    const handleHeaderClick = (event: MouseEvent) => {
      const anchor = event.currentTarget as HTMLAnchorElement
      const hash = anchor.hash
      if (!hash) return

      smoothScroll(hash)
    }

    const attachListeners = () => {
      const mainLinks = document.querySelectorAll<HTMLAnchorElement>(
        'body main a[href^="#"]:not(.no-anchor-scroll)'
      )
      const headerLinks = document.querySelectorAll<HTMLAnchorElement>(
        'body header a[href^="#"]:not(.no-anchor-scroll)'
      )

      mainLinks.forEach((link) => {
        if (!link.dataset.smoothScrollAttached) {
          link.addEventListener('click', handleMainClick)
          link.dataset.smoothScrollAttached = 'true'
        }
      })

      headerLinks.forEach((link) => {
        if (!link.dataset.smoothScrollAttached) {
          link.addEventListener('click', handleHeaderClick)
          link.dataset.smoothScrollAttached = 'true'
        }
      })
    }

    // Initial attachment
    attachListeners()

    // Observe for new links being added to DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        attachListeners() // Re-attach to any new anchors
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      // Clean up MutationObserver
      observer.disconnect()

      // Clean up listeners
      const mainLinks = document.querySelectorAll<HTMLAnchorElement>(
        'body main a[href^="#"]:not(.no-anchor-scroll)'
      )
      const headerLinks = document.querySelectorAll<HTMLAnchorElement>(
        'body header a[href^="#"]:not(.no-anchor-scroll)'
      )

      mainLinks.forEach((link) => {
        if (link.dataset.smoothScrollAttached) {
          link.removeEventListener('click', handleMainClick)
          delete link.dataset.smoothScrollAttached
        }
      })

      headerLinks.forEach((link) => {
        if (link.dataset.smoothScrollAttached) {
          link.removeEventListener('click', handleHeaderClick)
          delete link.dataset.smoothScrollAttached
        }
      })
    }
  }, [pathname])

  return null
}

export default SmoothScroll
