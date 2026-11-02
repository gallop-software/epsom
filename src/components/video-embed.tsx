import { clsx } from 'clsx'
import { HlsVideo } from '@/components/hls-video'

/** A video at the column width, 16:9. `src` is the Media path of an HLS playlist. */
export function VideoEmbed({
  src,
  title,
  margin = 'mb-7.5',
}: {
  src: string
  title: string
  margin?: string
}) {
  return (
    <figure className={clsx('relative aspect-video', margin)}>
      <HlsVideo
        src={src}
        aspectRatio="16/9"
        aria-label={title}
      />
    </figure>
  )
}
