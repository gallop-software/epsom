'use client'

import playIcon from '@iconify/icons-mdi/play'
import { Icon } from '@/components/icon'
import { state } from '@/state'

/**
 * Round play button that scrolls to the video section and starts its video.
 */
export function PlayButton({ href }: { href: string }) {
  return (
    <div className="mt-15 flex justify-center">
      <a
        href={href}
        aria-label="Play video"
        onClick={() => {
          state.playVideo = true
        }}
        className="block w-16 font-heading text-[50px] leading-[50px] text-overlay-text opacity-85 transition-all duration-400 hover:opacity-100"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-solid border-overlay-text">
          <Icon
            icon={playIcon}
            className="h-14 w-14"
          />
        </span>
      </a>
    </div>
  )
}
