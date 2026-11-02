import { Button } from '@/components/button'
import { Buttons } from '@/components/buttons'
import { Heading } from '@/components/heading'
import { PostCards, type PostCard } from '@/components/post-cards'
import { Section } from '@/components/section'
import { Spacer } from '@/components/spacer'

export interface ProjectsBandProps {
  title: string
  posts: PostCard[]
  /** "See all" link and its label. */
  href: string
  label: string
}

/** Grey band with the latest project posts of a category. */
export function ProjectsBand({ title, posts, href, label }: ProjectsBandProps) {
  return (
    <Section
      className="bg-body-light px-col-5 py-col-15"
      maxWidth="max-w-[1120px]"
      imageSrc="/patterns/section_diagonals-4.svg"
      parallax
      overlayColor="bg-body-light/60"
    >
      <Spacer height="h-0 mb-[5%]" />
      <Heading
        as="h2"
        textAlign="text-center"
        className="mx-auto max-w-[750px]"
      >
        {title}
      </Heading>
      <Spacer height="h-[29px]" />
      <PostCards
        readMore="See Project"
        posts={posts}
      />
      <Spacer
        height="h-6.5"
        className="lg:hidden"
      />
      <Spacer
        height="h-22"
        className="max-lg:hidden"
      />
      <Buttons justify="justify-center">
        <Button
          href={href}
          variant="outline"
          color="accent2"
        >
          {label}
        </Button>
      </Buttons>
    </Section>
  )
}
