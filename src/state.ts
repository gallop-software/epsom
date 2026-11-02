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
})

export { state, useSnapshot, subscribe, proxy }
