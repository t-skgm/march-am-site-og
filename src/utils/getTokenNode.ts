import { createHmac } from 'node:crypto'

const secret = process.env.ENCRYTPTION_SECRET!

export const getToken = (value: Record<string, unknown>) => {
  const hmac = createHmac('sha256', secret)
  hmac.update(JSON.stringify(value))
  const token = hmac.digest('hex')
  return token
}
