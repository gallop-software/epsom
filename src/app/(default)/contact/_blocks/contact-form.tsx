import { Container } from '@/components/container'
import {
  Form,
  FormButton,
  FormInput,
  FormName,
  FormTextArea,
} from '@/components/form'
import { Spacer } from '@/components/spacer'

export default function ContactForm() {
  return (
    <Container>
      <div className="my-6">
        <Form>
          <FormInput
            name="emailSubject"
            defaultValue="Contact Form"
            hidden
          />
          <FormName required />
          <FormInput
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            required
          />
          <FormTextArea
            name="message"
            label="About Your Project"
            required
          />
          <FormButton
            name="submit"
            label="Submit"
            color="accent2"
          />
        </Form>
      </div>
      <Spacer height="h-25" />
    </Container>
  )
}
