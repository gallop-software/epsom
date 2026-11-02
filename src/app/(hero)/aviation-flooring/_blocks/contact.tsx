import {
  Form,
  FormButton,
  FormInput,
  FormName,
  FormSelect,
} from '@/components/form'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'
import { Spacer } from '@/components/spacer'

export default function Contact() {
  return (
    <Section
      className="bg-accent2 px-col-5 py-col-20 text-overlay-text"
      maxWidth="max-w-[900px]"
      imageSrc="/uploads/2021/02/dot-wave-sec-1.svg"
      imageClassName="opacity-10"
    >
      <Heading
        as="h2"
        id="form"
        color="text-overlay-text"
        textAlign="text-center"
      >
        Talk to Our Hangar Floor Crew
      </Heading>
      <Paragraph
        fontSize="text-lg"
        textAlign="text-center"
        margin="mb-0"
      >
        Bedrock Flooring works out of Red Mesa, Texas, and we treat every hangar
        job like our name is on the slab. Tell us about your space and how you
        use it, and we will walk you through the floor options that fit. We show
        up when we say we will, keep the work area tidy, answer questions
        plainly and stay on the job until the floor is right. That is how we
        like to do business, and it is why we hope you will call us again.
      </Paragraph>
      <Spacer height="h-2.5" />
      <div className="my-6">
        <Form tone="dark">
          <FormInput
            name="emailSubject"
            defaultValue="Aviation Flooring Form"
            hidden
          />
          <FormName required />
          <FormInput
            name="phone"
            type="tel"
            label="Phone"
            autoComplete="tel"
            required
          />
          <FormInput
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
          />
          <FormInput
            name="airport"
            label="Airport Code"
            required
          />
          <FormInput
            name="hangarSize"
            label="Hangar Footprint"
            required
          />
          <FormSelect
            name="hangarUse"
            label="How It Is Used"
            options={['Private', 'FBO Tenant', 'Maintenance', 'Something Else']}
            required
          />
          <FormButton
            name="submit"
            label="Submit"
            color="body"
            textColor="text-accent2"
            offset="light"
          />
        </Form>
      </div>
    </Section>
  )
}
