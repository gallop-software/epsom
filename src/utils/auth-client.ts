import { createAuthClient } from 'better-auth/react'
import { emailOTPClient, magicLinkClient } from 'better-auth/client/plugins'

// The browser's side of src/utils/auth.ts. Same origin, so no base URL.
export const authClient = createAuthClient({
  plugins: [emailOTPClient(), magicLinkClient()],
})
