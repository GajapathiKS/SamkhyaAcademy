import { prisma } from '@samkhya/db'
import { requireUser } from '@/lib/auth'

export async function POST(_: Request, { params }: { params: Promise<{ courseId: string }> }) {
  try {
    const user = await requireUser()
    const { courseId } = await params
    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course || course.status !== 'PUBLISHED' || !course.publishedVersionId) return Response.json({ error: 'COURSE_UNAVAILABLE' }, { status: 404 })
    if (course.accessType === 'PRIVATE' || course.accessType === 'ORGANIZATION_ONLY') return Response.json({ error: 'INVITE_OR_ORGANIZATION_ACCESS_REQUIRED' }, { status: 403 })
    if (course.pricingCategory === 'PRICING') return Response.json({ error: 'PAYMENT_REQUIRED', accessState: 'PAYMENT_REQUIRED', pricePaise: course.salePricePaise ?? course.pricePaise ?? course.listPricePaise, currency: course.currency }, { status: 402 })
    const existing = await prisma.enrollment.findFirst({ where: { userId: user.id, courseId, organizationId: null } })
    if (existing) return Response.json({ ...existing, accessState: existing.accessTier })
    const accessTier = course.pricingCategory === 'FREEMIUM' ? 'PREVIEW' : 'FULL'
    const enrollment = await prisma.enrollment.create({ data: { userId: user.id, courseId, versionId: course.publishedVersionId, accessTier } })
    await prisma.auditLog.create({ data: { actorUserId: user.id, action: course.pricingCategory === 'FREEMIUM' ? 'FREEMIUM_PREVIEW_ENROLLED' : 'FREE_COURSE_ENROLLED', entityType: 'Enrollment', entityId: enrollment.id, payload: { courseId, accessTier } } })
    return Response.json({ ...enrollment, accessState: enrollment.accessTier }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN'
    return Response.json({ error: message }, { status: message === 'UNAUTHORIZED' ? 401 : 400 })
  }
}
