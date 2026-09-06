import crypto from 'node:crypto'
import { z } from 'zod'
import { prisma } from '@samkhya/db'
import { requireCrmUser } from '@/lib/auth'
import { createPaymentLink } from '@/src/payments/razorpay'

const schema = z.object({
  courseId: z.string().min(1),
  leadId: z.string().optional().nullable(),
  opportunityId: z.string().optional().nullable(),
  organizationId: z.string().optional().nullable(),
  originalAmountPaise: z.number().int().positive(),
  discountType: z.enum(['PERCENT', 'FIXED', 'CUSTOM_PRICE']),
  discountValue: z.number().int().nonnegative().optional().nullable(),
  customPricePaise: z.number().int().positive().optional().nullable(),
  allowedEmail: z.string().email().optional().nullable(),
  allowedMobile: z.string().min(8).optional().nullable(),
  expiresAt: z.string().datetime().optional().nullable(),
  maxRedemptions: z.number().int().positive().max(10000).default(1),
  notes: z.string().max(2000).optional().nullable(),
})

function finalAmount(input: z.infer<typeof schema>) {
  if (input.discountType === 'CUSTOM_PRICE') {
    if (!input.customPricePaise) throw new Error('CUSTOM_PRICE_REQUIRED')
    return input.customPricePaise
  }
  if (input.discountType === 'PERCENT') {
    const pct = Math.min(input.discountValue || 0, 100)
    return Math.max(100, Math.round(input.originalAmountPaise * (100 - pct) / 100))
  }
  return Math.max(100, input.originalAmountPaise - (input.discountValue || 0))
}

export async function POST(req: Request) {
  try {
    const admin = await requireCrmUser()
    const parsed = schema.safeParse(await req.json())
    if (!parsed.success) return Response.json({ errors: parsed.error.flatten() }, { status: 400 })
    const input = parsed.data
    const course = await prisma.course.findUnique({ where: { id: input.courseId } })
    if (!course) return Response.json({ error: 'COURSE_NOT_FOUND' }, { status: 404 })
    const lead = input.leadId ? await prisma.lead.findUnique({ where: { id: input.leadId } }) : null
    const token = crypto.randomBytes(12).toString('base64url')
    const finalAmountPaise = finalAmount(input)
    const expiresAt = input.expiresAt ? new Date(input.expiresAt) : null

    const offer = await prisma.offer.create({ data: {
      token,
      leadId: input.leadId || null,
      opportunityId: input.opportunityId || null,
      organizationId: input.organizationId || null,
      courseId: course.id,
      createdByUserId: admin.id,
      status: 'DRAFT',
      discountType: input.discountType,
      originalAmountPaise: input.originalAmountPaise,
      discountValue: input.discountType === 'CUSTOM_PRICE' ? input.customPricePaise : input.discountValue,
      finalAmountPaise,
      allowedEmail: input.allowedEmail || lead?.email || null,
      allowedMobile: input.allowedMobile || lead?.mobile || null,
      expiresAt,
      maxRedemptions: input.maxRedemptions,
      notes: input.notes || null,
    } })

    const referenceId = `offer_${offer.id}`
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const rp = await createPaymentLink({
      amountPaise: finalAmountPaise,
      referenceId,
      description: `${course.title} - SamkhyaAcademy`,
      customer: lead ? { name: lead.name, email: lead.email, contact: lead.mobile } : undefined,
      expiresAt,
      callbackUrl: `${appUrl}/o/${token}?payment=return`,
    })

    const paymentLink = await prisma.paymentLink.create({ data: {
      offerId: offer.id,
      leadId: offer.leadId,
      courseId: course.id,
      createdByUserId: admin.id,
      providerPaymentLinkId: rp.id,
      providerReferenceId: referenceId,
      shortUrl: rp.short_url,
      amountPaise: finalAmountPaise,
      status: 'PENDING',
      expiresAt,
      providerPayload: rp as any,
    } })

    await prisma.offer.update({ where: { id: offer.id }, data: { status: 'ACTIVE' } })

    if (lead) {
      await prisma.lead.update({ where: { id: lead.id }, data: { status: 'PAYMENT_PENDING' } })
      await prisma.crmActivity.create({ data: {
        leadId: lead.id,
        actorUserId: admin.id,
        type: 'OFFER_SENT',
        subject: `Offer created for ${course.title}`,
        notes: `₹${(finalAmountPaise / 100).toFixed(2)} private offer`,
        metadata: { offerId: offer.id, paymentLinkId: paymentLink.id, token },
      } })
    }

    return Response.json({
      offerId: offer.id,
      token,
      shareUrl: `${appUrl}/o/${token}`,
      razorpayUrl: rp.short_url,
      finalAmountPaise,
    }, { status: 201 })
  } catch (error: any) {
    const message = String(error?.message || error)
    const status = message.includes('UNAUTHORIZED') ? 401 : message.includes('FORBIDDEN') ? 403 : 500
    return Response.json({ error: message }, { status })
  }
}
