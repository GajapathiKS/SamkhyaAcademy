import crypto from 'node:crypto'
import type { Payload } from 'payload'
import { prisma } from '@samkhya/db'

const idOf = (value: unknown): string | null => {
  if (value == null) return null
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  if (typeof value === 'object' && 'id' in value) return String((value as { id: string | number }).id)
  return null
}

const urlOf = (value: unknown): string | null => {
  if (!value || typeof value !== 'object') return null
  const v = value as { url?: string; filename?: string }
  return v.url ?? (v.filename ? `/media/${v.filename}` : null)
}

const arrayText = (value: unknown, key = 'text'): string[] =>
  Array.isArray(value) ? value.map((item) => (item && typeof item === 'object' ? String((item as Record<string, unknown>)[key] ?? '') : '')).filter(Boolean) : []

const safeJson = (value: unknown) => JSON.parse(JSON.stringify(value ?? null))

export async function rebuildCourseProjectionFromLesson(payload: Payload, lessonDoc: Record<string, unknown>) {
  const moduleId = idOf(lessonDoc.module)
  if (!moduleId) return
  const module = await payload.findByID({ collection: 'course-modules', id: moduleId, depth: 0, overrideAccess: true })
  const courseId = idOf(module.course)
  if (courseId) await rebuildCourseProjectionFromCMS(payload, courseId)
}

export async function rebuildCourseProjectionFromCMS(payload: Payload, cmsCourseId: string) {
  const course = await payload.findByID({
    collection: 'courses',
    id: cmsCourseId,
    depth: 2,
    draft: false,
    overrideAccess: true,
  }) as Record<string, any>

  if (course._status !== 'published') return { skipped: true, reason: 'COURSE_NOT_PUBLISHED' }

  const modulesResult = await payload.find({
    collection: 'course-modules',
    where: { and: [{ course: { equals: cmsCourseId } }, { _status: { equals: 'published' } }] },
    sort: 'position',
    limit: 200,
    depth: 1,
    overrideAccess: true,
  })

  const modules = [] as Array<Record<string, any>>
  for (const moduleDoc of modulesResult.docs as Array<Record<string, any>>) {
    const lessonsResult = await payload.find({
      collection: 'lessons',
      where: { and: [{ module: { equals: String(moduleDoc.id) } }, { _status: { equals: 'published' } }] },
      sort: 'position',
      limit: 500,
      depth: 2,
      overrideAccess: true,
    })
    modules.push({ ...moduleDoc, lessons: lessonsResult.docs })
  }

  const examsResult = await payload.find({
    collection: 'exams',
    where: { and: [{ course: { equals: cmsCourseId } }, { _status: { equals: 'published' } }] },
    limit: 100,
    depth: 2,
    overrideAccess: true,
  })

  const normalized = {
    cmsCourseId,
    title: course.title,
    slug: course.slug,
    shortDescription: course.shortDescription,
    description: course.description,
    category: course.category,
    deliveryMode: course.deliveryMode,
    contentType: course.contentType === 'HYBRID_OFFLINE_ONLINE_VIDEOS' ? 'HYBRID_OFFLINE_ONLINE' : (course.contentType || 'FULL_ONLINE_VIDEOS'),
    accessType: course.accessType || (course.pricingCategory === 'FREE' ? 'FREE' : 'PAID'),
    pricingCategory: course.pricingCategory === 'PRICED' ? 'PRICING' : (course.pricingCategory || (course.accessType === 'FREE' ? 'FREE' : 'PRICING')),
    listPricePaise: course.listPricePaise ? Number(course.listPricePaise) : null,
    salePricePaise: course.salePricePaise ? Number(course.salePricePaise) : null,
    pricePaise: course.pricePaise ? Number(course.pricePaise) : (course.salePricePaise ? Number(course.salePricePaise) : (course.listPricePaise ? Number(course.listPricePaise) : null)),
    freePreviewLessonCount: Number(course.freePreviewLessonCount ?? 0),
    currency: course.currency || 'INR',
    level: course.level,
    durationText: course.durationText ?? null,
    coverImage: urlOf(course.heroImage),
    brochurePath: course.brochurePublicPath || urlOf(course.brochure),
    outcomes: arrayText(course.outcomes),
    audience: arrayText(course.audience),
    prerequisites: arrayText(course.prerequisites),
    tools: arrayText(course.tools, 'name'),
    programJourney: safeJson(course.programJourney),
    implementationTracks: safeJson(course.implementationTracks),
    signatureFramework: safeJson(course.signatureFramework),
    ventureBuilder: safeJson(course.ventureBuilder),
    certificateEnabled: Boolean(course.certificateEnabled),
    completionRules: safeJson(course.completionRules),
    faculty: safeJson(course.faculty),
    modules: modules.map((m) => ({
      id: String(m.id),
      title: m.title,
      description: m.description ?? null,
      position: Number(m.position),
      estimatedMinutes: Number(m.estimatedMinutes ?? 0),
      learningObjective: m.learningObjective ?? null,
      lessons: (m.lessons ?? []).map((l: Record<string, any>) => ({
        id: String(l.id),
        title: l.title,
        slug: l.slug,
        type: l.type,
        position: Number(l.position),
        durationSec: Number(l.durationSec ?? 0),
        thumbnailUrl: urlOf(l.thumbnail),
        videoUrl: l.externalVideoUrl || urlOf(l.video),
        content: safeJson(l.content),
        labConfig: safeJson(l.labConfig),
        projectConfig: safeJson(l.projectConfig),
        resources: safeJson(l.resources),
        allowComments: Boolean(l.allowComments),
        allowReactions: Boolean(l.allowReactions),
        completionMode: l.completionMode,
        isFreePreview: Boolean(l.isFreePreview),
      })),
    })),
    exams: (examsResult.docs as Array<Record<string, any>>).map((e) => ({
      id: String(e.id),
      title: e.title,
      description: e.description ?? null,
      examType: e.examType,
      passPercent: Number(e.passPercent ?? 70),
      timeLimitMin: e.timeLimitMin ? Number(e.timeLimitMin) : null,
      maxAttempts: Number(e.maxAttempts ?? 3),
      randomizeQuestions: Boolean(e.randomizeQuestions),
      questionCount: e.questionCount ? Number(e.questionCount) : null,
      certificateTrigger: Boolean(e.certificateTrigger),
      questions: Array.isArray(e.questions) ? e.questions.map((q: Record<string, any>) => ({
        id: String(q.id),
        type: q.type,
        prompt: q.prompt,
        options: safeJson(q.options),
        answerText: q.answerText ?? null,
        explanation: q.explanation ?? null,
        points: Number(q.points ?? 1),
      })) : [],
    })),
  }

  const serialized = JSON.stringify(normalized)
  const checksum = crypto.createHash('sha256').update(serialized).digest('hex')

  const existing = await prisma.course.findFirst({ where: { OR: [{ cmsCourseId }, { slug: String(normalized.slug) }] }, include: { publishedProjection: true, versions: { orderBy: { version: 'desc' }, take: 1 } } })
  if (existing?.publishedProjection?.checksum === checksum) return { skipped: true, reason: 'UNCHANGED', courseId: existing.id }

  const nextVersion = (existing?.versions?.[0]?.version ?? 0) + 1

  return prisma.$transaction(async (tx) => {
    const runtimeData = {
        cmsCourseId,
        slug: String(normalized.slug),
        title: String(normalized.title),
        shortDescription: String(normalized.shortDescription),
        category: String(normalized.category),
        deliveryMode: normalized.deliveryMode,
        contentType: normalized.contentType,
        accessType: normalized.accessType,
        pricingCategory: normalized.pricingCategory,
        listPricePaise: normalized.listPricePaise,
        salePricePaise: normalized.salePricePaise,
        pricePaise: normalized.pricePaise,
        freePreviewLessonCount: normalized.freePreviewLessonCount,
        currency: normalized.currency,
        level: String(normalized.level),
        brochurePath: normalized.brochurePath,
        coverImage: normalized.coverImage,
        status: 'PUBLISHED' as const,
        cmsRevision: checksum,
        publishedAt: new Date(),
    }
    const createData = {
        cmsCourseId,
        cmsRevision: checksum,
        slug: String(normalized.slug),
        title: String(normalized.title),
        shortDescription: String(normalized.shortDescription),
        category: String(normalized.category),
        deliveryMode: normalized.deliveryMode,
        contentType: normalized.contentType,
        accessType: normalized.accessType,
        pricingCategory: normalized.pricingCategory,
        listPricePaise: normalized.listPricePaise,
        salePricePaise: normalized.salePricePaise,
        pricePaise: normalized.pricePaise,
        freePreviewLessonCount: normalized.freePreviewLessonCount,
        currency: normalized.currency,
        level: String(normalized.level),
        brochurePath: normalized.brochurePath,
        coverImage: normalized.coverImage,
        status: 'PUBLISHED' as const,
        publishedAt: new Date(),
    }
    const courseRow = existing
      ? await tx.course.update({ where: { id: existing.id }, data: runtimeData })
      : await tx.course.create({ data: createData })

    const version = await tx.courseVersion.create({
      data: {
        courseId: courseRow.id,
        version: nextVersion,
        cmsVersionKey: checksum,
        title: normalized.title,
        description: normalized.description,
        outcomes: normalized.outcomes,
        audience: normalized.audience,
        tools: normalized.tools,
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    })

    for (const moduleDoc of normalized.modules) {
      const module = await tx.courseModule.create({
        data: {
          cmsModuleId: moduleDoc.id,
          courseVersionId: version.id,
          title: moduleDoc.title,
          description: moduleDoc.description,
          position: moduleDoc.position,
        },
      })
      for (const lessonDoc of moduleDoc.lessons) {
        await tx.lesson.create({
          data: {
            cmsLessonId: lessonDoc.id,
            moduleId: module.id,
            title: lessonDoc.title,
            slug: lessonDoc.slug,
            type: lessonDoc.type,
            position: lessonDoc.position,
            durationSec: lessonDoc.durationSec,
            contentJson: {
              richText: lessonDoc.content,
              labConfig: lessonDoc.labConfig,
              projectConfig: lessonDoc.projectConfig,
              resources: lessonDoc.resources,
              completionMode: lessonDoc.completionMode,
              allowComments: lessonDoc.allowComments,
              allowReactions: lessonDoc.allowReactions,
            },
            videoUrl: lessonDoc.videoUrl,
            thumbnailUrl: lessonDoc.thumbnailUrl,
            isFreePreview: lessonDoc.isFreePreview,
          },
        })
      }
    }

    for (const examDoc of normalized.exams) {
      const exam = await tx.exam.create({
        data: {
          cmsExamId: examDoc.id,
          courseVersionId: version.id,
          title: examDoc.title,
          description: examDoc.description,
          passPercent: examDoc.passPercent,
          timeLimitMin: examDoc.timeLimitMin,
          maxAttempts: examDoc.maxAttempts,
          randomize: examDoc.randomizeQuestions,
          status: 'PUBLISHED',
        },
      })
      for (let i = 0; i < examDoc.questions.length; i += 1) {
        const q = examDoc.questions[i]
        const correctKeys = Array.isArray(q.options) ? q.options.filter((x: any) => x?.isCorrect).map((x: any) => x.key) : []
        await tx.examQuestion.create({
          data: {
            cmsQuestionId: q.id,
            examId: exam.id,
            type: q.type,
            prompt: q.prompt,
            options: q.options,
            answerKey: q.type === 'SHORT_TEXT' ? { text: q.answerText } : { keys: correctKeys },
            explanation: q.explanation,
            points: q.points,
            position: i + 1,
          },
        })
      }
    }

    await tx.publishedCourseProjection.upsert({
      where: { courseId: courseRow.id },
      update: { versionId: version.id, projection: normalized, checksum, publishedAt: new Date() },
      create: { courseId: courseRow.id, versionId: version.id, projection: normalized, checksum },
    })

    await tx.course.update({ where: { id: courseRow.id }, data: { publishedVersionId: version.id, cmsRevision: checksum, publishedAt: new Date() } })
    await tx.outboxEvent.create({
      data: {
        aggregateType: 'Course',
        aggregateId: courseRow.id,
        eventType: 'CoursePublished',
        payload: { courseId: courseRow.id, cmsCourseId, versionId: version.id, version: nextVersion, checksum },
      },
    })

    return { skipped: false, courseId: courseRow.id, versionId: version.id, version: nextVersion, checksum }
  })
}
