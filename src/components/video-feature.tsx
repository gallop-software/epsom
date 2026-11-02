import type { ReactNode } from 'react'
import { HlsVideo } from '@/components/hls-video'
import { studioUrl } from '@/utils/studio-helpers'

export interface VideoFeatureProps {
  /** Studio key of the video's HLS master playlist. */
  src: string
  /** Studio key of the poster shown until the video plays. */
  poster: string
  /** Accessible name of the video. */
  title: string
  /** Studio key of the dotted pattern drawn behind the video. */
  pattern: string
  /** Text beside the video. */
  children?: ReactNode
}

/**
 * Streamed video on a dotted backdrop beside a text column; stacked below
 * 861px. It plays muted while in view, and with sound from the hero play
 * button.
 */
export function VideoFeature({
  src,
  poster,
  title,
  pattern,
  children,
}: VideoFeatureProps) {
  return (
    <div className="flex flex-col items-center gap-10 md:flex-row lg:gap-20">
      <div className="relative w-full md:flex-1 md:basis-0">
        <div
          className="absolute bottom-7.5 left-2.5 h-full w-full bg-repeat sm:bottom-10 sm:left-5 lg:left-10"
          style={{ backgroundImage: `url("${studioUrl(pattern, 'full')}")` }}
        />
        <HlsVideo
          src={src}
          poster={poster}
          aria-label={title}
        />
      </div>
      <div className="w-full md:flex-1 md:basis-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
