'use client'

import { LoginForm } from '@/components/login-form'
import { Modal } from '@/components/modal'
import { Paragraph } from '@/components/paragraph'
import { state, useSnapshot } from '@/state'
import { setAdminMark } from '@/utils/admin-mark'

// The sign-in modal, opened anywhere through state.loginOpen (as
// medicine-opera's login dialog is). Signed in, it opens the dashboard on
// whatever was asked for first, or its first tab.
export function LoginDialog() {
  const snap = useSnapshot(state)
  const next = snap.loginNext
  // Where a sign-in link brings them back to, opened from the email
  const afterLink = next?.visit
    ? `/?visit=${encodeURIComponent(next.visit)}`
    : `/?dashboard=${next?.tab ?? 'flowtrace'}`

  const close = () => {
    state.loginOpen = false
    state.loginNext = null
    state.loginError = ''
  }

  return (
    <Modal
      open={snap.loginOpen}
      onClose={close}
      title="Sign in"
    >
      <Paragraph
        fontSize="text-base"
        color="text-contrast-light"
        margin="mb-6"
      >
        For the Bedrock Flooring team and the web developers. We&apos;ll email
        you a code or a sign-in link — there is no password.
      </Paragraph>
      <LoginForm
        linkError={snap.loginError}
        afterLink={afterLink}
        onSignedIn={() => {
          const view = state.loginNext ?? { tab: 'flowtrace' as const }
          setAdminMark(true)
          close()
          state.dashboard = { ...view }
        }}
      />
    </Modal>
  )
}
