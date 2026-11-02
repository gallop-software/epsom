'use client'

import { useEffect } from 'react'

/** Enables CSS transitions once the first frames have painted. */
export default function TransitionsReady() {
  useEffect(() => {
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() =>
        document.documentElement.classList.add('ready')
      )
    })
    return () => cancelAnimationFrame(frame)
  }, [])
  return null
}
