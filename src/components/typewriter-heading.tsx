'use client'

import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

export interface TypewriterHeadingProps {
  /** Word shown first (and to crawlers), replaced in turn by `words`. */
  word: string
  words: string[]
  /** Text after the rotating word. */
  after?: ReactNode
  /** Delay before the first word changes (ms). */
  startDelay?: number
  /** How long each word stays (ms). */
  delay?: number
  className?: string | undefined
}

// Duration of the clip close/open animation (ms).
const REVEAL = 600

/**
 * Heading whose first word rotates: the word closes to a 2px cursor, swaps to
 * the next word and opens again.
 */
export function TypewriterHeading({
  word,
  words,
  after,
  startDelay = 2500,
  delay = 2500,
  className,
}: TypewriterHeadingProps) {
  const all = [word, ...words]
  const count = all.length
  const [index, setIndex] = useState(0)
  // null: natural width and no cursor until the first change
  const [width, setWidth] = useState<number | null>(null)
  const measure = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const widthOf = (i: number) =>
      (measure.current?.children[i] as HTMLElement | undefined)?.offsetWidth ||
      0
    const timers: number[] = []
    const later = (fn: () => void, ms: number) =>
      timers.push(window.setTimeout(fn, ms))
    let current = 0

    const cycle = () => {
      setWidth(2)
      later(() => {
        current = (current + 1) % count
        setIndex(current)
        setWidth(widthOf(current) + 4)
        later(cycle, REVEAL + delay)
      }, REVEAL)
    }

    later(() => {
      setWidth(widthOf(0))
      // let the start width apply before closing it
      requestAnimationFrame(() => requestAnimationFrame(cycle))
    }, startDelay)

    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [count, startDelay, delay])

  return (
    <h1
      className={clsx(
        'mx-auto mb-7.5 max-w-full text-center font-heading text-4xl leading-heading font-bold tracking-heading text-overlay-text uppercase md:text-[48px] lg:text-6xl xl:text-7xl',
        className
      )}
    >
      <span className="inline">
        <span
          className={clsx(
            'relative inline-block overflow-hidden text-left align-top max-sm:mx-auto max-sm:block max-sm:text-center',
            "after:absolute after:top-[10%] after:right-0 after:h-4/5 after:w-0.5 after:bg-body-dark after:transition-all after:duration-300 after:content-['']",
            width === null ? 'after:opacity-0' : 'after:opacity-50'
          )}
          style={
            width === null
              ? undefined
              : {
                  width,
                  transition: `width ${REVEAL}ms cubic-bezier(0.37, 0, 0.63, 1)`,
                }
          }
        >
          {all.map((w, i) => (
            <b
              key={w + i}
              className={clsx(
                'font-bold whitespace-nowrap',
                i === index
                  ? 'relative inline-block'
                  : 'absolute top-0 left-0 hidden'
              )}
            >
              {w}
            </b>
          ))}
        </span>
      </span>{' '}
      {after}
      <span
        ref={measure}
        aria-hidden="true"
        className="invisible absolute top-0 left-0 whitespace-nowrap"
      >
        {all.map((w, i) => (
          <b
            key={w + i}
            className="inline-block font-bold"
          >
            {w}
          </b>
        ))}
      </span>
    </h1>
  )
}
