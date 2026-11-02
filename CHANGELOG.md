# Changelog

## 2026-11-02

- Epsom 1.0.0: template for concrete floor contractors, built from a production flooring site
- Add a block preview page for every block (`/block/<route>/<block>/`, `npm run blocks`)
- Remove the WordPress migration tooling, redirects and the unused search index
- Move media to the template's own bucket, served from `epsom-cdn.gallop.software`
- Rebrand the demo to the fictional Bedrock Flooring; `NEXT_PUBLIC_CALENDLY_URL` sets the booking link
- Rewrite all copy, and replace all photos and videos with placeholders

## 2026-10-12

- Contact forms send through Cloudflare Email Service on Cloudflare (when `EMAIL_DOMAIN` is set) and through Mailgun on Vercel, from one form and one API route
- Add form spam protection: Turnstile, a honeypot field, input validation and attachment limits
- Form mail no longer sends a copy to the visitor; they are the Reply-To, and the developer is copied openly
- `npm run cf:build` builds from `.env.production` whatever other env files are on disk, and fails if the bundle does not match it; the site URL is no longer hardcoded
- `npm run cf:preview` sends form mail only to the developer and turns Turnstile off

## 2025-04-28

- Update template to Tailwind CSS v4.1.4

## 2025-04-10

- Update template to Tailwind CSS v4.1.3

## 2025-03-22

- Update template to Tailwind CSS v4.0.15

## 2025-02-10

- Update template to Tailwind CSS v4.0.6

## 2025-01-23

- Update template to Tailwind CSS v4.0

## 2024-10-07

- Tidy tier data on pricing page

## 2024-09-23

- Fix incorrect date format on blog post page ([#1632](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1632))
- Update all images to use absolute paths ([#1631](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1631))

## 2024-09-13

- Update dependencies

## 2024-09-12

- Initial release
