import { prisma } from '@samkhya/db'
import { z } from 'zod'
import { requireUser } from '@/lib/auth'
import { recomputeEnrollmentProgress } from '@/src/lib/learning'

const schema = z.object({ lessonId: z.string().min(1), progressPct: z.number().min(0).max(100), lastPositionSec: z.number().int().min(0).default(0), completed: z.boolean().default(false) })

export async function POST(req: Request) {
  try {
    const user = await requireUser()
    const input = schema.parse(await req.json())
    const lesson = await prisma.lesson.findUnique({ where: { id: input.lessonId }, include: { module: { include: { courseVersion: true } } } })
    if (!lesson) return Response.json({ error: 'Lesson not found' }, { status: 404 })
    const enrollment = await prisma.enrollment.findFirst({ where: { userId: user.id, courseId: lesson.module.courseVersion.courseId, versionId: lesson.module.courseVersionId, status: { in: ['ACTIVE', 'COMPLETED'] } } })
    if (!enrollment) return Response.json({ error: 'Not enrolled in this course version' }, { status: 403 })
    const row = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId: input.lessonId } },
      create: { userId: user.id, lessonId: input.lessonId, progressPct: input.progressPct, lastPositionSec: input.lastPositionSec, completed: input.completed, completedAt: input.completed ? new Date() : null },
      update: { progressPct: input.progressPct, lastPositionSec: input.lastPositionSec, completed: input.completed, completedAt: input.completed ? new Date() : null },
    })
    const overall = await recomputeEnrollmentProgress(user.id, lesson.module.courseVersion.courseId, enrollment.organizationId)
    return Response.json({ lessonProgress: row, enrollment: overall })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'INVALID_REQUEST'
    return Response.json({ error: message }, { status: message === 'UNAUTHORIZED' ? 401 : 400 })
  }
}
