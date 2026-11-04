#!/usr/bin/env node
// Keeps .env.production the only source of live settings for a Cloudflare
// build, whatever other env files are on disk.
//
//   build     Build the Worker with .env.production loaded into the process
//             environment, then check the result. Without the file (a
//             Git-connected build), the build variables are used as they are.
//   check     Confirm the built bundle carries the .env.production values.
//   dev-vars  Write .dev.vars for `npm run cf:preview`: the production values,
//             with form mail sent to the developer and Turnstile off.
//
// Why: Next.js and OpenNext both read .env.local in production builds, ahead of
// .env.production. Values already in the process environment beat every env
// file, so loading .env.production there first makes it win.

import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const productionFile = path.join(root, '.env.production')
const devVarsFile = path.join(root, '.dev.vars')
const bundleEnvFile = path.join(root, '.open-next/cloudflare/next-env.mjs')

const SECRET_KEYS = /(SECRET|KEY|TOKEN|PASSWORD)/

function fail(message) {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

/**
 * KEY=value lines; quotes around a value are dropped, comments ignored.
 * Returns null when there is no file and it is not required.
 */
function readProductionEnv({ required = true } = {}) {
  if (!fs.existsSync(productionFile)) {
    if (!required) return null
    fail('.env.production not found. Run `npm run cf:setup` and fill it in.')
  }
  const vars = {}
  for (const line of fs.readFileSync(productionFile, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (!match) continue
    const [, key, raw] = match
    vars[key] = raw.replace(/^(['"])(.*)\1$/, '$2')
  }
  return vars
}

/**
 * Form mail goes through Cloudflare Email Service when EMAIL_DOMAIN is set,
 * and through Mailgun otherwise (see src/utils/send-email.ts).
 */
function mailSettings(vars) {
  return vars.EMAIL_DOMAIN
    ? {
        provider: 'Cloudflare Email Service',
        toKey: 'EMAIL_TO',
        devKey: 'EMAIL_DEV_TO',
      }
    : {
        provider: 'Mailgun',
        toKey: 'MAILGUN_SMTP_MAIL',
        devKey: 'MAILGUN_DEV_MAIL',
      }
}

function display(key, value) {
  if (!value) return '(empty)'
  return SECRET_KEYS.test(key) ? '(set)' : value
}

function build() {
  const vars = readProductionEnv({ required: false })
  const env = { ...process.env, ...vars }
  // SITE_URL lets one build target another hostname without editing the file
  if (process.env.SITE_URL)
    env.NEXT_PUBLIC_PRODUCTION_URL = process.env.SITE_URL
  if (!env.NEXT_PUBLIC_PRODUCTION_URL) {
    fail(
      'NEXT_PUBLIC_PRODUCTION_URL is not set. Run `npm run cf:setup` and fill in\n' +
        '  .env.production, or set it as a build variable.'
    )
  }

  const result = spawnSync('opennextjs-cloudflare', ['build'], {
    cwd: root,
    env,
    stdio: 'inherit',
    shell: true,
  })
  if (result.status !== 0) process.exit(result.status ?? 1)

  if (!vars) {
    console.log(
      `\n✔ Built for ${env.NEXT_PUBLIC_PRODUCTION_URL} from the build variables` +
        ' (no .env.production to check against)\n'
    )
    return
  }
  return check({ siteUrl: env.NEXT_PUBLIC_PRODUCTION_URL })
}

async function check({ siteUrl } = {}) {
  const vars = readProductionEnv()
  if (siteUrl) vars.NEXT_PUBLIC_PRODUCTION_URL = siteUrl
  if (!fs.existsSync(bundleEnvFile)) {
    fail('No built bundle found. Run `npm run cf:build` first.')
  }

  // Bust the import cache so a rebuild in the same process is read fresh
  const bundle = await import(`${pathToFileURL(bundleEnvFile)}?t=${Date.now()}`)
  const built = bundle.production ?? {}

  const mismatched = Object.keys(vars).filter((key) => built[key] !== vars[key])
  if (mismatched.length) {
    fail(
      `The built bundle does not match .env.production for: ${mismatched.join(', ')}.\n` +
        '  Another env file is overriding it. Nothing was deployed.'
    )
  }
  // A setting only another env file has would go live with that file's value,
  // such as .env.local's sign-in secret.
  const strays = Object.keys(built).filter((key) => !(key in vars))
  if (strays.length) {
    fail(
      `The built bundle has settings .env.production does not: ${strays.join(', ')}.\n` +
        '  They came from another env file. Add them to .env.production. Nothing was deployed.'
    )
  }
  const mail = mailSettings(built)
  if (!built[mail.toKey]) {
    fail(
      `${mail.toKey} is empty in .env.production: form mail would go nowhere.`
    )
  }

  const turnstileOn =
    Boolean(built.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY) &&
    Boolean(built.CLOUDFLARE_TURNSTILE_SECRET_KEY)

  console.log('\n✔ Bundle matches .env.production')
  console.log(
    `  Site URL      ${display('URL', built.NEXT_PUBLIC_PRODUCTION_URL)}`
  )
  console.log(`  Mail through  ${mail.provider}`)
  console.log(`  Form mail to  ${built[mail.toKey]}`)
  console.log(`  Copied to     ${display('CC', built[mail.devKey])}`)
  console.log(`  Turnstile     ${turnstileOn ? 'on' : 'off'}\n`)
  if (built[mail.toKey] === built[mail.devKey]) {
    console.log('  Note: form mail goes to the developer address only.\n')
  }
}

function writeDevVars() {
  const vars = readProductionEnv()
  const mail = mailSettings(vars)
  const preview = {
    ...vars,
    // A local preview must never mail the client
    [mail.toKey]: vars[mail.devKey] ?? '',
    // The widget only accepts the live hostnames; empty skips the check
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: '',
    CLOUDFLARE_TURNSTILE_SECRET_KEY: '',
  }
  if (!preview[mail.toKey]) {
    fail(
      `${mail.devKey} is empty in .env.production: the preview has no safe recipient.`
    )
  }

  const lines = [
    '# Generated by `npm run cf:preview` from .env.production. Do not edit:',
    `# it is rewritten on every preview. Form mail goes to ${mail.devKey} and`,
    '# Turnstile is off, so a local preview cannot reach the client.',
    ...Object.entries(preview).map(
      ([key, value]) =>
        `${key}=${/\s/.test(value) ? JSON.stringify(value) : value}`
    ),
    '',
  ]
  fs.writeFileSync(devVarsFile, lines.join('\n'))
  console.log(
    `✔ Wrote .dev.vars (form mail to ${preview[mail.toKey]}, Turnstile off)`
  )
}

const command = process.argv[2]
if (command === 'build') await build()
else if (command === 'check') await check()
else if (command === 'dev-vars') writeDevVars()
else fail('Usage: node _scripts/production-env.mjs <build|check|dev-vars>')
