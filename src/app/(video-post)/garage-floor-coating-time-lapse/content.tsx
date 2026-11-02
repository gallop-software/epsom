import { Paragraph } from '@/components/paragraph'
import { PostBody } from '@/components/post-body'
import { PostHero } from '@/components/post-hero'
import { VideoEmbed } from '@/components/video-embed'

const TITLE = 'Garage Floor Coating Time-Lapse'

export function Content() {
  return (
    <>
      <PostHero
        title={TITLE}
        date="2021-02-26T10:21:34"
      />
      <PostBody categories={['Residential Concrete Flooring Projects']}>
        <VideoEmbed
          src="/videos/placeholder-video-hls/master.m3u8"
          title="Garage Floor Coating Time-Lapse"
        />
        <Paragraph>
          {'Here is a '}
          <a href="https://www.instagram.com/explore/tags/residentialflooring/">
            #residentialflooring
          </a>{' '}
          job sped up, showing a garage floor coating from bare slab to
          finished surface.
        </Paragraph>
      </PostBody>
    </>
  )
}
