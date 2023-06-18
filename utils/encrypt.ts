import { createHmac } from 'node:crypto'

const secret = process.env.ENCRYTPTION_SECRET!

export const getKey = async () =>
  crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  )

export const getToken = (value: Record<string, unknown>) => {
  const hmac = createHmac('sha256', secret)
  hmac.update(JSON.stringify(value))
  const token = hmac.digest('hex')
  return token
}

export const getValidToken = async (value: Record<string, unknown>) =>
  toHex(
    await crypto.subtle.sign(
      'HMAC',
      await getKey(),
      new TextEncoder().encode(JSON.stringify(value))
    )
  )

export const toHex = (arrayBuffer: ArrayBuffer): string =>
  Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n: number) => n.toString(16).padStart(2, '0'))
    .join('')
