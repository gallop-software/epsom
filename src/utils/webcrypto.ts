/**
 * WebCrypto helpers shared by the Slack signature check and the signed
 * attachment URLs.
 *
 * Everything here is deliberately Web-standard: workerd has no `node:crypto`
 * unless `nodejs_compat` is on, and even then module-scope Node crypto is a
 * liability. These run unchanged on Workers and Node.
 */

const encoder = new TextEncoder()

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** HMAC-SHA256 of `message` under `secret`, lowercase hex. */
export async function hmacHex(
  secret: string,
  message: string
): Promise<string> {
  const key = await hmacKey(secret)
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(message)))
}

/**
 * Constant-time string compare.
 *
 * Workers has no `crypto.timingSafeEqual`, so this is hand-rolled: bail on a
 * length mismatch (which leaks only the length), then XOR-accumulate across
 * every character so the loop never short-circuits on the first difference.
 */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}
