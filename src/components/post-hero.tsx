import { clsx } from 'clsx'
import Link from 'next/link'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { formatPostDate } from '@/utils/blog'

export interface PostHeroProps {
  title: string
  /**
   * Studio key of the featured image. Without one (video posts) the title
   * sits in the plain white band of the other pages.
   */
  image?: string | undefined
  /** WordPress publish time, ISO. */
  date: string
  author?: string | undefined
}

/**
 * A post's title band: the byline and title over the featured image (full
 * height, 40% black scrim, chevron bottom edge), or on white.
 */
export function PostHero({
  title,
  image,
  date,
  author = 'Bedrock Flooring',
}: PostHeroProps) {
  const fade = image && 'opacity-80'
  return (
    <header
      className={clsx(
        'relative',
        image
          ? [
              'mb-15 flex h-screen-header min-h-[500px] items-center justify-center overflow-hidden sm:mb-20 lg:mb-25 lg:h-screen',
              '[clip-path:polygon(0_0,100%_0,100%_calc(100%_-_40px),50%_100%,0_calc(100%_-_40px))] md:[clip-path:polygon(0_0,100%_0,100%_calc(100%_-_60px),50%_100%,0_calc(100%_-_60px))]',
            ]
          : 'bg-body pt-15 pb-12.5 lg:py-20'
      )}
    >
      <div className="site-wrap relative z-1 flex flex-col items-center text-center">
        {/* a <div>: the article's content-link highlight is for paragraphs */}
        <div
          className={clsx(
            'mb-12.5 text-2xs leading-normal',
            image ? 'text-overlay-text' : 'text-muted'
          )}
        >
          <Image
            src="/brand/favicon.png"
            alt="Avatar photo"
            width={36}
            height={36}
            srcSet={false}
            size="small"
            rounded="rounded-full"
            className={clsx(
              '-mt-[7px] mr-3 -mb-3 inline h-9 w-9',
              image && 'border-2 border-solid border-body/80'
            )}
          />
          <i className={clsx('not-italic', fade)}>by</i>{' '}
          <Link
            href="/author/bedrock-flooring/"
            className={clsx(
              'leading-[1.3] font-bold text-inherit no-underline',
              fade
            )}
          >
            {author}
          </Link>{' '}
          <i className={clsx('not-italic', fade)}>on</i>{' '}
          <time
            dateTime={date}
            className={clsx('leading-[1.3] font-bold', fade)}
          >
            {formatPostDate(date)}
          </time>
        </div>
        <Heading
          as="h1"
          {...(image && { color: 'text-overlay-text' })}
          textAlign="text-center"
          margin={image ? 'mb-0 lg:mx-20' : 'mb-5 lg:mx-20 lg:mb-0'}
        >
          {title}
        </Heading>
      </div>
      {image && (
        <>
          <Image
            src={image}
            alt={title}
            sizes="100vw"
            lazy={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-overlay opacity-40" />
        </>
      )}
    </header>
  )
}
