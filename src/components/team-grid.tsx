import type { ReactNode } from 'react'
import { Image } from '@/components/image'

/** Yellow strip of team photos: five per row from 1024px, two from 601px, one below. */
export function TeamGrid({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-start bg-accent">{children}</div>
}

export interface TeamMemberProps {
  /** Studio key of the photo. */
  image: string
  name: string
  title: string
}

/**
 * A square photo whose name label sits on its bottom edge; from 1024px the
 * label waits below the photo and slides up on hover.
 */
export function TeamMember({ image, name, title }: TeamMemberProps) {
  return (
    <div className="group relative w-full overflow-hidden bg-profile-avatar text-profile-text sm:w-1/2 lg:w-1/5">
      <div className="relative pb-[calc(100%+6.5px)]">
        <Image
          src={image}
          alt=""
          sizes="(max-width: 600px) 100vw, (max-width: 1023px) 50vw, 20vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="absolute right-0 bottom-0 left-0 bg-body/80 px-5 py-2.5 text-center transition-all duration-400 lg:translate-y-full lg:group-hover:translate-y-0">
        <h2 className="m-0 font-body text-sm leading-[1.2] font-bold text-profile-text uppercase">
          {name}
        </h2>
        <p className="m-0 text-xs leading-[1.2] opacity-80">{title}</p>
      </div>
    </div>
  )
}
