import { prisma } from '@samkhya/db'
import { z } from 'zod'
import { requireUser } from '@/lib/auth'
import { issueCertificate } from '@/src/lib/learning'

const schema = z.object({ attemptId: z.string(), answers: z.record(z.string(), z.any()) })
const normalize = (v: unknown) => JSON.stringify(v, Object.keys((v && typeof v === 'object' ? v : {}) as object).sort())

export async function POST(req: Request, { params }: { params: Promise<{ examId: string }> }) {
  try {
    const user = await requireUser()
    const { examId } = await params
    const input = schema.parse(await req.json())
    const attempt = await prisma.examAttempt.findUnique({ where: { id: input.attemptId }, include: { exam: { include: { questions: true, courseVersion: true } } } })
    if (!attempt || attempt.userId !== user.id || attempt.examId !== examId) return Response.json({ error: 'Attempt not found' }, { status: 404 })
    if (attempt.status !== 'IN_PROGRESS') return Response.json({ error: 'Attempt already submitted' }, { status: 409 })
    let earned = 0, total = 0
    for (const q of attempt.exam.questions) {
      total += q.points
      const supplied = input.answers[q.id]
      const key = q.answerKey as any
      let correct = false
      if (q.type === 'SHORT_TEXT') correct = String(supplied ?? '').trim().toLowerCase() === String(key?.text ?? '').trim().toLowerCase()
      else {
        const expected = Array.isArray(key?.keys) ? [...key.keys].map(String).sort() : []
        const actual = Array.isArray(supplied) ? [...supplied].map(String).sort() : [String(supplied)]
        correct = normalize(actual) === normalize(expected)
      }
      const score = correct ? q.points : 0
      earned += score
      await prisma.examAnswer.create({ data: { attemptId: attempt.id, questionId: q.id, answer: supplied ?? null, correct, score } })
    }
    const percentage = total ? Math.round((earned / total) * 10000) / 100 : 0
    const passed = percentage >= attempt.exam.passPercent
    const updated = await prisma.examAttempt.update({ where: { id: attempt.id }, data: { status: passed ? 'PASSED' : 'FAILED', score: earned, percentage, submittedAt: new Date() } })
    let certificate = null
    if (passed) {
      const result = await issueCertificate(user.id, attempt.exam.courseVersion.courseId)
      if (result.eligible && 'certificate' in result) certificate = result.certificate
    }
    return Response.json({ attempt: updated, percentage, passed, certificate })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'INVALID_REQUEST'
    return Response.json({ error: message }, { status: message === 'UNAUTHORIZED' ? 401 : 400 })
  }
}
