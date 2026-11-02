import { Columns } from '@/components/columns'
import {
  Form,
  FormButton,
  FormInput,
  FormName,
  FormUpload,
} from '@/components/form'
import { Heading } from '@/components/heading'
import { Li, List } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'

export default function Careers() {
  return (
    <Section
      className="bg-photo-dark px-col-5 py-col-10 text-overlay-text"
      maxWidth="max-w-[1120px]"
      imageSrc="/content/g03-roller.jpg"
      parallax
      imagePosition="bg-top"
      overlayColor="bg-photo-dark/80"
    >
      <Columns
        cols="grid-cols-1 md:grid-cols-2"
        gap="gap-x-17"
        align="items-start"
        className="max-md:block"
      >
        <div>
          <Heading
            as="h1"
            color="text-overlay-text"
          >
            Careers
          </Heading>
          <Heading
            as="h3"
            styleAs="h4"
            color="text-overlay-text"
          >
            <strong>
              <strong>How We Work</strong>
            </strong>
          </Heading>
          <Paragraph>
            At Bedrock Flooring, good floors start with good people. Our crews
            work side by side, and newer hands learn from those who have done
            the work before. We want every person here to pick up skills they
            can use for the rest of their career.
          </Paragraph>
          <Heading
            as="h3"
            styleAs="h4"
            color="text-overlay-text"
          >
            People we want to meet
          </Heading>
          <Paragraph>
            We would rather wait for the right person than hire someone just to
            fill a spot. Most of the skills in this trade can be taught on the
            job, so when we meet someone new, we pay the closest attention to
            who they are and to these qualities:
          </Paragraph>
          <List>
            <Li>Honesty</Li>
            <Li>Reliability</Li>
            <Li>Hustle</Li>
            <Li>Curiosity</Li>
            <Li>Accountability</Li>
          </List>
          <Heading
            as="h3"
            styleAs="h4"
            color="text-overlay-text"
          >
            What to Expect
          </Heading>
          <Paragraph>
            We hire floor installers and teach the trade hands-on, out on real
            job sites, alongside a crew that wants you to do well. Expect honest
            work and clear direction. We will show you how each step is done and
            help you get better at the craft as you go.
          </Paragraph>
        </div>
        <div className="mb-[46px] bg-body p-7.5 text-contrast">
          <Heading
            as="h3"
            styleAs="h4"
          >
            Send Your Resume
          </Heading>
          <div className="my-6">
            <Form>
              <FormInput
                name="emailSubject"
                defaultValue="Resume Upload"
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
              <FormUpload
                name="files"
                label="Attach Your Resume"
                required
              />
              <FormButton
                name="submit"
                label="Submit"
                color="accent2"
              />
            </Form>
          </div>
        </div>
      </Columns>
    </Section>
  )
}
