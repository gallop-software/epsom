// "Schedule a Free Estimate" opens Calendly's popup widget, whose script and
// stylesheet load on first use. Without NEXT_PUBLIC_CALENDLY_URL there is nothing
// to book, so the buttons go to the contact page.
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL

const WIDGET = 'https://assets.calendly.com/assets/external/widget'

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (options: { url: string }) => void }
}

let loading: Promise<void> | null = null

function loadWidget(): Promise<void> {
  if (loading) return loading
  loading = new Promise((resolve, reject) => {
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = `${WIDGET}.css`
    document.head.appendChild(css)
    const js = document.createElement('script')
    js.src = `${WIDGET}.js`
    js.async = true
    js.onload = () => resolve()
    js.onerror = () => {
      loading = null
      reject(new Error('Calendly widget failed to load'))
    }
    document.head.appendChild(js)
  })
  return loading
}

export function openCalendly() {
  if (!CALENDLY_URL) {
    window.open('/contact/', '_self')
    return
  }
  loadWidget()
    .then(() =>
      (window as CalendlyWindow).Calendly?.initPopupWidget({
        url: CALENDLY_URL,
      })
    )
    .catch(() => {
      window.open(CALENDLY_URL, '_blank', 'noopener')
    })
}
