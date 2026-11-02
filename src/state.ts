import { proxy, useSnapshot, subscribe } from 'valtio'

const state = proxy({
  playVideo: false,
  offsetTop: 0,
  windowHeight: 0,
  lastOffsetTop: 0,
  isScrolling: false,
  dialogOpen: false,
  scrollingDirection: 'down',
  lastScrollingDirection: 'down',
  lockScrollDirection: false,
  // Id of the video currently allowed to play. Only one plays at a time, so
  // concurrent autoplay attempts don't get blocked by the browser. Managed by
  // `useActiveVideo` in hooks/use-active-video.ts.
  activeVideoId: null as string | null,
})

export { state, useSnapshot, subscribe, proxy }
