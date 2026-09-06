import { prisma } from '@samkhya/db'
import { verifyWebhookSignature } from '@/src/payments/razorpay'

export async function POST(req: Request) {
  const raw = await req.text()
  const signature = req.headers.get('x-razorpay-signature')
  if (!verifyWebhookSignature(raw, signature)) return new Response('Invalid signature', { status: 401 })

  const event = JSON.parse(raw)
  if (event.event !== 'payment_link.paid') return Response.json({ ok: true, ignored: true })

  const paymentLinkEntity = event?.payload?.payment_link?.entity
  const paymentEntity = event?.payload?.payment?.entity
  const orderEntity = event?.payload?.order?.entity
  const referenceId = paymentLinkEntity?.reference_id
  if (!referenceId || !paymentEntity?.id) return Response.json({ ok: true, ignored: true })

  const link = await prisma.paymentLink.findUnique({ where: { providerReferenceId: referenceId } })
  if (!link) return Response.json({ ok: true, ignored: true })

  const existing = await prisma.payment.findUnique({ where: { providerPaymentId: paymentEntity.id } })
  if (existing) return Response.json({ ok: true, duplicate: true })

  const offer = link.offerId ? await prisma.offer.findUnique({ where: { id: link.offerId } }) : null
  const lead = link.leadId ? await prisma.lead.findUnique({ where: { id: link.leadId } }) : null

  let userId: string | null = null
  if (lead) {
    const user = await prisma.user.upsert({
      where: { email: lead.email },
      update: { mobile: lead.mobile || undefined },
      create: { email: lead.email, name: lead.name, mobile: lead.mobile, status: 'INVITED' },
    })
    userId = user.id
  }

  await prisma.$transaction(async tx => {
    await tx.payment.create({ data: {
      paymentLinkId: link.id,
      offerId: offer?.id || null,
      leadId: lead?.id || null,
      courseId: link.courseId,
      userId,
      providerPaymentId: paymentEntity.id,
      providerOrderId: orderEntity?.id || null,
      amountPaise: paymentEntity.amount || link.amountPaise,
      currency: paymentEntity.currency || link.currency,
      status: 'PAID',
      method: paymentEntity.method || null,
      email: paymentEntity.email || lead?.email || null,
      mobile: paymentEntity.contact || lead?.mobile || null,
      providerPayload: event,
      paidAt: new Date(),
    } })
    await tx.paymentLink.update({ where: { id: link.id }, data: { status: 'PAID', providerPayload: event } })
    if (offer) await tx.offer.update({ where: { id: offer.id }, data: {
      redemptionCount: { increment: 1 },
      status: offer.redemptionCount + 1 >= offer.maxRedemptions ? 'REDEEMED' : 'ACTIVE',
    } })
    if (lead) {
      await tx.lead.update({ where: { id: lead.id }, data: { status: 'ENROLLED' } })
      await tx.crmActivity.create({ data: { leadId: lead.id, type: 'PAYMENT', subject: 'Razorpay payment received', metadata: { paymentId: paymentEntity.id, amount: paymentEntity.amount } } })
    }
    if (userId) {
      const course = await tx.course.findUnique({ where: { id: link.courseId } })
      if (course?.publishedVersionId) {
        const already = await tx.enrollment.findFirst({ where: { userId, courseId: course.id, status: { in: ['ACTIVE','COMPLETED'] } } })
        if (!already) await tx.enrollment.create({ data: { userId, courseId: course.id, versionId: course.publishedVersionId, status: 'ACTIVE', accessTier: 'FULL' } })
      }
    }
  })

  return Response.json({ ok: true })
}
