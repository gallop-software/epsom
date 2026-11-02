import { ProjectsBand } from '@/components/projects-band'
import { recentPosts } from '@/utils/blog'

export default function Projects() {
  return (
    <ProjectsBand
      title="A Look at Our Latest Home and Garage Floors"
      href="/category/residential-concrete-flooring-projects/"
      label="Browse Every Home and Garage Floor"
      posts={recentPosts(3, 'residential-concrete-flooring-projects')}
    />
  )
}
