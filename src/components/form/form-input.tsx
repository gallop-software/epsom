import { FormField } from './form-field'
import { inputBaseStyles } from './utils'

// ============================================================================
// FormInput Component
// ============================================================================

export type FormInputProps = {
  id?: string
  name: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: string
  required?: boolean | undefined
  hidden?: boolean
  defaultValue?: string
  className?: string
  label?: string
}

export function FormInput({
  id,
  name,
  type = 'text',
  placeholder,
  autoComplete,
  required,
  hidden,
  defaultValue,
  className = '',
  label = '',
}: FormInputProps) {
  const input = (
    <input
      id={id ?? name}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      hidden={hidden}
      defaultValue={defaultValue}
      data-label={label}
      className={`${inputBaseStyles} leading-[1.3] ${className}`}
    />
  )
  if (hidden || !label) return input
  return (
    <FormField
      htmlFor={id ?? name}
      label={label}
      required={required}
    >
      {input}
    </FormField>
  )
}
