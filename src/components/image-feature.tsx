import type { ReactNode } from 'react'
import { Image } from '@/components/image'
import { studioUrl } from '@/utils/studio-helpers'

export interface ImageFeatureProps {
  /** Studio key of the photo. */
  image: string
  /** Alt text of the photo. */
  title: string
  /** Studio key of the dotted pattern drawn behind the photo. */
  pattern: string
  /** Text beside the photo. */
  children?: ReactNode
}

/**
 * A 16:9 photo on a dotted backdrop beside a text column; stacked below 861px.
 */
export function ImageFeature({
  image,
  title,
  pattern,
  children,
}: ImageFeatureProps) {
  return (
    <div className="flex flex-col items-center gap-10 md:flex-row lg:gap-20">
      <div className="relative w-full md:flex-1 md:basis-0">
        <div
          className="absolute bottom-7.5 left-2.5 h-full w-full bg-repeat sm:bottom-10 sm:left-5 lg:left-10"
          style={{ backgroundImage: `url("${studioUrl(pattern, 'full')}")` }}
        />
        <Image
          src={image}
          alt={title}
          aspect="aspect-video"
          sizes="(max-width: 860px) 100vw, 50vw"
          className="relative block w-full object-cover"
        />
      </div>
      <div className="w-full md:flex-1 md:basis-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
