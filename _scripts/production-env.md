# production-env.mjs

Keeps `.env.production` the only source of live settings for a Cloudflare build.

**Tier:** Internal  
**File:** `_scripts/production-env.mjs`

---

## Usage

```bash
npm run cf:build     # build
npm run cf:preview   # dev-vars, then build and preview
```

## What It Does

- **`build`** loads `.env.production` into the process environment, builds the Worker with OpenNext, then checks the bundle. Without the file (a Git-connected build), the build variables are used as they are.
- **`check`** confirms the built bundle carries the `.env.production` values.
- **`dev-vars`** writes `.dev.vars` for `npm run cf:preview`: the production values, with form mail sent to the developer and Turnstile off.

## Why

Next.js and OpenNext both read `.env.local` in production builds, ahead of `.env.production`. Values already in the process environment beat every env file, so loading `.env.production` there first makes it win.

To build for another hostname without editing the file:

```bash
SITE_URL=https://staging.yourdomain.com npm run cf:deploy
```

---

[← Back to README](../README.md)
