import localFont from 'next/font/local'

// Muli: Google Fonts faces converted to woff2.
export const _bodyFont = localFont({
  src: [
    {
      path: '../../_fonts/muli/muli-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../_fonts/muli/muli-lightitalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../_fonts/muli/muli-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../_fonts/muli/muli-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../_fonts/muli/muli-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../_fonts/muli/muli-bolditalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})
