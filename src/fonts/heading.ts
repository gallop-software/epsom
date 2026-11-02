import localFont from 'next/font/local'

// Oswald (headings, buttons, navigation, quotes): Google Fonts files
// converted to woff2.
export const _headingFont = localFont({
  src: [
    {
      path: '../../_fonts/oswald/oswald-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../_fonts/oswald/oswald-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../_fonts/oswald/oswald-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})
