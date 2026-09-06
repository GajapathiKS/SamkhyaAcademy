import crypto from 'node:crypto'
import { afterEach, describe, expect, it } from 'vitest'
import { calculateWorkspaceReadiness, VENTURE_REVIEW_CRITERIA, VENTURE_STAGES } from '../apps/web/lib/venture-builder'
import { verifyWebhookSignature } from '../apps/web/src/payments/razorpay'

afterEach(() => { delete process.env.RAZORPAY_WEBHOOK_SECRET })

describe('venture workflow invariants', () => {
  it('keeps the seven authoritative stages and five rubric criteria', () => {
    expect(VENTURE_STAGES.map((stage) => stage.key)).toEqual(['IDEA', 'VALIDATE', 'MODEL', 'MVP', 'LAUNCH', 'MEASURE', 'SCALE'])
    expect(VENTURE_REVIEW_CRITERIA).toHaveLength(5)
  })

  it('combines approved stages and current artifacts into readiness', () => {
    const workspace = {
      currentStageKey: 'VALIDATE',
      stages: VENTURE_STAGES.map((stage, index) => ({ stageKey: stage.key, status: index === 0 ? 'APPROVED' : 'IN_PROGRESS' })),
      artifacts: [{ stageKey: 'VALIDATE', status: 'SUBMITTED' }],
    }
    expect(calculateWorkspaceReadiness(workspace)).toBeGreaterThan(10)
    expect(calculateWorkspaceReadiness(workspace)).toBeLessThan(40)
  })
})

describe('Razorpay webhook verification', () => {
  it('accepts only the HMAC signature for the raw body', () => {
    process.env.RAZORPAY_WEBHOOK_SECRET = 'test-secret'
    const body = JSON.stringify({ event: 'payment_link.paid', payload: { id: 'demo' } })
    const signature = crypto.createHmac('sha256', 'test-secret').update(body).digest('hex')
    expect(verifyWebhookSignature(body, signature)).toBe(true)
    expect(verifyWebhookSignature(`${body} `, signature)).toBe(false)
    expect(verifyWebhookSignature(body, null)).toBe(false)
  })
})
