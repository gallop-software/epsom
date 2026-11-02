import { Buttons } from '@/components/buttons'
import { CalendlyButton } from '@/components/calendly-button'
import { IconCard, IconCards } from '@/components/icon-cards'
import { Spacer } from '@/components/spacer'

export default function Services() {
  return (
    <section className="pb-col-19">
      <Spacer height="h-12.5" />
      <IconCards>
        <IconCard
          image="/content/circles/circle-polished.png"
          title="Polished Floors"
        >
          We grind the slab in stages, moving to finer and finer diamond tooling
          until the surface tightens up. A densifier goes in along the way, and
          the result is a bright, reflective floor that asks very little of you
          once the job is done.
        </IconCard>
        <IconCard
          image="/content/circles/circle-resinous.png"
          title="Resinous Floors for Kitchens"
        >
          Poured right over your existing slab, a resinous system cures into one
          continuous surface with no seams to trap grime. It handles heat,
          spills, harsh cleaners and wet feet, which makes it a strong pick for
          commercial kitchens and food prep rooms.
        </IconCard>
        <IconCard
          image="/content/circles/circle-garage.png"
          title="Garage Epoxy Coatings"
        >
          We pair a two-part epoxy with decorative vinyl flakes in the blend you
          choose, giving garages and shops a tough, good-looking surface. Dirt
          and oil wipe up with little effort, so the floor stays sharp with a
          simple routine.
        </IconCard>
        <IconCard
          image="/content/circles/circle-warehouse.png"
          title="Warehouse Floors"
        >
          Warehouses, service bays, showrooms and production floors all work
          differently, and Bedrock has a system for each. A cement-based epoxy
          gives you a hardy surface that stands up to oil and chemical spills
          and cleans up fast. Polished concrete is the other route, adding shine
          and reflecting more light around the room.
        </IconCard>
      </IconCards>
      <Buttons justify="justify-center">
        <CalendlyButton>Book Your Free Estimate</CalendlyButton>
      </Buttons>
    </section>
  )
}
