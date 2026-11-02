import emailIcon from '@iconify/icons-mdi/email'
import facebookIcon from '@iconify/icons-mdi/facebook'
import googleIcon from '@iconify/icons-mdi/google'
import instagramIcon from '@iconify/icons-mdi/instagram'
import phoneOutlineIcon from '@iconify/icons-mdi/phone-outline'

export const contact = {
  name: 'Bedrock Flooring',
  location: 'Home base: Red Mesa, Texas',
  email: 'hello@example.com',
  phone: '(555) 555-0142',
  phoneHref: 'tel:5555550142',
}

export const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: facebookIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: instagramIcon,
  },
  {
    label: 'Google',
    href: 'https://www.google.com/maps',
    icon: googleIcon,
  },
  {
    label: 'Email',
    href: 'mailto:hello@example.com',
    icon: emailIcon,
  },
  { label: 'Call', href: 'tel:5555550142', icon: phoneOutlineIcon },
]

export const footerMenu = [
  { label: 'Careers', href: '/careers/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Gallery', href: '/gallery/' },
]

/** Six project photos above the footer (the "Above Footer" gallery widget). */
export const footerGallery = [
  {
    src: '/placeholder.png',
    alt: 'Polished concrete in a Red Mesa, TX business',
  },
  {
    src: '/placeholder.png',
    alt: 'Polished concrete going down at a Red Mesa, TX job',
  },
  {
    src: '/placeholder.png',
    alt: 'Flake epoxy on a Red Mesa, TX garage and patio',
  },
  {
    src: '/placeholder.png',
    alt: 'Epoxy floor at a Red Mesa, TX workplace',
  },
  {
    src: '/placeholder.png',
    alt: 'Resinous flake coating at a family home',
  },
  {
    src: '/placeholder.png',
    alt: 'Red Mesa, TX patio with an epoxy-chip finish',
  },
]
