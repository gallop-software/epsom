'use client'

import { clsx } from 'clsx'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Container } from '@/components/container'
import { VideoFeature } from '@/components/video-feature'

export interface VideoFilterPanel {
  /** Anchor id of the panel (the hero play button links to the first). */
  id: string
  /** Tab label. */
  label: string
  /** Studio key of the video's HLS master playlist. */
  src: string
  /** Studio key of the poster shown until the video plays. */
  poster: string
  /** Accessible name of the video. */
  title: string
  /** Text beside the video. */
  children?: ReactNode
}

export interface VideoFilterProps {
  id: string
  /** Studio key of the dotted pattern drawn behind each video. */
  pattern: string
  panels: VideoFilterPanel[]
}

/**
 * Tabs that switch between video panels. Only the shown panel's video is in
 * view, so it is the one that plays (see HlsVideo).
 */
export function VideoFilter({ id, pattern, panels }: VideoFilterProps) {
  const [active, setActive] = useState(0)
  return (
    <>
      <Container>
        <div className="flex flex-wrap justify-center pb-2.5">
          {panels.map((panel, i) => (
            <button
              key={panel.id}
              type="button"
              onClick={() => setActive(i)}
              className={clsx(
                'relative inline-block cursor-pointer px-5 py-[9px] text-center font-heading text-[15px] leading-none font-normal tracking-button whitespace-normal transition-all duration-400',
                i === active && 'bg-accent text-accent-contrast'
              )}
            >
              {panel.label}
            </button>
          ))}
        </div>
      </Container>
      <Container
        width="wide"
        id={id}
        className="mt-15 md:mt-20"
      >
        {panels.map((panel, i) => (
          <div
            key={panel.id}
            id={panel.id}
            className={clsx(i === active ? 'relative block' : 'hidden')}
          >
            <VideoFeature
              src={panel.src}
              poster={panel.poster}
              title={panel.title}
              pattern={pattern}
            >
              {panel.children}
            </VideoFeature>
          </div>
        ))}
      </Container>
    </>
  )
}
