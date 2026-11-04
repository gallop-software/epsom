'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { SessionExpired, analyticsPost } from '@/components/analytics/call'
import {
  inputClass,
  mainButtonClass,
  quietButtonClass,
} from '@/components/analytics/parts'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { state, useSnapshot } from '@/state'
import { flowTraceConfig } from '@/utils/flow-trace-config'
import type { FtEmailMode } from '@/utils/flow-trace-types'
import { useRead } from './use-read'

const hour = `${flowTraceConfig.digestHour % 12 || 12}${flowTraceConfig.digestHour < 12 ? 'am' : 'pm'}`

const MODES: { mode: FtEmailMode; label: string; detail: string }[] = [
  {
    mode: 'instant',
    label: 'Every visit that converts',
    detail:
      'A report the moment a visitor calls, emails or sends a form, with everything they did up to then.',
  },
  {
    mode: 'daily',
    label: 'Daily summary',
    detail: `Yesterday's visits and conversions, each morning at ${hour}.`,
  },
  {
    mode: 'weekly',
    label: 'Weekly summary',
    detail: `The last seven days, Monday mornings at ${hour}.`,
  },
  {
    mode: 'off',
    label: 'No emails',
    detail: 'Reports stay here in FlowTrace.',
  },
]

const MODE_NAMES = Object.fromEntries(
  MODES.map(({ mode, label }) => [mode, label])
) as Record<FtEmailMode, string>

const RESULTS: Record<string, string> = {
  sent: 'A test report is on its way to you.',
  none: 'There are no visits to report on yet.',
  failed: 'The test report could not be sent. Please try again.',
}

type Settings = {
  email: string
  mode: FtEmailMode
  team: { email: string; mode: FtEmailMode }[]
}

// Which FlowTrace emails the signed-in person gets, a test report, and who
// else gets what.
export function SettingsTab({
  onExpired,
  refreshed,
}: {
  onExpired: () => void
  refreshed: number
}) {
  const [asked, setAsked] = useState(0)
  const read = useRead<Settings>(
    `/api/flowtrace/settings?n=${asked}`,
    onExpired,
    refreshed
  )
  const settings = read.value
  const [chosen, setChosen] = useState<FtEmailMode | null>(null)
  const [busy, setBusy] = useState<'save' | 'test' | null>(null)
  const [notice, setNotice] = useState('')
  const { demo } = useSnapshot(state)
  // The demo asks where to send its one test report, in a box of its own.
  const [askingAddress, setAskingAddress] = useState(false)
  const [address, setAddress] = useState('')
  const mode = chosen ?? settings?.mode

  const act = async (kind: 'save' | 'test') => {
    setBusy(kind)
    setNotice('')
    try {
      if (kind === 'save') {
        await analyticsPost('/api/flowtrace/settings', { mode })
        setNotice('Saved.')
        setChosen(null)
        setAsked((n) => n + 1)
      } else {
        const answer = await analyticsPost<{
          result: string
          sentTo?: string
        }>('/api/flowtrace/test-report', demo ? { email: address.trim() } : {})
        setNotice(
          demo && answer.sentTo
            ? `A test report on a made-up visit is on its way to ${answer.sentTo}.`
            : (RESULTS[answer.result] ?? RESULTS.failed!)
        )
        setAskingAddress(false)
      }
    } catch (error) {
      if (error instanceof SessionExpired) return onExpired()
      setNotice((error as Error).message || 'Something went wrong.')
    } finally {
      setBusy(null)
    }
  }

  if (!settings) {
    return (
      <Paragraph
        margin="mb-0"
        fontSize="text-xs"
        color={read.problem ? 'text-accent' : 'text-contrast-light'}
      >
        {read.problem || 'Reading…'}
      </Paragraph>
    )
  }

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <section>
        <Paragraph
          fontSize="text-sm"
          color="text-contrast-light"
          margin="mb-4"
        >
          What gets sent to {settings.email}. Every email links to the full
          report here.
        </Paragraph>
        {notice && (
          <Paragraph
            role="status"
            fontSize="text-sm"
            color="text-accent"
            margin="mb-4"
          >
            {notice}
          </Paragraph>
        )}
        <div
          role="radiogroup"
          aria-label="FlowTrace emails"
          className="flex flex-col gap-2"
        >
          {MODES.map((option) => (
            <label
              key={option.mode}
              className="flex cursor-pointer gap-3 rounded-md border border-contrast/15 p-3 has-[:checked]:border-accent has-[:checked]:ring-1 has-[:checked]:ring-inset has-[:checked]:ring-accent"
            >
              <input
                type="radio"
                name="flowtrace-mode"
                value={option.mode}
                checked={mode === option.mode}
                onChange={() => setChosen(option.mode)}
                className="mt-1 h-4 w-4 accent-accent"
              />
              <span>
                <span className="block text-sm font-semibold text-contrast">
                  {option.label}
                </span>
                <span className="block text-xs text-contrast-light">
                  {option.detail}
                </span>
              </span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className={mainButtonClass}
            disabled={busy !== null || !chosen || chosen === settings.mode}
            onClick={() => act('save')}
          >
            {busy === 'save' ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            className={quietButtonClass}
            disabled={busy !== null}
            onClick={() => {
              if (demo) {
                setNotice('')
                setAskingAddress(true)
              } else {
                act('test')
              }
            }}
          >
            {busy === 'test' ? 'Sending…' : 'Send me a test report'}
          </button>
        </div>
      </section>

      <Dialog
        open={askingAddress}
        onClose={() => busy === null && setAskingAddress(false)}
        // Above the box itself (z-110)
        className="admin-theme relative z-120 bg-transparent"
      >
        <div
          className="fixed inset-0 bg-overlay/30"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-md bg-body p-6 shadow-lg">
            <DialogTitle as="div">
              <Heading
                as="h4"
                color="text-contrast"
                fontSize="text-base"
                margin="mb-2"
              >
                Send a test report
              </Heading>
            </DialogTitle>
            <Paragraph
              fontSize="text-xs"
              color="text-contrast-light"
              margin="mb-4"
            >
              A FlowTrace report on a made-up visit, as the team would get it.
              Each address can have one.
            </Paragraph>
            <form
              className="flex flex-col gap-3"
              onSubmit={(event) => {
                event.preventDefault()
                act('test')
              }}
            >
              <input
                type="email"
                required
                autoFocus
                value={address}
                placeholder="you@example.com"
                aria-label="Your email address"
                onChange={(event) => setAddress(event.target.value)}
                className={inputClass}
              />
              {notice && (
                <Paragraph
                  role="status"
                  fontSize="text-xs"
                  color="text-accent"
                  margin="mb-0"
                >
                  {notice}
                </Paragraph>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className={quietButtonClass}
                  disabled={busy !== null}
                  onClick={() => setAskingAddress(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={mainButtonClass}
                  disabled={busy !== null || !address.trim()}
                >
                  {busy === 'test' ? 'Sending…' : 'Send'}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <section>
        <Heading
          as="h4"
          styleAs="h5"
          color="text-contrast"
          fontSize="text-base"
          margin="mb-2"
        >
          Who gets what
        </Heading>
        <Paragraph
          fontSize="text-sm"
          color="text-contrast-light"
          margin="mb-3"
        >
          Everyone with access who has signed in. Each person chooses for
          themselves.
        </Paragraph>
        <div className="divide-y divide-contrast/10 rounded-md border border-contrast/15 px-3">
          {settings.team.map((member) => (
            <div
              key={member.email}
              className="flex flex-wrap justify-between gap-2 py-2 text-sm"
            >
              <span className="text-contrast">{member.email}</span>
              <span className="text-contrast-light">
                {MODE_NAMES[member.mode]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
