import { Container } from '@/components/container'
import { ElegantHeading } from '@/components/elegant-heading'
import {
  ProcessColumn,
  ProcessStep,
  ProcessSteps,
} from '@/components/process-steps'

/** "Our Process": the four steps shown on the service pages. */
export function OurProcess() {
  return (
    <>
      <ElegantHeading
        bold="How"
        light="We Work"
      />
      <Container width="wide">
        <ProcessSteps>
          <ProcessColumn>
            <ProcessStep
              image="/content/g02-walkthrough.jpg"
              title="Planning"
            >
              We sit down with you first and talk through which floor makes
              sense for the way you use the space. No two buildings are alike,
              so we map out the work ahead of time to keep the job smooth.
            </ProcessStep>
            <ProcessStep
              image="/content/g01-grinding.jpg"
              title="Walkthrough"
            >
              No one likes surprises on a job. We meet you on site and go over
              each stage in order, so you know how the schedule will run, what
              happens during the install, and how your finished floor will come
              together.
            </ProcessStep>
          </ProcessColumn>
          <ProcessColumn>
            <ProcessStep
              image="/content/g03-roller.jpg"
              title="The Install"
            >
              Once you are ready, our crew gets to work on the floor. We take
              care with every step of the install and keep you up to date on how
              things are going until the last coat is down.
            </ProcessStep>
            <ProcessStep
              image="/content/g04-finished.jpg"
              title="Handoff"
            >
              When the floor is done, we clear out our gear and leave the space
              clean and ready to use. We let you know, walk the new floor with
              you, and hand over simple care instructions.&nbsp;Your invoice
              arrives by email to keep the paperwork easy.
            </ProcessStep>
          </ProcessColumn>
        </ProcessSteps>
      </Container>
    </>
  )
}
