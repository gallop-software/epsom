import type { ReactNode } from 'react'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'

/**
 * Row of photo cards: one row from 1024px, three per row from 601px, stacked
 * below.
 */
export function IconCards({
  padding = 'px-cards',
  children,
}: {
  /** Side padding: `px-cards` inside a padded column, `px-col-10` directly in the page. */
  padding?: string
  children?: ReactNode
}) {
  return (
    <div className={padding}>
      <div className="mx-auto block max-w-[1120px] justify-center sm:flex sm:flex-wrap lg:flex-nowrap">
        {children}
      </div>
    </div>
  )
}

export interface IconCardProps {
  /** Studio key of the round photo (shown 100px wide). */
  image: string
  alt?: string | undefined
  title: ReactNode
  children?: ReactNode
}

export function IconCard({ image, alt, title, children }: IconCardProps) {
  return (
    <div className="mb-15 w-full p-0 sm:mb-0 sm:w-1/3 sm:max-w-1/3 sm:flex-auto sm:p-[25px] sm:first:pl-0 sm:last:pr-0 sm:max-lg:nth-[3n]:pr-0 sm:max-lg:nth-[4n]:pl-0 lg:w-auto lg:max-w-none lg:flex-1">
      <div className="transition-all duration-150 ease-linear hover:scale-110">
        <figure className="mx-auto mb-7.5 w-25 text-center">
          <Image
            src={image}
            alt={alt}
            sizes="100px"
            className="w-25 max-w-full"
          />
        </figure>
        <Heading
          as="h4"
          fontSize="text-sm"
          letterSpacing="tracking-normal"
          textAlign="text-center"
        >
          {title}
        </Heading>
        <Paragraph
          fontSize="text-xs"
          textAlign="text-center"
          margin="mb-0"
        >
          {children}
        </Paragraph>
      </div>
    </div>
  )
}
