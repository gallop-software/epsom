# Use Iframe Height

A client-side hook that automatically communicates the document height to a parent window when the page is embedded in an iframe.

**Tier:** Internal  
**File:** `src/hooks/use-iframe-height.tsx`

## Usage

```tsx
import IframeHeight from '@/hooks/use-iframe-height'

export default function Layout() {
  return (
    <>
      <IframeHeight />
      {/* Your content */}
    </>
  )
}
```

## Features

- Detects if the page is running inside an iframe
- Automatically sends height updates to the parent window
- Uses ResizeObserver to track document height changes
- Listens for height requests from parent window
- Only runs when embedded (does nothing if not in iframe)

## How it Works

1. Checks if the page is inside an iframe (`window.self !== window.top`)
2. Sends initial height via postMessage to parent window
3. Observes document body for resize events
4. Automatically sends updated height when content changes
5. Responds to `requestHeight` messages from parent

## Message Format

The hook sends messages to the parent window in the following format:

```js
{
  type: 'height',
  value: 1234 // height in pixels
}
```

## Parent Window Integration

The parent window should listen for messages:

```js
window.addEventListener('message', (event) => {
  if (event.data?.type === 'height') {
    const iframe = document.getElementById('your-iframe')
    iframe.style.height = event.data.value + 'px'
  }
})
```

## Implementation

The component is used in `src/app/layout.tsx` to enable automatic height adjustment when the site is embedded in iframes.

## Viewport-Tall Sections

The frame grows to fit the page, so `100vh` would grow with it and never settle. Inside an iframe the hook freezes `--viewport-height` at 800px, the height the preview frame starts at. Use `h-viewport`, `h-screen-header` or `min-h-screen-header` for viewport-tall sections, not `h-screen`.

## Sticky Blocks

Sticky needs something to scroll, so a frame grown to fit the block would never show the effect. While an element marked `data-preview-scroll` is sticking on a `/block/` page, the hook reports a viewport-tall frame with `scroll: true`, and the parent lets the frame scroll on its own. Below the sticky breakpoint it reports the full height again.
