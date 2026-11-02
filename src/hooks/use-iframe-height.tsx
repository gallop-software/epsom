'use client'

import { useEffect } from 'react'

// ----------------------------------------------------------------------

// The height gallop.software's preview frame starts at.
const MAX_VIEWPORT_HEIGHT = 800

const IframeHeight = () => {
  useEffect(() => {
    // Only run if inside an iframe
    if (window.self === window.top) {
      return
    }

    // This frame grows to fit the page, so 100vh would grow with it and report
    // a taller page each time. Viewport-tall sections read this frozen value,
    // capped because a reloaded frame starts at the height it already grew to.
    document.documentElement.style.setProperty(
      '--viewport-height',
      `${Math.min(window.innerHeight, MAX_VIEWPORT_HEIGHT)}px`
    )

    const sendHeight = () => {
      const height = document.body.scrollHeight
      window.parent.postMessage(
        {
          type: 'height',
          value: height,
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
