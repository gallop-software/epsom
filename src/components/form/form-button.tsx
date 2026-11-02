import arrowPathIcon from '@iconify/icons-heroicons/arrow-path'
import { clsx } from 'clsx'
import { buttonClasses, type ButtonStyleProps } from '@/components/button'
import { Icon } from '@/components/icon'

// ============================================================================
// FormButton Component
// ============================================================================

export type FormButtonProps = ButtonStyleProps & {
  label: string
  name: string
  isLoading?: boolean
  submitMessage?: string
}

export function FormButton({
  label,
  name: _name,
  isLoading,
  submitMessage = 'Message sent. Thank you.',
  className,
  ...style
}: FormButtonProps) {
  return (
    <div className="pt-2.5">
      <button
        type="submit"
        data-message={submitMessage}
        disabled={isLoading}
        className={buttonClasses({
          ...style,
          className: clsx(
            isLoading && 'cursor-not-allowed opacity-70',
            className
          ),
        })}
      >
        <span>{label}</span>
        {isLoading && (
          <Icon
            icon={arrowPathIcon}
            className="ml-2 inline h-4 w-4 animate-spin"
          />
        )}
      </button>
    </div>
  )
}
