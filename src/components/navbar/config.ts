export interface MenuItem {
  label: string
  href: string
  /** Rendered as the yellow call-to-action button. */
  highlight?: boolean
}

export const siteLogo = {
  /** White logo, shown over the home hero before scrolling. */
  light: '/brand/logo-white.png',
  /** Blue logo, shown on the white header. */
  dark: '/brand/logo-navy.png',
  alt: 'Bedrock Flooring',
  width: 220,
  height: 106,
}

export const mainMenu: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Residential', href: '/residential-concrete-flooring/' },
  { label: 'Commercial', href: '/commercial-concrete-flooring/' },
  { label: 'Industrial', href: '/industrial-flooring/' },
  { label: 'Food Service', href: '/food-service-flooring/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/', highlight: true },
]
