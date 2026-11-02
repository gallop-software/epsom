import { FormField } from './form-field'
import { inputBaseStyles, sublabelStyles } from './utils'

// ============================================================================
// FormName Component (First + Last Name)
// ============================================================================

export type FormNameProps = {
  label?: string
  name1?: string
  name2?: string
  required?: boolean | undefined
}

export function FormName({
  label = 'Name',
  name1 = 'firstName',
  name2 = 'lastName',
  required,
}: FormNameProps) {
  const half = (name: string, sublabel: string, autoComplete: string) => (
    <div className="flex-1">
      <input
        id={name}
        name={name}
        type="text"
        autoComplete={autoComplete}
        required={required}
        data-label={`${sublabel} Name`}
        className={`${inputBaseStyles} leading-[1.3]`}
      />
      <label
        htmlFor={name}
        className={sublabelStyles}
      >
        {sublabel}
      </label>
    </div>
  )
  return (
    <FormField
      htmlFor={name1}
      label={label}
      required={required}
    >
      <div className="flex gap-5">
        {half(name1, 'First', 'given-name')}
        {half(name2, 'Last', 'family-name')}
      </div>
    </FormField>
  )
}
