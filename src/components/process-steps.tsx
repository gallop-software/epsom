import type { ReactNode } from 'react'
import { Columns } from '@/components/columns'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'

/** Two columns of process steps from 861px; one column below. */
export function ProcessSteps({ children }: { children: ReactNode }) {
  return (
    <Columns
      cols="grid-cols-1 md:grid-cols-2"
      gap="gap-x-17"
      align="items-start"
    >
      {children}
    </Columns>
  )
}

export function ProcessColumn({ children }: { children?: ReactNode }) {
  return <div>{children}</div>
}

export interface ProcessStepProps {
  /** Studio key of the round photo. */
  image: string
  title: string
  children?: ReactNode
}

/**
 * A step with a round photo beside its name and text (stacked and centred
 * below 601px).
 */
export function ProcessStep({ image, title, children }: ProcessStepProps) {
  return (
    <div className="mb-10 block flex-wrap justify-around text-profile-text max-sm:text-center sm:flex">
      <div className="mx-auto mb-2.5 w-12 sm:mx-0 sm:mt-1.25 sm:mr-5">
        <Image
          src={image}
          alt=""
          size="small"
          srcSet={false}
          rounded="rounded-full"
          className="h-12 w-12 bg-profile-avatar object-cover"
        />
      </div>
      <div className="flex-1">
        <Heading
          as="h2"
          fontFamily="font-body"
          fontSize="text-sm"
          letterSpacing="tracking-normal"
          color="text-profile-text"
          margin="mb-2.5"
          textAlign="max-sm:text-center"
        >
          {title}
        </Heading>
        <Paragraph
          fontSize="text-sm leading-[1.6] sm:text-[15px] sm:leading-6"
          margin="mb-0"
        >
          {children}
        </Paragraph>
      </div>
    </div>
  )
}
