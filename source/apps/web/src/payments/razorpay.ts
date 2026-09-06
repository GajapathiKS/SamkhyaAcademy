import crypto from 'node:crypto'

const baseUrl = 'https://api.razorpay.com/v1'

function credentials() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) throw new Error('RAZORPAY_NOT_CONFIGURED')
  return { keyId, keySecret }
}

async function razorpayFetch<T>(path: string, init: RequestInit): Promise<T> {
  const { keyId, keySecret } = credentials()
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(`RAZORPAY_${response.status}:${JSON.stringify(body)}`)
  return body as T
}

export type RazorpayPaymentLink = {
  id: string
  short_url: string
  status: string
  reference_id: string
  amount: number
  expire_by?: number
  [key: string]: unknown
}

export async function createPaymentLink(input: {
  amountPaise: number
  currency?: string
  referenceId: string
  description: string
  customer?: { name?: string; email?: string; contact?: string }
  expiresAt?: Date | null
  callbackUrl?: string
}) {
  const payload: Record<string, unknown> = {
    amount: input.amountPaise,
    currency: input.currency || 'INR',
    accept_partial: false,
    reference_id: input.referenceId,
    description: input.description,
    customer: input.customer,
    notify: { sms: false, email: false },
    reminder_enable: false,
  }
  if (input.expiresAt) payload.expire_by = Math.floor(input.expiresAt.getTime() / 1000)
  if (input.callbackUrl) {
    payload.callback_url = input.callbackUrl
    payload.callback_method = 'get'
  }
  return razorpayFetch<RazorpayPaymentLink>('/payment_links', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret || !signature) return false
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  const left = Buffer.from(expected)
  const right = Buffer.from(signature)
  return left.length === right.length && crypto.timingSafeEqual(left, right)
}
