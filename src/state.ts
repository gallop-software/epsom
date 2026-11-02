import { proxy, useSnapshot, subscribe } from 'valtio'

const state = proxy({
  offsetTop: 0,
  windowHeight: 0,
  lastOffsetTop: 0,
  isScrolling: false,
  dialogOpen: false,
  scrollingDirection: 'down',
  lastScrollingDirection: 'down',
  lockScrollDirection: false,
  // Id of the video allowed to play: one at a time (see use-active-video).
  activeVideoId: null as string | null,
})

export { state, useSnapshot, subscribe, proxy }
