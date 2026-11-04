import { DateTime } from 'luxon'
import type { NextRequest } from 'next/server'
import { adminRoute, problem, reply } from '@/utils/admin-route'
import { siteEnv } from '@/utils/site-env'
import { flowTraceConfig } from '@/utils/flow-trace-config'
import { adminEmails } from '@/utils/flow-trace-recipients'
import {
  isEmailMode,
  readEmailModes,
  saveEmailMode,
} from '@/utils/flow-trace-store'
import { readJsonObject } from '@/utils/read-body'
import { isSameOrigin } from '@/utils/request-guard'

export const dynamic = 'force-dynamic'

// Which FlowTrace emails the signed-in super admin gets, and every other
// super admin's choice beside it: the admin box's Email settings tab.
export async function GET(req: NextRequest) {
  return adminRoute(req, async (caller) => {
    const db = (await siteEnv()).AUTH_DB
    const team = await adminEmails(db)
    const modes = await readEmailModes(db, team)
    const email = caller.user.email.toLowerCase()
    return reply({
      email,
      mode: modes.get(email) ?? flowTraceConfig.defaultEmailMode,
      team: team.map((address) => ({
        email: address,
        mode: modes.get(address) ?? flowTraceConfig.defaultEmailMode,
      })),
    })
  })
}

// Saves the signed-in person's own choice; nobody else's.
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return problem('Not allowed.', 403)
  return adminRoute(req, async (caller) => {
    const input = await readJsonObject(req, 512)
    if (!input || input === 'too_large' || !isEmailMode(input.mode)) {
      return problem('Choose one of the options.')
    }
    await saveEmailMode(
      (await siteEnv()).AUTH_DB,
      caller.user.email,
      input.mode,
      Math.floor(DateTime.now().toSeconds())
    )
    return reply({ mode: input.mode })
  })
}
