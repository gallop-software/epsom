'use client'

import { useEffect } from 'react'

// ----------------------------------------------------------------------

// The height gallop.software's preview frame starts at.
const PREVIEW_HEIGHT = 800

// True when a block preview has a section sticking at this width. Sticky needs
// something to scroll, so a frame grown to fit the block would never show it.
const needsOwnScroll = () =>
  window.location.pathname.startsWith('/block/') &&
  Array.from(document.querySelectorAll('[data-preview-scroll]')).some(
    (el) => getComputedStyle(el).position === 'sticky'
  )

const IframeHeight = () => {
  useEffect(() => {
    // Only run if inside an iframe
    if (window.self === window.top) {
      return
    }

    // This frame grows to fit the page, so 100vh would grow with it and report
    // a taller page each time. Viewport-tall sections read this fixed value,
    // not the frame's height, which depends on what it already grew to.
    document.documentElement.style.setProperty(
      '--viewport-height',
      `${PREVIEW_HEIGHT}px`
    )

    const sendHeight = () => {
      const scroll = needsOwnScroll()
      const height = scroll ? PREVIEW_HEIGHT : document.body.scrollHeight
      window.parent.postMessage(
        {
          type: 'height',
          value: height,
          scroll,
        },
        '*'
      )
    }

    // Send initial height
    sendHeight()

    // Watch for resizes
    const resizeObserver = new ResizeObserver(() => {
      sendHeight()
    })

    resizeObserver.observe(document.body)

    // Listen for height requests from parent
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'requestHeight') sendHeight()
    })

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return null
}

export default IframeHeight
