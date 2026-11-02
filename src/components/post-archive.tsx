import { clsx } from 'clsx'
import Link from 'next/link'
import { Fragment } from 'react'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { PageHeader } from '@/components/page-header'
import { Paragraph } from '@/components/paragraph'
import {
  categoryHref,
  formatPostDate,
  pageCount,
  pagePosts,
  type BlogPost,
} from '@/utils/blog'

export interface PostArchiveProps {
  title: string
  /** Every post of the archive, newest first. */
  posts: BlogPost[]
  /** 1-based page number. */
  page?: number
  /** First page's path, e.g. `/blog/`; later pages are `<path>page/<n>/`. */
  path: string
}

/**
 * A blog archive page (blog, category, author, tag): grey background, title
 * band, two columns of post cards from 861px, and the page numbers.
 */
export function PostArchive({
  title,
  posts,
  page = 1,
  path,
}: PostArchiveProps) {
  const pages = pageCount(posts)
  const shown = pagePosts(posts, page)
  return (
    <div className="flow-root bg-body-light">
      <PageHeader background="bg-body-light">{title}</PageHeader>
      <div className="site-wrap">
        {shown.length ? (
          <div className="block md:grid md:grid-cols-2 md:gap-12.5 xl:gap-15">
            {shown.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
              />
            ))}
          </div>
        ) : (
          <div className="flow-root bg-body shadow-card">
            <Paragraph>Nothing to show here yet.</Paragraph>
          </div>
        )}
        {pages > 1 && (
          <Pagination
            page={page}
            pages={pages}
            path={path}
          />
        )}
      </div>
      {pages <= 1 && <div className="h-20" />}
    </div>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  const href = `/${post.slug}/`
  const { title, date, author, excerpt, categories, featuredImage } =
    post.metadata
  return (
    <article className="relative z-1 mb-[12%] flex flex-col bg-body shadow-card md:mb-0">
      <Link
        href={href}
        aria-hidden="true"
        tabIndex={-1}
        className="relative block overflow-hidden pb-[64%]"
      >
        {/* A 1440×880 centre crop of the (square) photo,
              covering the box: 104.8% of the box width, centred */}
        <Image
          src={featuredImage}
          alt={title}
          sizes="(max-width: 860px) 95vw, 545px"
          className="absolute top-1/2 left-1/2 h-auto w-[104.8%] max-w-none -translate-x-1/2 -translate-y-1/2"
        />
      </Link>
      <header className="relative my-10 px-[8.75%] text-center">
        {/* a <div>: the article's content-link highlight is for paragraphs */}
        <div className="mb-6 text-2xs leading-normal text-muted">
          <i className="not-italic">by</i>{' '}
          <Link
            href="/author/bedrock-flooring/"
            className="leading-[1.3] font-bold text-inherit no-underline"
          >
            {author}
          </Link>{' '}
          <i className="not-italic">on</i>{' '}
          <time
            dateTime={date}
            className="leading-[1.3] font-bold"
          >
            {formatPostDate(date)}
          </time>
        </div>
        <Heading
          as="h2"
          styleAs="h3"
          textAlign="text-center"
          margin="mb-0"
        >
          <Link
            href={href}
            className="text-inherit no-underline"
          >
            {title}
          </Link>
        </Heading>
      </header>
      <div className="mb-12.5 px-[8.75%]">
        <p className="mb-0 max-w-full">{excerpt}</p>
      </div>
      <footer className="mt-auto">
        {/* a <div>: the article's content-link highlight is for paragraphs */}
        <div className="mb-12.5 px-[8.75%] text-center text-2xs leading-normal text-muted">
          <span>
            {'Filed Under: '}
            {categories.map((name, i) => (
              <span key={name}>
                {i > 0 && ', '}
                <Link
                  href={categoryHref(name)}
                  className="font-bold text-accent no-underline"
                >
                  {name}
                </Link>
              </span>
            ))}
          </span>
        </div>
      </footer>
    </article>
  )
}

/** Numbered archive pagination. */
function Pagination({
  page,
  pages,
  path,
}: {
  page: number
  pages: number
  path: string
}) {
  const href = (n: number) => (n === 1 ? path : `${path}page/${n}/`)
  const link =
    'mb-1 inline-block px-4 py-3 text-2xs leading-none font-normal no-underline md:mb-0'
  const items = [
    page > 1 && {
      key: 'previous',
      href: href(page - 1),
      label: (
        <>
          « <span className="sr-only">Go to</span> Previous Page
        </>
      ),
    },
    ...Array.from({ length: pages }, (_, i) => ({
      key: String(i + 1),
      href: href(i + 1),
      current: i + 1 === page,
      label: (
        <>
          <span className="sr-only">Page</span> {i + 1}
        </>
      ),
    })),
    page < pages && {
      key: 'next',
      href: href(page + 1),
      label: (
        <>
          <span className="sr-only">Go to</span> Next Page »
        </>
      ),
    },
  ].filter((item) => !!item)
  return (
    <nav
      aria-label="Pagination"
      className="my-20 text-center"
    >
      {/* the theme's list sits 20px inside its block above and below the row */}
      <ul className="m-0 list-none px-0 py-5 md:py-0">
        {/* inline-blocks separated by whitespace */}
        {items.map((item) => (
          <Fragment key={item.key}>
            <li className="mx-[3px] mb-1.5 inline-block">
              <a
                href={item.href}
                aria-current={
                  'current' in item && item.current ? 'page' : undefined
                }
                className={clsx(
                  link,
                  'current' in item && item.current
                    ? 'bg-accent2 text-body'
                    : 'bg-body text-contrast-dark'
                )}
              >
                {item.label}
              </a>
            </li>{' '}
          </Fragment>
        ))}
      </ul>
    </nav>
  )
}
