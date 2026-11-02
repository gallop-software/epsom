import { clsx } from 'clsx'

/** Vertical space. `height` is a Tailwind height class, e.g. `h-12.5`. */
export function Spacer({
  height,
  className,
}: {
  height: string
  className?: string | undefined
}) {
  return (
    <div
      aria-hidden="true"
      className={clsx(height, className)}
    />
  )
}
