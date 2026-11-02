import { FormField } from './form-field'
import { inputBaseStyles } from './utils'

// ============================================================================
// FormTextArea Component
// ============================================================================

export type FormTextAreaProps = {
  id?: string
  name: string
  placeholder?: string
  rows?: number
  required?: boolean | undefined
  defaultValue?: string
  className?: string
  label?: string
}

export function FormTextArea({
  id,
  name,
  placeholder,
  rows = 4,
  required,
  defaultValue,
  className = '',
  label = '',
}: FormTextAreaProps) {
  const textarea = (
    <textarea
      id={id ?? name}
      name={name}
      placeholder={placeholder}
      rows={rows}
      required={required}
      defaultValue={defaultValue}
      data-label={label}
      className={`${inputBaseStyles} h-30 leading-[1.3] ${className}`}
    />
  )
  if (!label) return textarea
  return (
    <FormField
      htmlFor={id ?? name}
      label={label}
      required={required}
    >
      {textarea}
    </FormField>
  )
}
