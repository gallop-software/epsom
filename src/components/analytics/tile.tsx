import arrowDown20Solid from '@iconify/icons-heroicons/arrow-down-20-solid'
import arrowUp20Solid from '@iconify/icons-heroicons/arrow-up-20-solid'
import { Icon } from '@/components/icon'
import { Span } from '@/components/span'

interface TileProps {
  icon: { body: string; width?: number; height?: number }
  label: string
  value: number
  note?: string
  // The same number for the time just before, to show how far it moved.
  before?: number | undefined
}

// One number under the chart. With `before`, an arrow and how much it rose
// or fell since.
export function Tile({ icon, label, value, note, before }: TileProps) {
  const change = before ? Math.round(((value - before) / before) * 100) : null
  return (
    <div className="flex flex-col gap-1 rounded-md bg-body2 px-4 py-3">
      <div className="flex items-center gap-2">
        <Icon
          icon={icon}
          className="h-4 w-4 shrink-0 text-contrast-light"
        />
        <Span
          fontSize="text-xs"
          color="text-contrast-light"
        >
          {label}
        </Span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-2">
        <Span
          fontSize="text-xl"
          fontWeight="font-semibold"
          className="tabular-nums"
        >
          {value.toLocaleString()}
        </Span>
        {change !== null && change !== 0 && (
          <Span
            fontSize="text-xs"
            color="text-contrast-light"
            className="inline-flex items-center gap-0.5"
            title="Against the same length of time just before"
          >
            <Icon
              icon={change > 0 ? arrowUp20Solid : arrowDown20Solid}
              className="h-3.5 w-3.5"
            />
            {Math.abs(change).toLocaleString()}%
            <Span className="sr-only">{change > 0 ? 'up' : 'down'}</Span>
          </Span>
        )}
      </div>
      <Span
        fontSize="text-xs"
        color="text-contrast-light"
      >
        {note || ' '}
      </Span>
    </div>
  )
}
