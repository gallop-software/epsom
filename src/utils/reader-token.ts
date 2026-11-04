import { READER_KEY, READER_PARAM, isReaderToken } from '@/utils/reader-rules'

// The reader token in the browser: read from the landing URL, kept in
// localStorage, sent with every page view and FlowTrace visit after. Browser
// only; both hooks (src/hooks/page-view.tsx, src/hooks/flow-trace.tsx) call
// it, and FlowTrace's arrival is what writes it.

// Where storage is blocked, the token lives as long as the page does.
let memory: string | null = null

/** The token this browser carries, or ''. */
export function readerToken(): string {
  try {
    const stored = window.localStorage.getItem(READER_KEY)
    if (isReaderToken(stored)) return stored
  } catch {
    // Storage blocked: fall through to memory
  }
  return memory ?? ''
}

/**
 * Keeps the token in the current URL, when there is one. A later click on
 * another campaign's link replaces it: the newest mailing is the one to credit.
 */
export function captureReaderToken(search: string): string {
  const token = new URLSearchParams(search).get(READER_PARAM)
  if (!isReaderToken(token)) return readerToken()
  memory = token
  try {
    window.localStorage.setItem(READER_KEY, token)
  } catch {
    // Kept in memory only
  }
  return token
}
