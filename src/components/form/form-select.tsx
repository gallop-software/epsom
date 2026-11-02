import chevronDownIcon from '@iconify/icons-heroicons/chevron-down'
import { Icon } from '@/components/icon'
import { FormField } from './form-field'
import { inputBaseStyles } from './utils'

// ============================================================================
// FormSelect Component
// ============================================================================

export type FormSelectProps = {
  name: string
  label: string
  options: string[]
  required?: boolean | undefined
}

export function FormSelect({
  name,
  label,
  options,
  required,
}: FormSelectProps) {
  return (
    <FormField
      htmlFor={name}
      label={label}
      required={required}
    >
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          data-label={label}
          className={`${inputBaseStyles} cursor-pointer appearance-none leading-normal`}
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
        <Icon
          icon={chevronDownIcon}
          className="pointer-events-none absolute top-1/2 right-5 h-4 w-4 -translate-y-1/2 text-muted"
        />
      </div>
    </FormField>
  )
}
