import Link from 'next/link'
import type { ReactNode } from 'react'
import { Container } from '@/components/container'
import { categoryHref } from '@/utils/blog'

/** The post text column, then "Filed Under" with the post's categories. */
export function PostBody({
  categories,
  children,
}: {
  categories: string[]
  children: ReactNode
}) {
  return (
    <div className="pb-20">
      <Container className="mb-12.5 [&>:last-child]:mb-0">{children}</Container>
      {/* a <div>: the article's content-link highlight is for paragraphs */}
      <div className="site-wrap mb-12.5 text-center text-2xs leading-normal text-muted lg:px-[8.75%]">
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
    </div>
  )
}
