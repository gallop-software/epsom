import { escapeHtmlEntities as escapeHtml } from '@/tools/escape-html-entities'
import { studioUrl } from '@/utils/studio-helpers'

const LOGO_PATH = '/brand/logo-navy.png'

/**
 * Where a mail client loads the logo from. An email has no page to be relative to, so a
 * logo Studio still serves from this site (rather than from the CDN) is given the site's
 * address in front.
 */
function logoUrl(siteUrl: string): string {
  const url = studioUrl(LOGO_PATH, 'medium')
  return /^https?:\/\//.test(url) ? url : `${siteUrl}${url}`
}

/**
 * The site's email look, the same as its form mail
 * (src/app/api/submit-form/route.ts): the logo over plain sections on light grey.
 * Every email from this file goes through here, so there is one look to adjust.
 * Styles are inline, because not every mail client keeps a style block. Each
 * section is HTML the caller has already escaped.
 *
 * `siteUrl` is the site's own address with no trailing slash (`siteUrl()` in
 * `server-env.ts`). It is passed in, not read here, so the renderers stay plain
 * functions of their arguments.
 */
function emailHtml(sections: string[], siteUrl: string): string {
  return `<!doctype html>
    <html>
    <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
    <body style="background:#f7f7f7;font-family:Arial, sans-serif;margin:0;padding:20px;color:#222222;">
      <div style="max-width:100%;margin:auto;background:#f7f7f7;padding:75px 15px;">
        <div style="max-width:550px;margin:0 auto;">
          <img src="${escapeHtml(logoUrl(siteUrl))}" alt="Bedrock Flooring" style="display:block;margin:0 auto 20px;max-width:200px;padding-bottom:20px;" />
          ${sections.join('\n          <div style="height:32px;"></div>\n          ')}
        </div>
      </div>
    </body>
    </html>`
}

const signInLine = (text: string) =>
  `<p style="margin:0 0 20px 0;line-height:1.45;font-size:1.2rem;">${text}</p>`

export function renderSignInCodeEmailHtml(
  code: string,
  minutes: number,
  siteUrl: string
): string {
  return emailHtml(
    [
      `${signInLine('Your Bedrock Flooring sign-in code:')}
     <p style="margin:0 0 20px 0;line-height:1.2;font-size:2.4rem;font-weight:700;letter-spacing:6px;">${escapeHtml(code)}</p>
     ${signInLine(`It works for ${minutes} minutes. If you did not ask for it, you can ignore this email.`)}`,
    ],
    siteUrl
  )
}

export function renderSignInLinkEmailHtml(
  url: string,
  minutes: number,
  siteUrl: string
): string {
  return emailHtml(
    [
      `${signInLine('Open this link to sign in to Bedrock Flooring:')}
     ${signInLine(`<a href="${escapeHtml(url)}" style="color:#222222;font-weight:700;">Sign in</a>`)}
     ${signInLine(`It works for ${minutes} minutes. If you did not ask for it, you can ignore this email.`)}`,
    ],
    siteUrl
  )
}

/** The site's button, as a table so every mail client draws it: the accent, white text. */
function buttonHtml({ text, href }: { text: string; href: string }): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
            <tr><td style="border-radius:4px;background:#025fc7;">
              <a href="${escapeHtml(href)}" style="display:inline-block;padding:13px 28px;border-radius:4px;font-size:15px;font-weight:600;line-height:1;color:#ffffff;text-decoration:none;">${escapeHtml(text)}</a>
            </td></tr>
          </table>`
}

/** A quiet sentence under a rule. */
function noteRowHtml(text: string): string {
  return `<p style="margin:22px 0 0;padding-top:20px;border-top:1px solid #dddddd;font-size:13px;line-height:1.5;color:#666666;">${escapeHtml(text)}</p>`
}

/** A small label over a headline: how the FlowTrace emails open. */
function headlineHtml(label: string, headline: string): string {
  return `<p style="margin:0 0 10px;font-size:15px;color:#666666;">${escapeHtml(label)}</p>
          <p style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:700;color:#222222;">${escapeHtml(headline)}</p>`
}

/** A heading over a list in a section. */
function sectionTitleHtml(title: string): string {
  return `<p style="margin:0 0 8px;font-size:17px;font-weight:700;color:#222222;">${escapeHtml(title)}</p>`
}

/**
 * A FlowTrace report on one visit: two sections. The first is the
 * headline (what they did and where they are), a few facts, and the button to the full
 * report. The second is every step they took, newest first, with the conversions tinted.
 *
 * **Everything passed in is plain text and is escaped here**, including a visitor's page
 * titles, referrer and campaign tags, which anyone can send.
 */
export function renderVisitReportEmailHtml({
  label,
  headline,
  facts,
  steps,
  button,
  note,
  siteUrl,
}: {
  label: string
  headline: string
  facts: { label: string; value: string }[]
  /** Newest first. `highlight` marks a conversion. */
  steps: {
    time: string
    title: string
    note?: string
    href?: string
    highlight?: boolean
  }[]
  button: { text: string; href: string }
  /** A quiet sentence under the rule, e.g. why the reader is getting this. */
  note?: string
  siteUrl: string
}): string {
  const factRows = facts
    .filter((row) => row.value)
    .map(
      (row) => `<tr>
              <td style="padding:6px 16px 6px 0;font-size:14px;color:#666666;white-space:nowrap;vertical-align:top;">${escapeHtml(row.label)}</td>
              <td style="padding:6px 0;font-size:14px;color:#222222;">${escapeHtml(row.value)}</td>
            </tr>`
    )
    .join('\n            ')

  const stepRows = steps
    .map((step, i) => {
      const title = step.href
        ? `<a href="${escapeHtml(step.href)}" style="color:#222222;text-decoration:none;">${escapeHtml(step.title)}</a>`
        : escapeHtml(step.title)
      const tint = step.highlight ? 'background:#fbf0d9;' : ''
      const rule = i === 0 ? '' : 'border-top:1px solid #dddddd;'
      return `<tr>
              <td style="padding:10px 12px 10px 0;font-size:13px;color:#666666;white-space:nowrap;vertical-align:top;${rule}">${escapeHtml(step.time)}</td>
              <td style="padding:10px 8px;font-size:14px;line-height:1.4;color:#222222;${step.highlight ? 'font-weight:600;' : ''}${rule}${tint}">${title}${
                step.note
                  ? `<br /><span style="font-size:13px;font-weight:400;color:#666666;">${escapeHtml(step.note)}</span>`
                  : ''
              }</td>
            </tr>`
    })
    .join('\n            ')

  return emailHtml(
    [
      `${headlineHtml(label, headline)}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${factRows}
          </table>
          ${buttonHtml(button)}
          ${note ? noteRowHtml(note) : ''}`,
      `${sectionTitleHtml('What they did')}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${stepRows}
          </table>`,
    ],
    siteUrl
  )
}

/**
 * A FlowTrace daily or weekly summary: two sections. The first is the
 * headline, a row of figures, and the button to FlowTrace. The second is the lists: the
 * visits that converted, where they came from, the pages they viewed. A list with nothing
 * in it says so with `empty`, or is left out when `empty` is not given.
 *
 * **Everything passed in is plain text and is escaped here.**
 */
export function renderDigestEmailHtml({
  label,
  headline,
  tiles,
  sections,
  button,
  note,
  siteUrl,
}: {
  label: string
  headline: string
  tiles: { label: string; value: string }[]
  sections: {
    title: string
    rows: { text: string; note?: string; href?: string; value?: string }[]
    /** Shown in place of the rows when there are none. */
    empty?: string
  }[]
  button: { text: string; href: string }
  /** A quiet sentence under the rule, e.g. why the reader is getting this. */
  note?: string
  siteUrl: string
}): string {
  const tileCells = tiles
    .map(
      (tile) =>
        `<td style="padding:12px 8px;text-align:center;background:#ffffff;border-radius:12px;"><p style="margin:0;font-size:26px;font-weight:700;color:#222222;">${escapeHtml(tile.value)}</p><p style="margin:2px 0 0;font-size:13px;color:#666666;">${escapeHtml(tile.label)}</p></td>`
    )
    .join('<td style="width:8px;"></td>')

  const sectionBlocks = sections
    .filter((section) => section.rows.length || section.empty)
    .map((section, s) => {
      const rows = section.rows
        .map((row, i) => {
          const text = row.href
            ? `<a href="${escapeHtml(row.href)}" style="color:#222222;text-decoration:none;font-weight:600;">${escapeHtml(row.text)}</a>`
            : escapeHtml(row.text)
          const rule = i === 0 ? '' : 'border-top:1px solid #dddddd;'
          return `<tr>
              <td style="padding:8px 12px 8px 0;font-size:14px;line-height:1.4;color:#222222;${rule}">${text}${
                row.note
                  ? `<br /><span style="font-size:13px;color:#666666;">${escapeHtml(row.note)}</span>`
                  : ''
              }</td>
              ${
                row.value !== undefined
                  ? `<td style="padding:8px 0;font-size:14px;color:#222222;text-align:right;white-space:nowrap;vertical-align:top;${rule}">${escapeHtml(row.value)}</td>`
                  : ''
              }
            </tr>`
        })
        .join('\n            ')
      const body = rows
        ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${rows}
          </table>`
        : `<p style="margin:0;font-size:14px;color:#666666;">${escapeHtml(section.empty ?? '')}</p>`
      return `${s === 0 ? '' : '<div style="height:24px;"></div>'}
          ${sectionTitleHtml(section.title)}
          ${body}`
    })
    .join('\n          ')

  return emailHtml(
    [
      `${headlineHtml(label, headline)}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;"><tr>${tileCells}</tr></table>
          ${buttonHtml(button)}
          ${note ? noteRowHtml(note) : ''}`,
      sectionBlocks,
    ],
    siteUrl
  )
}
