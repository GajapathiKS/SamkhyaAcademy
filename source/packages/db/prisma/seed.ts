import {
  PrismaClient,
  UserStatus,
  PlatformRole,
  OrgRole,
  CoursePricingCategory,
  CourseContentType,
  CourseAccessType,
  DeliveryMode,
  CourseStatus,
  LessonType,
} from '@prisma/client'
import { courseCatalog, retiredCourseSlugs, type CatalogCourse } from '@samkhya/catalog'
import { hash } from 'bcryptjs'
import { config } from 'dotenv'

config({ path: new URL('../../../.env', import.meta.url) })

const prisma = new PrismaClient()
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

async function seedCourse(item: CatalogCourse) {
  const course = await prisma.course.upsert({
    where: { slug: item.slug },
    update: {
      title: item.title, shortDescription: item.shortDescription, category: item.category,
      deliveryMode: item.deliveryMode as DeliveryMode, contentType: item.contentType as CourseContentType,
      pricingCategory: item.pricingCategory as CoursePricingCategory, accessType: item.accessType as CourseAccessType,
      listPricePaise: item.listPricePaise, salePricePaise: item.salePricePaise, pricePaise: item.salePricePaise,
      freePreviewLessonCount: item.freePreviewLessonCount, brochurePath: item.brochurePublicPath,
      currency: 'INR', level: item.level, status: CourseStatus.PUBLISHED,
    },
    create: {
      slug: item.slug, title: item.title, shortDescription: item.shortDescription, category: item.category,
      deliveryMode: item.deliveryMode as DeliveryMode, contentType: item.contentType as CourseContentType,
      pricingCategory: item.pricingCategory as CoursePricingCategory, accessType: item.accessType as CourseAccessType,
      listPricePaise: item.listPricePaise, salePricePaise: item.salePricePaise, pricePaise: item.salePricePaise,
      freePreviewLessonCount: item.freePreviewLessonCount, brochurePath: item.brochurePublicPath,
      currency: 'INR', level: item.level, status: CourseStatus.PUBLISHED,
    },
  })

  const seedKey = `catalog-${item.slug}-2026-09`
  let version = await prisma.courseVersion.findFirst({ where: { courseId: course.id, cmsVersionKey: seedKey } })
  if (!version) {
    const latest = await prisma.courseVersion.aggregate({ where: { courseId: course.id }, _max: { version: true } })
    version = await prisma.courseVersion.create({ data: {
      courseId: course.id, cmsVersionKey: seedKey, version: (latest._max.version ?? 0) + 1,
      title: item.title, description: item.description, outcomes: item.outcomes, audience: item.audience,
      tools: item.tools, status: CourseStatus.PUBLISHED, publishedAt: new Date(),
    } })
    let lessonOffset = 0
    for (const [moduleIndex, moduleItem] of item.modules.entries()) {
      const moduleRecord = await prisma.courseModule.create({ data: {
        courseVersionId: version.id, title: moduleItem.title, description: moduleItem.description, position: moduleIndex + 1,
      } })
      for (const [lessonIndex, title] of moduleItem.lessons.entries()) {
        const isFreePreview = item.pricingCategory === 'FREE' || (item.pricingCategory === 'FREEMIUM' && lessonOffset < item.freePreviewLessonCount)
        await prisma.lesson.create({ data: {
          moduleId: moduleRecord.id, title, slug: `${slugify(title)}-${moduleIndex + 1}-${lessonIndex + 1}`,
          type: LessonType.VIDEO, position: lessonIndex + 1, durationSec: 900 + lessonIndex * 180,
          contentJson: { type: 'article', summary: `${title} in ${item.title}`, learningObjectives: item.outcomes.slice(0, 3), resources: [{ label: 'Lesson workbook', kind: 'PDF' }] },
          isFreePreview,
        } })
        lessonOffset += 1
      }
    }
  }

  await prisma.course.update({ where: { id: course.id }, data: { publishedVersionId: version.id, publishedAt: new Date() } })
  const modules = item.modules.map((moduleItem, index) => ({
    title: moduleItem.title, description: moduleItem.description, position: index + 1,
    lessons: moduleItem.lessons.map((title, lessonIndex) => ({ title, position: lessonIndex + 1 })),
  }))
  const projection = {
    title: item.title, slug: item.slug, description: item.description, outcomes: item.outcomes,
    audience: item.audience, prerequisites: item.prerequisites, tools: item.tools,
    pricingCategory: item.pricingCategory, contentType: item.contentType,
    listPricePaise: item.listPricePaise, salePricePaise: item.salePricePaise,
    pricePaise: item.salePricePaise, freePreviewLessonCount: item.freePreviewLessonCount, modules,
  }
  await prisma.publishedCourseProjection.upsert({
    where: { courseId: course.id },
    update: { versionId: version.id, projection, checksum: seedKey, publishedAt: new Date() },
    create: { courseId: course.id, versionId: version.id, projection, checksum: seedKey },
  })
  return { ...course, publishedVersionId: version.id }
}

async function main() {
  const passwordHash = await hash('ChangeMe-Immediately-123!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@samkhyaacademy.local' },
    update: { platformRole: PlatformRole.PLATFORM_ADMIN, status: UserStatus.ACTIVE },
    create: { email: 'admin@samkhyaacademy.local', name: 'Local Platform Admin', passwordHash, status: UserStatus.ACTIVE, platformRole: PlatformRole.PLATFORM_ADMIN },
  })
  const mentor = await prisma.user.upsert({
    where: { email: 'mentor@samkhyaacademy.local' },
    update: { platformRole: PlatformRole.VENTURE_MENTOR, status: UserStatus.ACTIVE },
    create: { email: 'mentor@samkhyaacademy.local', name: 'Local Venture Mentor', passwordHash, status: UserStatus.ACTIVE, platformRole: PlatformRole.VENTURE_MENTOR },
  })
  const learner = await prisma.user.upsert({
    where: { email: 'learner@samkhyaacademy.local' }, update: { status: UserStatus.ACTIVE },
    create: { email: 'learner@samkhyaacademy.local', name: 'Demo Learner', passwordHash, status: UserStatus.ACTIVE },
  })
  const orgAdmin = await prisma.user.upsert({
    where: { email: 'orgadmin@samkhyaacademy.local' }, update: { status: UserStatus.ACTIVE },
    create: { email: 'orgadmin@samkhyaacademy.local', name: 'Demo Organization Admin', passwordHash, status: UserStatus.ACTIVE },
  })
  const organization = await prisma.organization.upsert({
    where: { slug: 'samkhya-demo-enterprise' }, update: { active: true },
    create: { name: 'Samkhya Demo Enterprise', slug: 'samkhya-demo-enterprise', domain: 'example.com', settings: { type: 'BUSINESS_TEAM', seatLimit: 50 } },
  })
  for (const [userId, role] of [[orgAdmin.id, OrgRole.ORG_OWNER], [learner.id, OrgRole.LEARNER]] as const) {
    await prisma.organizationMembership.upsert({
      where: { organizationId_userId: { organizationId: organization.id, userId } },
      update: { role, acceptedAt: new Date() },
      create: { organizationId: organization.id, userId, role, acceptedAt: new Date() },
    })
  }

  const seededCourses = new Map<string, Awaited<ReturnType<typeof seedCourse>>>()
  for (const item of courseCatalog) seededCourses.set(item.slug, await seedCourse(item))
  for (const slug of retiredCourseSlugs) {
    const retired = await prisma.course.findUnique({ where: { slug } })
    if (retired) {
      await prisma.course.update({ where: { id: retired.id }, data: { status: CourseStatus.ARCHIVED, publishedVersionId: null, publishedAt: null, brochurePath: null } })
      await prisma.publishedCourseProjection.deleteMany({ where: { courseId: retired.id } })
    }
  }

  for (const [id, slug, accessTier] of [
    ['seed-enrollment-free', 'javascript-foundations', 'FULL'],
    ['seed-enrollment-preview', 'applied-ml-engineering', 'PREVIEW'],
    ['seed-enrollment-venture', 'entrepreneurship', 'FULL'],
  ] as const) {
    const course = seededCourses.get(slug)
    if (course) await prisma.enrollment.upsert({
      where: { id }, update: { status: 'ACTIVE', accessTier, versionId: course.publishedVersionId },
      create: { id, userId: learner.id, courseId: course.id, versionId: course.publishedVersionId, status: 'ACTIVE', accessTier },
    })
  }
  const ventureCourse = seededCourses.get('entrepreneurship')
  if (ventureCourse) {
    const workspace = await prisma.ventureWorkspace.upsert({
      where: { enrollmentId: 'seed-enrollment-venture' },
      update: { status: 'ACTIVE', ventureName: 'Circular Supply Lab', currentStageKey: 'IDEA', readinessScore: 12 },
      create: {
        id: 'seed-venture-workspace', enrollmentId: 'seed-enrollment-venture', userId: learner.id, courseId: ventureCourse.id,
        ventureName: 'Circular Supply Lab', problemStatement: 'Small manufacturers struggle to reuse surplus material efficiently.', targetCustomer: 'Small and mid-sized manufacturers', status: 'ACTIVE', currentStageKey: 'IDEA', readinessScore: 12,
        stages: { create: [
          ['IDEA','Idea & Opportunity'],['VALIDATE','Customer Validation'],['MODEL','Business Model'],['MVP','MVP Design & Build'],['LAUNCH','Pilot & Go-to-Market'],['MEASURE','Traction & Learning'],['SCALE','Scale & Production'],
        ].map(([stageKey,title], index) => ({ stageKey, title, stageOrder: index + 1, status: index === 0 ? 'IN_PROGRESS' : 'LOCKED', startedAt: index === 0 ? new Date() : undefined })) },
      },
    })
    await prisma.ventureMentorAssignment.upsert({ where: { workspaceId_mentorUserId: { workspaceId: workspace.id, mentorUserId: mentor.id } }, update: { active: true, leadMentor: true }, create: { workspaceId: workspace.id, mentorUserId: mentor.id, active: true, leadMentor: true } })
    const existingArtifact = await prisma.ventureArtifact.findFirst({ where: { workspaceId: workspace.id, stageKey: 'IDEA', artifactType: 'Opportunity Brief' } })
    if (!existingArtifact) await prisma.ventureArtifact.create({ data: { workspaceId: workspace.id, stageKey: 'IDEA', artifactType: 'Opportunity Brief', title: 'Circular material reuse opportunity', contentJson: { evidence: 'Initial stakeholder interviews scheduled', nextStep: 'Validate disposal and procurement pain points' }, status: 'DRAFT' } })
  }
  const offerCourse = seededCourses.get('ai-engineering')
  if (offerCourse) await prisma.offer.upsert({
    where: { token: 'demo-offer' },
    update: { status: 'ACTIVE', originalAmountPaise: offerCourse.listPricePaise ?? 3500000, finalAmountPaise: offerCourse.salePricePaise ?? 2999000, expiresAt: new Date(Date.now() + 7 * 86400000) },
    create: { token: 'demo-offer', code: 'DEMO-FDE', courseId: offerCourse.id, createdByUserId: admin.id, status: 'ACTIVE', discountType: 'FIXED', originalAmountPaise: offerCourse.listPricePaise ?? 3500000, discountValue: (offerCourse.listPricePaise ?? 3500000) - (offerCourse.salePricePaise ?? 2999000), finalAmountPaise: offerCourse.salePricePaise ?? 2999000, expiresAt: new Date(Date.now() + 7 * 86400000), notes: 'Local Razorpay test-mode demonstration offer' },
  })
  await prisma.auditLog.create({ data: { actorUserId: admin.id, action: 'DEMO_DATA_REFRESHED', entityType: 'Catalog', payload: { courses: courseCatalog.length, mentorId: mentor.id } } })
  console.log(`Seeded ${courseCatalog.length} active courses, archived standalone SAP consulting, and created demo identities.`)
}

main().finally(() => prisma.$disconnect())
