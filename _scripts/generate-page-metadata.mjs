#!/usr/bin/env node

// Scans src/app for static page routes and writes _data/_pages.json.
//
// This has to happen at build time: the site counts its own page views and
// only counts pages that exist, naming them by their titles, and there is no
// filesystem to scan on Cloudflare Workers. src/utils/page-views.ts imports
// the generated JSON instead. Ported from medicine-opera.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execFileSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

const APP_DIR = path.join(ROOT_DIR, 'src/app')
const OUTPUT_FILE = path.join(ROOT_DIR, '_data/_pages.json')

const BLOCKED_ROUTE_GROUPS = ['(demo)', '(admin)']
const EXCLUDED_FOLDERS = [
  'api',
  'post', // Posts are handled separately
]

// When the page was last changed: its last commit, so the date does not move
// every time the files are checked out. A page not yet committed, or a copy
// without its history, falls back to the file's own date.
function lastModified(pagePath) {
  try {
    const date = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', pagePath],
      { cwd: ROOT_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim()
    if (date) return new Date(date).toISOString()
  } catch {
    // No git here.
  }
  return fs.statSync(pagePath).mtime.toISOString()
}

// The string a page assigns to `const title` or `const description`. A page
// that sets them some other way has none, and is left out of search.
function readStringConst(source, name) {
  const match = source.match(
    new RegExp(`const ${name}\\s*=\\s*(['"\`])((?:\\\\.|(?!\\1)[^\\\\])*)\\1`)
  )
  if (!match) return undefined
  return match[2].replace(/\\(.)/g, '$1').replace(/\s+/g, ' ').trim()
}

// As above, or the same name in the page's metadata: `title: '…'`.
function readString(source, name) {
  const fromConst = readStringConst(source, name)
  if (fromConst) return fromConst
  const match = source.match(
    new RegExp(`\\b${name}:\\s*(['"\`])((?:\\\\.|(?!\\1)[^\\\\])*)\\1`)
  )
  if (!match) return undefined
  return match[2]
    .split('${')[0]
    .replace(/\\(.)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function readPage(pagePath) {
  const source = fs.readFileSync(pagePath, 'utf8')
  const title = readString(source, 'title')
  const description = readString(source, 'description')
  return {
    modified: lastModified(pagePath),
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  }
}

function scanRouteGroup(routeGroupPath, out) {
  const entries = fs.readdirSync(routeGroupPath, { withFileTypes: true })

  // Check for home page (page.tsx directly in route group)
  const homePagePath = path.join(routeGroupPath, 'page.tsx')
  if (fs.existsSync(homePagePath)) {
    const { modified, ...text } = readPage(homePagePath)
    out.push({ slug: '', modified, uri: '/', ...text })
  }

  scanFolder(routeGroupPath, '', out)
}

// Every page.tsx below a folder, at any depth: a page may sit under another
// (medicine-and-opera/photographs). Dynamic segments, route groups and
// private folders are left out.
function scanFolder(folderPath, uri, out) {
  const entries = fs.readdirSync(folderPath, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (EXCLUDED_FOLDERS.includes(entry.name)) continue
    if (entry.name.startsWith('[') && entry.name.endsWith(']')) continue
    if (entry.name.startsWith('(') && entry.name.endsWith(')')) continue
    if (entry.name.startsWith('_')) continue

    const childUri = uri + '/' + entry.name
    const pagePath = path.join(folderPath, entry.name, 'page.tsx')
    if (fs.existsSync(pagePath)) {
      const { modified, ...text } = readPage(pagePath)
      out.push({ slug: entry.name, modified, uri: childUri, ...text })
    }
    scanFolder(path.join(folderPath, entry.name), childUri, out)
  }
}

function main() {
  const out = []

  for (const entry of fs.readdirSync(APP_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    if (!(entry.name.startsWith('(') && entry.name.endsWith(')'))) continue
    if (BLOCKED_ROUTE_GROUPS.includes(entry.name)) continue
    scanRouteGroup(path.join(APP_DIR, entry.name), out)
  }

  // Remove duplicate home pages (keep first one)
  const seen = new Set()
  const pages = out.filter((item) => {
    if (seen.has(item.uri)) return false
    seen.add(item.uri)
    return true
  })

  const dataDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(pages, null, 2) + '\n', 'utf8')

  console.log(
    `✅ Wrote ${pages.length} pages → ${path.relative(ROOT_DIR, OUTPUT_FILE)}`
  )
}

main()
