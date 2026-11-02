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
          title="True, even ball response"
        >
          We can tune the acrylic blend and surface grit to speed up or slow
          down the ball, so the court plays the way your group likes it, whether
          that means fast rallies or relaxed weekend games.
        </IconCard>
        <IconCard
          image="/placeholder.png"
          title="Comfort and sure footing"
        >
          Players get steady, predictable traction and a surface with a bit of
          give that feels kinder to knees and ankles. We build these courts with
          comfort and safe movement in mind, so your group can stay out and keep
          playing a little longer.
        </IconCard>
        <IconCard
          image="/placeholder.png"
          title="A Court Built To Stay"
        >
          Every Bedrock court gets an acrylic coating that forms a firm, even,
          hard-working surface for play. We apply it with care so it stands up
          to foot traffic, sun and storms, and the court keeps looking sharp
          from one season to the next.
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
