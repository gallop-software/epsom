import { Button } from '@/components/button'
import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
import { IconCard, IconCards } from '@/components/icon-cards'
import { Spacer } from '@/components/spacer'

export default function Benefits() {
  return (
    <section className="pb-col-19">
      <Spacer height="h-12.5" />
      <IconCards>
        <IconCard
          image="/placeholder.png"
          title="Made For Hard Hangar Use"
        >
          A hangar floor takes rolling loads, tug traffic and dropped tools
          every working day, so it has to earn its place. We build each system
          around how your hangar actually runs, from the traffic it sees to the
          work done on it, and the result looks far better than a bare gray
          slab.
        </IconCard>
        <IconCard
          image="/placeholder.png"
          title="Good Looks, Real Protection"
        >
          An epoxy-chip floor layers tough industrial coatings with decorative
          flakes in the colors you pick. Those layers shield the slab below and
          give the hangar a finished look you can be proud of.
        </IconCard>
        <IconCard
          image="/placeholder.png"
          title="Stands Up To Fluids"
        >
          Hangars see oil, fuel, hydraulic fluid and cleaning solvents, and a
          bare slab soaks them up. Our coatings are chosen to shrug off those
          spills, which keeps the space practical for the crew and looking sharp
          whenever a client or owner walks through the door.
        </IconCard>
        <IconCard
          image="/placeholder.png"
          title="Simple To Clean"
        >
          Choose from diamond-polished slabs, sealed concrete or a range of
          resin coatings. We pick each one with daily cleaning in mind, so your
          crew can keep the floor bright with routine sweeping and mopping and
          little fuss.
        </IconCard>
      </IconCards>
      <Spacer height="h-12.5" />
      <Container>
        <Buttons justify="justify-center">
          <Button
            href="#form"
            color="accent2"
          >
            Ready to Upgrade Your Hangar?
          </Button>
          <Button
            href="#more"
            variant="outline"
            color="accent2"
          >
            See the Details
          </Button>
        </Buttons>
      </Container>
    </section>
  )
}
