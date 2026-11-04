// The addresses that may sign in, and that FlowTrace emails, from
// AUTH_ALLOWED_EMAILS (comma-separated). No server-only import: the scheduled
// job in worker.ts reads it too.

export function allowedEmails(): string[] {
  return [
    ...new Set(
      (process.env.AUTH_ALLOWED_EMAILS ?? '')
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean)
    ),
  ]
}

export function isAllowedEmail(email: string): boolean {
  return allowedEmails().includes(email.trim().toLowerCase())
}
