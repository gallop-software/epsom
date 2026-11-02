import Link from 'next/link'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'

export interface PostCard {
  href: string
  title: string
  /** Display date, e.g. "May 31, 2021". */
  date: string
  /** Studio key of the featured image. */
  image: string
  alt?: string | undefined
}

/** Project post cards: three per row from 1024px, two from 601px. */
export function PostCards({
  posts,
  readMore = 'Read More',
}: {
  posts: PostCard[]
  readMore?: string
}) {
  return (
    <div className="block sm:grid sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.href}
          className="relative z-1 mb-10 flex flex-col bg-body shadow-card transition-all duration-400 hover:shadow-card-hover sm:mb-0"
        >
          <Link
            href={post.href}
            aria-label={post.title}
            className="relative block pb-[64%]"
          >
            <Image
              src={post.image}
              alt={post.alt}
              sizes="(max-width: 600px) 100vw, 360px"
              className="absolute top-0 left-0 h-full w-full object-cover"
            />
          </Link>
          <header className="my-10 px-[8.75%] text-center">
            <p className="mb-6 text-2xs text-muted">
              <time className="leading-[1.3] font-bold">{post.date}</time>
            </p>
            <Heading
              as="h2"
              styleAs="h3"
              margin="mb-0"
            >
              <Link
                href={post.href}
                className="transition-all duration-400 hover:text-accent2-light"
              >
                {post.title}
              </Link>
            </Heading>
          </header>
          <div className="mx-auto mt-auto mb-12.5 px-[8.75%]">
            <Button href={post.href}>{readMore}</Button>
          </div>
        </article>
      ))}
    </div>
  )
}
