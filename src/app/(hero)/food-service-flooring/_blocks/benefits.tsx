import { Buttons } from '@/components/buttons'
import { CalendlyButton } from '@/components/calendly-button'
import { IconCard, IconCards } from '@/components/icon-cards'
import { Spacer } from '@/components/spacer'

export default function Benefits() {
  return (
    <>
      <Spacer height="h-12.5" />
      <IconCards padding="px-col-10">
        <IconCard
          image="/placeholder.png"
          title="Textures that suit the work"
        >
          We can tune the resin blend and surface grit to add more grip or ease
          it back, so the floor works the way your kitchen runs, whether that
          means a busy cook line or a quiet prep room.
        </IconCard>
        <IconCard
          image="/placeholder.png"
          title="Comfort and sure footing"
        >
          Staff get steady, predictable traction on a floor chosen with wet
          shoes and long shifts in mind. We build these floors with comfort and
          safe movement in mind, so your crew can get through a busy service
          with less to worry about.
        </IconCard>
        <IconCard
          image="/placeholder.png"
          title="A Floor Built To Stay"
        >
          Every Bedrock kitchen floor gets a resin coating that forms a firm,
          even, hard-working surface for service. We apply it with care so it
          stands up to foot traffic, hot water and cleaners, and the floor keeps
          looking sharp year to year.
        </IconCard>
      </IconCards>
      <Spacer height="h-12.5" />
      <Buttons justify="justify-center">
        <CalendlyButton size="large">Book a Free Estimate</CalendlyButton>
      </Buttons>
      <Spacer height="h-[130px]" />
    </>
  )
}
