import localFont from 'next/font/local'

// The theme's "leftquote" face: only the large opening quote mark on blockquotes.
export const _quoteFont = localFont({
  src: [
    {
      path: '../../_fonts/leftquote/leftquote.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})
