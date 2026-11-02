import { Button } from '@/components/button'
import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
import { ElegantHeading } from '@/components/elegant-heading'
import { PostCards } from '@/components/post-cards'
import { Spacer } from '@/components/spacer'
import { recentPosts } from '@/utils/blog'

export default function RecentProjects() {
  return (
    <>
      <Spacer height="h-[17px]" />
      <ElegantHeading
        bold="Latest"
        light="Jobs"
      />
      <Container width="wide">
        <PostCards
          readMore="View the Job"
          posts={recentPosts(3)}
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
            href="/blog/"
            variant="outline"
            color="accent2"
          >
            Browse All Jobs
          </Button>
        </Buttons>
      </Container>
      <Spacer
        height="h-20"
        className="max-lg:hidden"
      />
      <Spacer
        height="h-[45px]"
        className="lg:hidden"
      />
    </>
  )
}
