import { prisma } from '@samkhya/db'
import { z } from 'zod'
import { requireOrganizationAdmin } from '@/lib/auth'

const schema = z.object({
  organizationId: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(2),
  mobile: z.string().optional(),
  role: z.enum(['ORG_OWNER','ORG_ADMIN','MANAGER','LEARNER']).default('LEARNER'),
})

export async function POST(req: Request) {
  try {
    const input = schema.parse(await req.json())
    const actor = await requireOrganizationAdmin(input.organizationId)
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { email: input.email.toLowerCase() },
        update: { name: input.name, mobile: input.mobile },
        create: { email: input.email.toLowerCase(), name: input.name, mobile: input.mobile, status: 'INVITED' },
      })
      const membership = await tx.organizationMembership.upsert({
        where: { organizationId_userId: { organizationId: input.organizationId, userId: user.id } },
        update: { role: input.role },
        create: { organizationId: input.organizationId, userId: user.id, role: input.role },
      })
      await tx.auditLog.create({ data: { actorUserId: actor.id, action: 'ORG_MEMBER_INVITED', entityType: 'OrganizationMembership', entityId: membership.id, payload: input } })
      await tx.outboxEvent.create({ data: { aggregateType: 'Organization', aggregateId: input.organizationId, eventType: 'OrganizationMemberInvited', payload: { userId: user.id, email: user.email, role: input.role } } })
      return { user, membership }
    })
    return Response.json(result, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'INVALID_REQUEST'
    return Response.json({ error: message }, { status: message === 'UNAUTHORIZED' ? 401 : message === 'FORBIDDEN' ? 403 : 400 })
  }
}
