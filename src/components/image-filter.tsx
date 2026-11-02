'use client'

import { clsx } from 'clsx'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Container } from '@/components/container'
import { ImageFeature } from '@/components/image-feature'

export interface ImageFilterPanel {
  /** Anchor id of the panel. */
  id: string
  /** Tab label. */
  label: string
  /** Studio key of the photo. */
  image: string
  /** Alt text of the photo. */
  title: string
  /** Text beside the photo. */
  children?: ReactNode
}

export interface ImageFilterProps {
  id: string
  /** Studio key of the dotted pattern drawn behind each photo. */
  pattern: string
  panels: ImageFilterPanel[]
}

/**
 * Tabs that switch between photo panels.
 */
export function ImageFilter({ id, pattern, panels }: ImageFilterProps) {
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
            <ImageFeature
              image={panel.image}
              title={panel.title}
              pattern={pattern}
            >
              {panel.children}
            </ImageFeature>
          </div>
        ))}
      </Container>
    </>
  )
}
