'use client'

import { useEffect, useId } from 'react'
import { state, useSnapshot } from '@/state'

let claimedThisFrame = false

/**
 * Claims the page's single "active video" slot (`state.activeVideoId`) for
 * this player while `wantsToPlay` is true, and says whether it holds it.
 *
 * Only one video plays at a time: the most recently scrolled-to one takes
 * the slot and whoever held it pauses. A video releases the slot when it
 * leaves view, and a still-visible video that lost the slot claims it back
 * once it is free, so scrolling back up to a video that never left view
 * resumes it.
 *
 * Claims that land in the same frame, as when two videos are already on
 * screen at page load, are not a scroll: the first keeps the slot, and
 * effects run in page order, so the top video wins.
 */
export function useActiveVideo(wantsToPlay: boolean): boolean {
  const id = useId()
  const snap = useSnapshot(state)

  // Take over on entering view; release on leaving it.
  useEffect(() => {
    if (wantsToPlay) {
      if (claimedThisFrame && state.activeVideoId !== null) return
      state.activeVideoId = id
      claimedThisFrame = true
      requestAnimationFrame(() => {
        claimedThisFrame = false
      })
    } else if (state.activeVideoId === id) {
      state.activeVideoId = null
    }
  }, [wantsToPlay, id])

  // Reclaim a slot that became free while still in view.
  useEffect(() => {
    if (wantsToPlay && snap.activeVideoId === null) state.activeVideoId = id
  }, [snap.activeVideoId, wantsToPlay, id])

  useEffect(() => {
    return () => {
      if (state.activeVideoId === id) state.activeVideoId = null
    }
  }, [id])

  return snap.activeVideoId === id
}
