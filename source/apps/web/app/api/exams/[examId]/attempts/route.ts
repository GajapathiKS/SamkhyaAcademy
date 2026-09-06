import { prisma } from '@samkhya/db'
import { requireUser } from '@/lib/auth'

export async function POST(_: Request, { params }: { params: Promise<{ examId: string }> }) {
  try {
    const user = await requireUser()
    const { examId } = await params
    const exam = await prisma.exam.findUnique({ where: { id: examId }, include: { courseVersion: true, questions: true } })
    if (!exam || exam.status !== 'PUBLISHED') return Response.json({ error: 'Exam unavailable' }, { status: 404 })
    const enrollment = await prisma.enrollment.findFirst({ where: { userId: user.id, courseId: exam.courseVersion.courseId, versionId: exam.courseVersionId, status: { in: ['ACTIVE','COMPLETED'] } } })
    if (!enrollment) return Response.json({ error: 'Not enrolled' }, { status: 403 })
    const prior = await prisma.examAttempt.count({ where: { examId, userId: user.id } })
    if (prior >= exam.maxAttempts) return Response.json({ error: 'Maximum attempts reached' }, { status: 409 })
    const attempt = await prisma.examAttempt.create({ data: { examId, userId: user.id, attemptNo: prior + 1 } })
    const questions = exam.questions.map(({ answerKey, explanation, ...q }) => q)
    return Response.json({ attempt, questions, timeLimitMin: exam.timeLimitMin }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN'
    return Response.json({ error: message }, { status: message === 'UNAUTHORIZED' ? 401 : 400 })
  }
}
