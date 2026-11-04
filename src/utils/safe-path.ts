// Whether a value is a path on this site and nothing else: better-auth's own
// test for a root-relative redirect (isSafeRelativeURL), so a browser cannot
// read it as another site. `//evil.com`, `/\evil.com`, a tab or newline that
// browsers drop (`/\t/evil.com`), and an encoded slash are all refused. Used
// for the paths FlowTrace stores, which the dashboard shows as links.

const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f-\u009f]/
const ENCODED_SEPARATOR = /%2[fF]|%5[cC]/
const PARSER_ORIGIN = 'https://site.invalid'

export function isSitePath(value: string): boolean {
  if (
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\') ||
    CONTROL_CHARACTERS.test(value)
  ) {
    return false
  }
  const pathEnd = value.search(/[?#]/)
  const path = pathEnd === -1 ? value : value.slice(0, pathEnd)
  if (ENCODED_SEPARATOR.test(path)) return false
  try {
    return new URL(value, PARSER_ORIGIN).origin === PARSER_ORIGIN
  } catch {
    return false
  }
}
