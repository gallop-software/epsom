'use client'

import { clsx } from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type Hls from 'hls.js'
import { studioUrl } from '@/utils/studio-helpers'
import { useActiveVideo } from '@/hooks/use-active-video'

type HlsVideoProps = {
  /** Media path of the HLS master playlist, e.g. "/videos/intro-hls/master.m3u8" */
  src: string
  /** Media path of the poster image shown before the first segment arrives */
  poster?: string
  id?: string
  className?: string
  aspectRatio?: string // e.g. "16/9"
  controls?: boolean
  muted?: boolean
  loop?: boolean
  /** Play when scrolled into view and pause when scrolled out */
  autoplay?: boolean
  /** Fill the positioned parent, cropping to cover, instead of keeping `aspectRatio` */
  fill?: boolean
  'aria-label'?: string
}

export function HlsVideo({
  src,
  poster,
  id,
  className,
  aspectRatio = '16/9',
  controls = true,
  muted = true,
  loop = true,
  autoplay = true,
  fill = false,
  'aria-label': ariaLabel,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hlsRef = useRef<Hls | null>(null)
  const [ready, setReady] = useState(false)
  // Whether the element has been attached to its player, which happens the
  // first time it is in view and is never undone (see the attach effect).
  const attachedRef = useRef(false)
  // Whether hls.js is currently fetching; it is halted out of view.
  const loadingRef = useRef(false)

  // `inView` drives attach and play/pause. `preload` latches well before the
  // video scrolls into view so hls.js and the playlist load ahead of time;
  // segments wait for the first time the video is in view.
  const { ref: inViewRef, inView } = useInView({ threshold: 0.25 })
  const { ref: preloadRef, inView: preload } = useInView({
    triggerOnce: true,
    rootMargin: '800px 0px',
  })

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      inViewRef(node)
      preloadRef(node)
    },
    [inViewRef, preloadRef]
  )

  // Only one video on the page plays at a time; this says whether it is us.
  const isActive = useActiveVideo(inView && autoplay)

  const playlistUrl = studioUrl(src)
  // The full-size poster: it is the video's first frame, and the frame is
  // 2048 device pixels wide on a Retina display, so the 1400px thumbnail
  // would be softer than the video it hands over to.
  const posterUrl = poster ? studioUrl(poster, 'full') : undefined

  // Load the playlist once latched. hls.js is preferred wherever Media Source
  // Extensions exist, because Android Chrome's built-in HLS is poor at
  // switching quality. That includes Safari, which has ManagedMediaSource;
  // handing Safari the playlist natively made the page sluggish. Safari
  // without any MSE plays the playlist natively. hls.js is loaded on demand
  // so it stays out of the initial bundle.
  //
  // Memory is kept small on purpose: two of these looping on an iPhone
  // crashed the tab. The element is attached only once it has been in view
  // (the effect after this one), fetching halts while it is out of view,
  // and the buffers are short. The default back buffer is unbounded, which
  // on a looping video kept the whole stream in memory. Quality is sized to
  // the player's full pixel size: 720p on a phone.
  useEffect(() => {
    if (!preload) return
    const video = videoRef.current
    if (!video) return

    let cancelled = false

    import('hls.js').then(({ default: HlsLib }) => {
      if (cancelled) return
      if (HlsLib.isSupported()) {
        const hls = new HlsLib({
          capLevelToPlayerSize: true,
          maxBufferLength: 15,
          maxMaxBufferLength: 30,
          backBufferLength: 10,
          autoStartLoad: false,
        })
        hlsRef.current = hls
        hls.loadSource(playlistUrl)
        hls.on(HlsLib.Events.MANIFEST_PARSED, () => setReady(true))

        // Safari sometimes closes or faults its ManagedMediaSource mid-play
        // (WebKit bugs hls.js works around), and hls.js recovers by detaching
        // and reattaching the element, which calls load() on it: the video
        // snaps back to its poster and comes back paused. hls.js restores the
        // position; this restores whether it was playing and whether it had
        // sound, so the recovery passes unnoticed. The state is read while
        // detaching, before load() wipes it. A fresh attach has nothing to
        // restore, and the detach on unmount is never followed by an attach.
        let restore: { playing: boolean; muted: boolean } | null = null
        hls.on(HlsLib.Events.MEDIA_DETACHING, () => {
          restore = { playing: !video.paused, muted: video.muted }
        })
        hls.on(HlsLib.Events.MEDIA_ATTACHED, () => {
          if (!restore) return
          const { playing, muted: wasMuted } = restore
          restore = null
          video.muted = wasMuted
          if (playing) video.play().catch(() => {})
        })
        // hls.js retries loads on its own; once it gives up (a CDN outage
        // longer than its retries, a decoder fault) it stops for good and the
        // poster stays. Try the recovery hls.js documents, once per player,
        // so a dead stream cannot loop.
        let recovered = false
        hls.on(HlsLib.Events.ERROR, (_, data) => {
          const reason = data.error?.message || data.reason || data.details
          if (
            data.details === HlsLib.ErrorDetails.MEDIA_SOURCE_REQUIRES_RESET
          ) {
            console.warn('HLS: media source reset, recovering:', reason)
            return
          }
          if (!data.fatal) return
          if (recovered) {
            console.warn('HLS: fatal error, giving up:', reason)
            return
          }
          recovered = true
          console.warn('HLS: fatal error, recovering once:', reason)
          if (data.type === HlsLib.ErrorTypes.NETWORK_ERROR) {
            hls.startLoad(video.currentTime)
          } else if (data.type === HlsLib.ErrorTypes.MEDIA_ERROR) {
            hls.recoverMediaError()
          }
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = playlistUrl
        setReady(true)
      }
    })

    return () => {
      cancelled = true
      hlsRef.current?.destroy()
      hlsRef.current = null
      attachedRef.current = false
      loadingRef.current = false
      // A new player must parse its own manifest before it is attached.
      setReady(false)
    }
  }, [preload, playlistUrl])

  // Attach the element to its player the first time it is in view, and
  // keep it attached: fetching halts while it is out of view and resumes
  // where it left off on return. Detaching and reattaching on every pass
  // (an earlier version) rebuilt a ManagedMediaSource each time, with a
  // seek into the fresh one, and an iPhone crashed on scrolling past both
  // videos and back. Loading is started by hand (autoStartLoad is off) so
  // nothing is fetched for a video that has never been seen.
  useEffect(() => {
    const video = videoRef.current
    const hls = hlsRef.current
    if (!video || !hls || !ready) return
    if (inView) {
      if (!attachedRef.current) {
        hls.attachMedia(video)
        attachedRef.current = true
      }
      if (!loadingRef.current) {
        hls.startLoad()
        loadingRef.current = true
      }
    } else if (loadingRef.current) {
      hls.stopLoad()
      loadingRef.current = false
    }
  }, [inView, ready])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !ready || !autoplay) return
    if (inView && isActive) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [inView, isActive, ready, autoplay])

  const [w, h] = aspectRatio.split('/').map(Number)

  return (
    <div
      id={id}
      ref={setRefs}
      className={clsx(
        className,
        fill ? 'absolute inset-0' : 'relative',
        'overflow-hidden'
      )}
      style={fill ? undefined : { aspectRatio: `${w || 16} / ${h || 9}` }}
    >
      <video
        ref={videoRef}
        poster={posterUrl}
        controls={controls}
        muted={muted}
        loop={loop}
        playsInline
        preload="none"
        aria-label={ariaLabel}
        className={clsx(
          'absolute inset-0 h-full w-full',
          fill && 'object-cover'
        )}
      />
    </div>
  )
}
