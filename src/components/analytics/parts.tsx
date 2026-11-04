'use client'

import chevronDown20Solid from '@iconify/icons-heroicons/chevron-down-20-solid'
import clsx from 'clsx'
import { DateTime } from 'luxon'
import { Icon } from '@/components/icon'
import { Span } from '@/components/span'
import { flowTraceConfig } from '@/utils/flow-trace-config'

// The small pieces the analytics screens share: medicine-opera's mailing
// parts, without what only its marketing email used.

const buttonClass =
  'inline-flex items-center justify-center gap-1.5 text-xs font-medium rounded-md py-2 px-4 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
export const mainButtonClass = `${buttonClass} bg-accent text-accent-contrast hover:bg-accent-dark`
export const quietButtonClass = `${buttonClass} border border-contrast/20 bg-body text-contrast hover:bg-body2`

export const inputClass =
  'w-full rounded-md bg-body px-3 py-2 text-xs text-contrast font-medium border border-contrast/40 outline-none transition placeholder:text-contrast/50 focus:border-contrast focus:ring-0'

// A dropdown with the site's own arrow, set in from the edge. The browser's
// arrow sits against the border and differs from one browser to the next.
export function Select({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'select'>) {
  return (
    <div className={clsx('relative w-full', className)}>
      <select
        {...props}
        className={clsx(inputClass, 'appearance-none pr-9 cursor-pointer')}
      >
        {children}
      </select>
      <Icon
        icon={chevronDown20Solid}
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-contrast/60"
      />
    </div>
  )
}

// The box a dialog is drawn in, as large as the marketing email one.
export const panelClass =
  'relative flex h-full max-h-[56rem] w-full max-w-6xl flex-col rounded-lg bg-body p-4 shadow-lg sm:p-6'
// What is under the title. On a phone it scrolls as one page; from sm up the
// parts inside it fill its height and scroll by themselves.
export const bodyClass = 'min-h-0 flex-1 overflow-y-auto sm:overflow-visible'
export const closeClass =
  'absolute right-3 top-3 p-1 text-contrast/60 hover:text-contrast cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'

export const tabListClass =
  'mb-4 flex shrink-0 gap-1 overflow-x-auto border-b border-contrast/15 scrollbar-hide'
export const tabClass =
  '-mb-px shrink-0 whitespace-nowrap cursor-pointer border-b-2 border-transparent px-3 py-2 text-xs font-medium text-contrast-light outline-none transition-colors hover:text-contrast data-[selected]:border-accent data-[selected]:text-accent data-[focus]:text-contrast'

export const cellClass = 'px-3 py-2 text-left align-middle'

// A row of buttons, filters or notices. On a phone they stack, each the full
// width; from sm up they sit side by side and wrap.
export const actionRowClass =
  'flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center'

// The box a table scrolls in. On a phone the screen it is on scrolls as one
// page, so the box is only kept from growing past it; from sm up it takes
// what height is left.
export const tableScrollClass =
  'max-h-[70vh] overflow-auto rounded-md border border-contrast/15 sm:max-h-none sm:min-h-0 sm:flex-1'

// A table's own classes. On a phone a column keeps its width and the table
// scrolls sideways, sooner than break an address across lines.
export const tableClass =
  'min-w-full divide-y divide-contrast/10 text-xs whitespace-nowrap sm:whitespace-normal'

const IRREGULAR: Record<string, string> = {
  person: 'people',
  'malformed address': 'malformed addresses',
  'new address': 'new addresses',
}

export function plural(count: number, word: string) {
  const many = IRREGULAR[word] ?? `${word}s`
  return `${count.toLocaleString()} ${count === 1 ? word : many}`
}

// A time kept in seconds, on the business's clock, as FlowTrace shows times.
export function formatTime(seconds: number | null): string {
  if (!seconds) return '—'
  return DateTime.fromSeconds(seconds, { zone: flowTraceConfig.zone }).toFormat(
    'LLL d, yyyy · h:mm a'
  )
}

type Tone = 'plain' | 'good' | 'strong' | 'warn'

const TONES: Record<Tone, { box: string; text: string }> = {
  plain: { box: 'bg-body2', text: 'text-contrast-light' },
  good: { box: 'bg-accent/10', text: 'text-accent' },
  strong: { box: 'bg-accent', text: 'text-accent-contrast' },
  warn: { box: 'bg-accent2', text: 'text-accent2-contrast' },
}

export function Badge({
  tone = 'plain',
  children,
}: {
  tone?: Tone
  children: React.ReactNode
}) {
  return (
    <Span
      fontSize="text-xs"
      color={TONES[tone].text}
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-0.5 whitespace-nowrap',
        TONES[tone].box
      )}
    >
      {children}
    </Span>
  )
}

interface PagerProps {
  page: number
  pages: number
  onPage: (page: number) => void
}

export function Pager({ page, pages, onPage }: PagerProps) {
  if (pages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 sm:justify-end">
      <button
        type="button"
        className={quietButtonClass}
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >
        Previous
      </button>
      <Span
        fontSize="text-xs"
        color="text-contrast-light"
      >
        Page {page} of {pages.toLocaleString()}
      </Span>
      <button
        type="button"
        className={quietButtonClass}
        disabled={page >= pages}
        onClick={() => onPage(page + 1)}
      >
        Next
      </button>
    </div>
  )
}
