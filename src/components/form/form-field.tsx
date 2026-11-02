import type { ReactNode } from 'react'
import { labelStyles, requiredStyles } from './utils'

// ============================================================================
// FormField Component (label above a control)
// ============================================================================

export type FormFieldProps = {
  htmlFor: string
  label: string
  required?: boolean | undefined
  children: ReactNode
}

export function FormField({
  htmlFor,
  label,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="py-2.5">
      <label
        htmlFor={htmlFor}
        className={labelStyles}
      >
        {required ? `${label} ` : label}
        {required && <span className={requiredStyles}>*</span>}
      </label>
      {children}
    </div>
  )
}
