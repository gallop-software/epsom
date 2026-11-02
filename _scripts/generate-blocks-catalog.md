# generate-blocks-catalog.mjs

Generate the demo block index.

**Tier:** Internal  
**File:** `_scripts/generate-blocks-catalog.mjs`

---

## Usage

```bash
# Regenerate the block index
npm run blocks
```

## What It Does

1. **Scans block files** - Recursively finds every `.tsx` file in `_blocks/` directories under `src/app/`, deduplicating shared blocks by slug.
2. **Generates the block index** - Writes `src/app/(demo)/block/[[...slug]]/_block-index.ts`, a map of demo slugs to dynamic block imports consumed by the demo block-preview route (`generateStaticParams` + dynamic import).

## Output

### Block index (`src/app/(demo)/block/[[...slug]]/_block-index.ts`)

Auto-generated TypeScript mapping each demo slug to a dynamic import:

```typescript
export const blockImports: Record<string, () => Promise<{ default: ComponentType }>> = {
  'about/intro': () => import('@/app/(hero)/about/_blocks/intro'),
  // ...
}

export const blockSlugs = Object.keys(blockImports)
```

The demo route renders these live block components directly — there are no prebuilt
screenshots.

## Troubleshooting

### Missing blocks

- Ensure block files end in `.tsx` and live in a `_blocks/` directory under `src/app/`

---

[← Back to README](../README.md)
