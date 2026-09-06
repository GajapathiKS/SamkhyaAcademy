import { prisma } from '@samkhya/db'
import { randomUUID } from 'node:crypto'

export async function recomputeEnrollmentProgress(userId: string, courseId: string, organizationId?: string | null) {
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId, courseId, organizationId: organizationId ?? null, status: { in: ['ACTIVE', 'COMPLETED'] } },
  })
  if (!enrollment) return null

  const versionId = enrollment.versionId || (await prisma.course.findUnique({ where: { id: courseId }, select: { publishedVersionId: true } }))?.publishedVersionId
  if (!versionId) return enrollment

  const lessons = await prisma.lesson.findMany({ where: { module: { courseVersionId: versionId } }, select: { id: true } })
  if (!lessons.length) return enrollment
  const progress = await prisma.lessonProgress.findMany({ where: { userId, lessonId: { in: lessons.map((l) => l.id) } } })
  const completedCount = progress.filter((p) => p.completed).length
  const progressPct = Math.min(100, Math.round((completedCount / lessons.length) * 10000) / 100)

  const updated = await prisma.enrollment.update({
    where: { id: enrollment.id },
    data: { progressPct, status: progressPct >= 100 ? 'COMPLETED' : 'ACTIVE', completedAt: progressPct >= 100 ? new Date() : null },
  })
  return updated
}

export async function certificateEligibility(userId: string, courseId: string) {
  const course = await prisma.course.findUnique({ where: { id: courseId }, include: { publishedProjection: true } })
  if (!course?.publishedVersionId) return { eligible: false, reason: 'NO_PUBLISHED_VERSION' as const }
  const projection = (course.publishedProjection?.projection ?? {}) as any
  if (projection.certificateEnabled === false) return { eligible: false, reason: 'CERTIFICATE_DISABLED' as const }

  const enrollment = await prisma.enrollment.findFirst({ where: { userId, courseId, status: { in: ['ACTIVE', 'COMPLETED'] } } })
  if (!enrollment) return { eligible: false, reason: 'NOT_ENROLLED' as const }

  const versionId = enrollment.versionId || course.publishedVersionId
  const lessons = await prisma.lesson.findMany({ where: { module: { courseVersionId: versionId } }, select: { id: true } })
  const done = await prisma.lessonProgress.count({ where: { userId, lessonId: { in: lessons.map((l) => l.id) }, completed: true } })
  const lessonPct = lessons.length ? (done / lessons.length) * 100 : 100
  const requiredLessonPct = Number(projection.completionRules?.minLessonCompletionPct ?? 100)
  if (lessonPct < requiredLessonPct) return { eligible: false, reason: 'LESSONS_INCOMPLETE' as const, lessonPct, requiredLessonPct }

  const requiresExam = Boolean(projection.completionRules?.requiresPassingExam)
  if (requiresExam) {
    const exams = await prisma.exam.findMany({ where: { courseVersionId: versionId, status: 'PUBLISHED' }, select: { id: true } })
    const passed = await prisma.examAttempt.count({ where: { userId, examId: { in: exams.map((e) => e.id) }, status: 'PASSED' } })
    if (!passed) return { eligible: false, reason: 'PASSING_EXAM_REQUIRED' as const }
  }
  return { eligible: true as const, course, enrollment }
}

export async function issueCertificate(userId: string, courseId: string) {
  const eligibility = await certificateEligibility(userId, courseId)
  if (!eligibility.eligible) return eligibility
  if (!eligibility.course) return { eligible: false as const, reason: 'COURSE_NOT_FOUND' as const }
  const existing = await prisma.certificate.findFirst({ where: { userId, courseId, status: 'ISSUED' } })
  if (existing) return { eligible: true as const, certificate: existing, alreadyIssued: true }
  const certificateNo = `SA-${new Date().getFullYear()}-${String(Date.now()).slice(-8)}`
  const cert = await prisma.certificate.create({
    data: { userId, courseId, certificateNo, verificationCode: randomUUID(), metadata: { courseTitle: eligibility.course.title } },
  })
  await prisma.outboxEvent.create({ data: { aggregateType: 'Certificate', aggregateId: cert.id, eventType: 'CertificateIssued', payload: { certificateId: cert.id, userId, courseId } } })
  return { eligible: true as const, certificate: cert, alreadyIssued: false }
}
