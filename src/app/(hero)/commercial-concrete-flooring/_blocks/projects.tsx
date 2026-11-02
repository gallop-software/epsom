import { ProjectsBand } from '@/components/projects-band'
import { recentPosts } from '@/utils/blog'

export default function Projects() {
  return (
    <ProjectsBand
      title="A Look at Our Latest Commercial Floor Jobs"
      href="/category/commercial-concrete-flooring-projects/"
      label="Browse Every Commercial Floor Job"
      posts={recentPosts(3, 'commercial-concrete-flooring-projects')}
    />
  )
}
