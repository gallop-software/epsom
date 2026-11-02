// ============================================================================
// Shared Input Styles (white, square, Muli light).
// Grey borders on light sections; white on dark ones (`<Form tone="dark">`).
// ============================================================================

export const inputBaseStyles =
  'block w-full max-w-full border border-solid border-form-border bg-body px-4 pt-[13px] pb-[11px] font-body text-[15px] font-light text-contrast transition-all duration-400 focus:outline-none group-data-[tone=dark]/form:border-body'

export const requiredStyles =
  'font-normal text-required group-data-[tone=dark]/form:text-inherit'

export const labelStyles = 'mb-1 block text-xs leading-normal font-bold'

export const sublabelStyles = 'mt-1 block text-xs leading-normal font-light'
