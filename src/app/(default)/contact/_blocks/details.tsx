import cellphoneIcon from '@iconify/icons-mdi/cellphone'
import emailOutlineIcon from '@iconify/icons-mdi/email-outline'
import { Container } from '@/components/container'
import { ContactIcon, ContactIcons } from '@/components/contact-icons'

export default function Details() {
  return (
    <Container>
      <ContactIcons>
        <ContactIcon
          icon={cellphoneIcon}
          href="tel:5555550142"
        >
          (555) 555-0142
        </ContactIcon>
        <ContactIcon
          icon={emailOutlineIcon}
          href="mailto:hello@example.com"
        >
          hello@example.com
        </ContactIcon>
      </ContactIcons>
    </Container>
  )
}
