#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

// Posts live at the site root (/<slug>/), directly in route groups: (post) for
// the featured-image layout, (video-post) for video posts (white header).
const POSTS_DIRS = ['src/app/(post)', 'src/app/(video-post)'].map((dir) =>
  path.join(ROOT_DIR, dir)
)
const OUTPUT_FILE = path.join(ROOT_DIR, '_data/_blog.json')

function extractMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')

    // Match `const metadata: PageMetadata = { … }` (folder-per-post shape)
    const metadataMatch = content.match(
      /^const metadata[^=]*=\s*({[\s\S]*?^})/m
    )

    if (!metadataMatch) {
      console.warn(`No metadata declaration found in ${filePath}`)
      return null
    }

    const metadataCode = `return ${metadataMatch[1]}`
    return new Function(metadataCode)()
  } catch (error) {
    console.error(`Failed to extract metadata from ${filePath}:`, error.message)
    return null
  }
}

// Posts keep `const TITLE = '...'` in content.tsx as the plain card title.
// The SEO `metadata.title` (in page.tsx) is the full "Title | Subtitle" form;
// _blog.json should store the plain version so blog cards render the short name.
function extractPlainTitle(contentPath) {
  if (!fs.existsSync(contentPath)) return null
  const content = fs.readFileSync(contentPath, 'utf8')
  const match =
    content.match(/const TITLE\s*=\s*"((?:[^"\\]|\\.)*)"/) ||
    content.match(/const TITLE\s*=\s*'((?:[^'\\]|\\.)*)'/) ||
    content.match(/const TITLE\s*=\s*`((?:[^`\\]|\\.)*)`/)
  return match ? match[1].replace(/\\(.)/g, '$1') : null
}

async function generateBlogMetadata() {
  console.log('🔍 Scanning posts directory...')

  const dataDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  const folders = POSTS_DIRS.filter((dir) => fs.existsSync(dir)).flatMap(
    (dir) =>
      fs
        .readdirSync(dir, { withFileTypes: true })
        .filter(
          (entry) =>
            entry.isDirectory() &&
            !entry.name.startsWith('[') &&
            !entry.name.startsWith('_') &&
            fs.existsSync(path.join(dir, entry.name, 'page.tsx'))
        )
        .map((entry) => ({ dir, slug: entry.name }))
  )

  console.log(`📝 Found ${folders.length} post folders`)

  const posts = []

  for (const { dir, slug } of folders) {
    const filePath = path.join(dir, slug, 'page.tsx')
    const contentPath = path.join(dir, slug, 'content.tsx')
    const metadata = await extractMetadata(filePath)
    const plainTitle = extractPlainTitle(contentPath)

    if (metadata) {
      posts.push({
        slug,
        metadata: {
          title: plainTitle || metadata.title || '',
          description: metadata.description || '',
          date: metadata.date || '',
          categories: metadata.categories || [],
          featuredImage: metadata.featuredImage || '',
          author: metadata.author || '',
          excerpt: metadata.excerpt || '',
          ...(metadata.video && { video: metadata.video }),
          modified: metadata.modifiedDate || '',
        },
      })
    }
  }

  posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date)
    const dateB = new Date(b.metadata.date)
    return dateB.getTime() - dateA.getTime()
  })

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf8')

  console.log(`✅ Generated blog metadata: ${OUTPUT_FILE}`)
  console.log(`📊 Total posts: ${posts.length}`)
}

generateBlogMetadata().catch((error) => {
  console.error('❌ Error generating blog metadata:', error)
  process.exit(1)
})
