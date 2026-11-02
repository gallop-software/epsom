# Epsom — Gallop Canon Template

Epsom is a Next.js template for concrete floor contractors and specialty flooring companies, built on the Gallop Canon architecture system. Canon provides ESLint rules (`@gallop.software/canon/eslint`) and an audit CLI (`gallop audit`) that enforce the patterns below. The `CLAUDE.md` file is the canonical AI reference — there is no auto-generation pipeline.

"Bedrock Flooring" of Red Mesa, Texas is fictional demo content, including its clients, customers, testimonials, phone and email. See **Rebranding** below. Photos and the home hero video are AI-generated demo media: replace them with your own. Every block is built from a theme's exact computed styles, so some class strings look unusual (`h-[50.656px]`, `px-[calc(min(90%,640px)*0.05)]`); keep them unless the design is changing.

## Rebranding: where company content lives

Company identity is not centralized in one config file; these are the places it lives.

| What | Where |
|---|---|
| Site name, description, logo, share image, site-wide JSON-LD | `src/app/metadata.tsx` |
| Brand colors, type scale, breakpoints | `src/styles/tailwind.css` `@theme` |
| Fonts | `src/fonts/*.ts` (`_fonts/` via `gallop studio fonts`) |
| Navigation, logo, mobile CTA | `src/components/navbar/config.ts`; logo, favicon, share and client-logo files in `public/brand/` |
| Phone, email, social links, photo strip | `src/components/footer/config.ts`, `src/app/(default)/contact/_blocks/details.tsx`; credit line in `footer/index.tsx` |
| Calendly booking link | `NEXT_PUBLIC_CALENDLY_URL` (empty: the buttons go to `/contact/`) |
| Estimate call-to-action and client logos | `src/components/estimate-cta.tsx`, `src/components/brands.tsx` |
| Form email logo | `src/app/api/submit-form/route.ts` |
| Author name and archive | `src/components/post-hero.tsx`, `post-archive.tsx`, `src/utils/structured-data.ts`, `src/app/sitemap.ts`, `src/app/(default)/author/bedrock-flooring/` |
| Page copy and SEO titles | each route's `page.tsx` and `_blocks/` |
| Blog posts | `src/app/(post)/` (then `npm run blog`) |
| Images and video | AI-generated demo media in Gallop Studio (`/content/`, `/content/circles/`, `/heroes/`, `/videos/hero-home-hls/`): upload your own with `gallop studio upload`, then update the paths |

## Auto-Generated Files — Never Edit Manually

| File | Regenerate With | Triggered By |
|---|---|---|
| `_data/_studio.json` | Gallop Studio (`gallop studio …`) | Image additions, moves, removals |
| `_data/_blog.json` | `npm run blog` | Adding/editing posts in `src/app/(post)/` |
| `src/app/(demo)/block/[[...slug]]/_block-index.ts` | `npm run blocks` | Block additions/removals |

## Build Commands

| Command | Purpose |
|---|---|
| `gallop dev start` / `status` / `logs` | Development server inside Gallop (never start a second `next dev`) |
| `npm run dev` | Development server outside Gallop |
| `npm run build` | Production build (auto-runs npm run blog) |
| `npm run blog` | Regenerate blog metadata |
| `npm run blocks` | Regenerate the block preview index |
| `npm run lint` | ESLint check (run after edits) |
| `npm run ts` | TypeScript check |
| `npm run check` | lint + ts combined |
| `npm run audit` | Canon architecture report (`gallop audit`) |
| `npm run prettier` | Format code |
| `npm run cf:build` / `cf:deploy` / `cf:secrets` | Cloudflare Workers via OpenNext (Worker `epsom`); build and secrets use `.env.production` |

## File & Folder Authority

These rules govern what AI is allowed and forbidden to do when creating, moving, or modifying files and folders.

### Defined `/src` Structure

```
src/
├── app/          # Routes, layouts, metadata (Next.js App Router)
│   └── {route}/
│       ├── page.tsx
│       └── _blocks/  # Co-located page-specific blocks
├── components/   # Reusable UI primitives and block families
├── fonts/        # next/font/local: _bodyFont = Muli, _headingFont = Oswald, _quoteFont = leftquote
├── hooks/        # smooth-scroll, transitions-ready, analytics, use-active-video
├── styles/       # tailwind.css is the design system (Tailwind v4 @theme)
├── tools/        # page-slug and post-slug helpers
├── utils/        # page-helpers (PageMetadata), structured-data, studio-helpers, blog, calendly, send-email
└── state.ts      # Global state
```

### App Router Structure

```
src/app/
├── (default)/        # White header; content starts below it (+ blog, category, author, tag archives)
├── (hero)/           # Transparent header over a full-bleed hero (home, about, service pages)
├── (no-cta)/         # White header, no photo strip above the footer (gallery)
├── (post)/<slug>/    # Blog posts at the site root: page.tsx (metadata) + content.tsx
├── (demo)/block/[[...slug]]/  # Block preview: one page per block at /block/<route>/<block>/
├── api/submit-form/  # Form endpoint (Turnstile, honeypot, Mailgun or Cloudflare Email)
├── layout.tsx        # Fonts → CSS vars, body classes, analytics, TransitionsReady
├── metadata.tsx      # baseURL, siteName, defaultStructuredData
├── sitemap.ts, robots.ts, not-found.tsx, error.tsx
```

- All page routes must be inside a route group (parentheses folder)
- Never create routes directly under `src/app/` (except `api/`, root files)
- New route groups are allowed freely when a new layout variant is needed

### Page Contract (Pattern 005)

```tsx
function Content() { return (<><Hero /><Feature /><Cta /></>) }          // blocks from ./_blocks
const metadata: PageMetadata = { title, description, path: '/route/', publishDate, modifiedDate, openGraph: { type, image }, breadcrumbs }
export const generateMetadata = () => generatePageMetadata(metadata)
export default function Page() { return <PageWrapper metadata={metadata}><Content /></PageWrapper> }
```

`PageWrapper` emits the JSON-LD graph (WebPage, ImageObject, BreadcrumbList, WebSite + `defaultStructuredData`) and `<article className="main-content">`. `metadata.path` is the canonical route, with a trailing slash (`trailingSlash: true`).

### File Structure Rules

**Blocks:**
- Each page's sections are blocks co-located in `_blocks/` beside its `page.tsx`, so every page has its own blocks and every block has a preview page at `/block/<route>/<block>/` (home blocks at `/block/<block>/`)
- Run `npm run blocks` after adding or removing a block
- A block's default export takes no props; the preview route renders it on its own
- Singleton naming: `hero.tsx` (one per page), numbered when multiple: `content-2.tsx`, `content-3.tsx`
- Import with relative paths: `import Hero from './_blocks/hero'`
- Data-driven archives (`blog`, `category`, `author`, `tag`) render `post-archive` from `_data/_blog.json` and have no blocks

**Posts:**
- Each post is a folder directly in `src/app/(post)/<slug>/` with `page.tsx` (route + metadata) and `content.tsx` (the body). New posts are written by hand in the same shape
- `npm run blog` extracts the metadata from each post's `page.tsx` into `_data/_blog.json`, which the archives (6 per page), sitemap and recent-project lists read through `utils/blog.ts`

**Components:**
- Simple components: Single file in `src/components/`
- Complex components: Folder with `index.tsx`

**Images:**
- Every image is a Gallop Studio key (`/uploads/YYYY/MM/name.ext`) rendered through `Image`, served from `https://epsom-cdn.gallop.software` (R2 bucket `epsom`)
- Import new media with `gallop studio upload <file> --to uploads/YYYY/MM`. Never copy files into `public/`

### DO — What AI IS Allowed To Do

- Create files only inside existing Canon-defined zones
- Place new files in the zone that matches their architectural role
- Follow existing folder conventions within a zone
- Reuse existing folders when possible
- Create new route groups in `src/app/` when new layouts are needed
- Create dotfiles/directories at project root (`.github/`, `.cursor/`, etc.)
- Import generated `_data/*.json` in runtime code via the `@/data/*` alias (bundled at build time)
- Ask for confirmation if the correct zone is ambiguous

### DO NOT — What AI Is Forbidden To Do

- Create new top-level directories (except dotfiles)
- Create new folders in `/src` (except route groups)
- Place files outside Canon-defined zones
- Mix responsibilities across zones (components importing blocks, etc.)
- Reorganize or move folders without explicit instruction
- Invent new organizational conventions
- Create placeholder or speculative files
- Import from `_scripts/` in runtime code (Node-only)
- Read `_data/*.json` from disk at runtime (`fs.readFileSync` + `process.cwd()`) — there is no filesystem on edge/Workers runtimes, so it silently returns empty; import via `@/data/*` instead
- Manually edit files in `_data/` (generated only)

## Cloudflare Workers Constraints

The site deploys to Cloudflare Workers (OpenNext), which is not Node.js:

- There is no filesystem at runtime. `fs.readFileSync` on `_data/` silently returns nothing, so import generated JSON through `@/data/*`
- `nodejs_compat` in `wrangler.jsonc` is required
- Worker `name` and the `WORKER_SELF_REFERENCE` service in `wrangler.jsonc` must match
- `.env.production` is the only source of live settings: `npm run cf:build` loads it ahead of `.env.local`
- `NEXT_PUBLIC_*` values are inlined at build time; everything else is a Worker secret (`npm run cf:secrets`)

## Enforced Patterns (ESLint)

These patterns are enforced by `@gallop.software/canon/eslint`. Violations will be flagged.

- **001: Server-First Blocks** — `gallop/no-client-blocks` — Blocks must be server components
- **002: Layout Hierarchy** — `gallop/no-container-in-section` — No Container inside Section
- **003: Typography Components** — `gallop/prefer-typography-components` — Use Paragraph, not raw tags
- **004: Component Props** — `gallop/prefer-component-props` — Use props over className for supported styles
- **006: Block Naming** — `gallop/block-naming-convention` — Descriptive kebab-case naming, PascalCase exports
- **007: Import Paths** — `gallop/prefer-alias-imports` — @/ aliases, direct file imports
- **009: Color Tokens** — `gallop/no-raw-colors` — Use semantic color tokens
- **012: Icon System** — `gallop/no-inline-svg` — Iconify with Icon component
- **014: clsx Not classnames** — `gallop/no-classnames-package` — Use clsx, never classnames package
- **018: Layout Components** — `gallop/prefer-layout-components` — Use Columns, not raw div with grid
- **019: Background Image Rounded** — `gallop/background-image-rounded` — Background images must have rounded="rounded-none"
- **020: No Arbitrary Colors** — `gallop/no-arbitrary-colors` — Use defined color tokens, not arbitrary color values
- **021: Cross-Zone Import Boundaries** — `gallop/no-cross-zone-imports` — Enforce import boundaries between Canon zones
- **024: React Intersection Observer** — `gallop/no-native-intersection-observer` — Use react-intersection-observer package, not native API
- **025: No Components in Blocks** — `gallop/no-component-in-blocks` — Exported component functions must be in components folder; non-exported content components are allowed in blocks
- **026: List Components** — `gallop/prefer-list-components` — Use List/Li, not raw ul/li tags
- **027: Luxon for Dates** — `gallop/no-native-date` — Use Luxon DateTime, not native JavaScript Date

## Documentation Patterns

These patterns are not enforced by ESLint but should be followed.

- **005: Page Structure**: PageWrapper, generatePageMetadata pattern
- **010: Spacing System**: Tailwind's scale (`mb-7.5`, `h-25`); brackets only for odd px values and widths
- **011: Responsive Mobile-First**: sm/md/lg/xl breakpoint usage (see Color Token System: they are not Tailwind's defaults)
- **013: New Component Pattern**: Props for margin/color/fontSize
- **015: No Inline Hover Styles**: Tailwind for hover states
- **016: Client Extraction**: Extract hooks to components, not blocks (see Pattern 001 for enforcement)
- **017: SEO Metadata**: PageMetadata structure, structured data

## Color Token System

All tokens live in `src/styles/tailwind.css` `@theme`.

- **Colors**: `body` (#fff), `body-light` (#f7f7f7), `body-dark` (#edecee), `body2`, `contrast` (#222), `contrast-light` (#333, headings), `accent` (yellow #ffcc2a), `accent2` (navy #043f61), `accent3`…`accent6`, plus `muted` (#888), `form-border`, `profile-text`, `profile-avatar`. **Never use**: `gray-*`, `white`, `black`, `slate-*`
- **Breakpoints** replace Tailwind's defaults: `sm` 601, `md` 861, `lg` 1024, `xl` 1201px
- **Type scale** is in px (`text-base` = 17px body; headings via `Heading`'s scale)
- **Layout**: `h-header`/`pt-header`/`top-header` = 94px; `h-screen-header` = 100vh - 94px (sticky-scroll panes)
- **Section padding** is a share of the content column (`--content-column`: 90% up to 640px, 750px from 1024px): `px-col-5`, `py-col-15`, `pb-col-19`, `py-col-30`; `px-cards` for the icon-card row
- **Transitions** default to CSS `ease`, and are off until `<html class="ready">` (WebKit would otherwise animate pseudo-elements in on load)

## Component Quick Reference

- **Primitives**: `Container` (content/wide column widths), `Columns` (plain `<div>` children keep the last child's bottom margin), `Section` (full-width band: background image or pattern, parallax, overlay), `Heading`, `Paragraph`, `Button`/`Buttons` (offset border; `textColor` for fills), `Quote` (+ `size="large"`), `List`, `Spacer`, `Image` (Studio-backed `<img>` with srcset), `Icon` (Iconify)
- **Block families**: `hero-banner` (photo or looping HLS video background; + `typewriter-heading`, downLink), `image-filter`, `image-feature`, `icon-cards`, `sticky-scroll`, `estimate-cta`, `elegant-heading`, `post-cards`, `logo-gallery` (3 or 5 per row, optional caption), `showcase-gallery`, `process-steps`, `calendly-button` (optional `href` fallback)
- **Shared sections**: `our-process` (the four steps), `projects-band` (recent posts of a category), `brands` (client logos)
- **Page parts**: `page-header` (white title band), `details` (FAQ accordion row), `team-grid` (ready for your team's photos; not on a page in the demo), `contact-icons`
- **Video**: `hls-video` is the HLS player (hls.js, loads near the viewport, plays muted in view, one at a time). Encode with `gallop studio ffmpeg` (`gallop studio ffmpeg --help`) into 1080p, 720p and 480p renditions plus a `master.m3u8`, then `gallop studio upload <dir> --to videos/<name>-hls`. The bucket's CORS rule must allow the site's origin (GET/HEAD)
- **Blog**: `post-hero`, `post-body`, `post-gallery`, `post-archive` (cards + pagination)
- **Forms**: `form/` posts to `api/submit-form` (honeypot `companyWebsite`, invisible Turnstile when `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` is set). Fields: `FormInput`, `FormName`, `FormSelect`, `FormTextArea`, `FormUpload` (`name="files"` → attachments), `FormButton`; a visible label when `label` is set; `tone="dark"` for dark sections. The Contact form confirms to the visitor (`CONFIRMED_FORMS` in the route). Turnstile rejects automated browsers: test forms in a real one
- **Lightbox**: `lightbox-wrapper` + `lightbox/` on `a.lightbox-item` links, colored by `--color--gallery*`
- **Chrome**: `navbar/` (`navbar/config.ts`, `mobile-cta`), `footer/` (`footer/config.ts`)

## State Management

valtio store at `src/state.ts`. Read with `useSnapshot(state)`, write with `state.propName = value`.

Available state: `offsetTop`, `windowHeight`, `lastOffsetTop`, `isScrolling`, `dialogOpen`, `scrollingDirection`, `lastScrollingDirection`, `lockScrollDirection`, `activeVideoId`.

## Template-Specific Rules

- Use the color prop on typography components (Heading, Paragraph, Quote)
- Use props (fontSize, margin, fontWeight, textAlign) instead of className when a component prop exists
- Import icons only from `@iconify/icons-heroicons`, `@iconify/icons-lucide` or `@iconify/icons-mdi`
- Run `npm run blog` after adding/editing posts, and `npm run blocks` after adding/removing blocks

## Do NOT

- Use `'use client'` in blocks - extract to components
- Use raw `<p>` or `<h1>`–`<h6>` - use Paragraph/Heading components
- Use className for margin/color/fontSize when component has props
- Use Container inside Section
- Use `classnames` package - use `clsx` instead
- Use inline styles for hover states - use Tailwind classes
- Use native `IntersectionObserver` - use `react-intersection-observer` package
- Use inline `<svg>` - use the Icon component with Iconify icons
- Use deep relative imports (`../../`) - use `@/` alias imports
- Use gray-*, white, black, slate-* — always map to a semantic token
- Put text color in className when component has a color prop
- Manually construct image URLs when a `_data/_studio.json` entry exists
- Read `_data/*.json` with fs at runtime - import via `@/data/*` (no filesystem on Workers)
- Manually edit files in `_data/` (generated only)
- Add files to `public/` by hand; use `gallop studio`
- Start a second dev server; use `gallop dev`
- Commit `.env*` files (all are gitignored; secrets go to Cloudflare via `npm run cf:secrets`)

## Post-Edit Verification

After editing files:
1. Run `npm run lint`
2. Run `npm run ts`
3. Fix any violations before committing

Note: Only lint files you edited, not the entire codebase.
