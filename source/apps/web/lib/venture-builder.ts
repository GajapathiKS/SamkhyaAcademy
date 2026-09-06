import { prisma } from '@samkhya/db'

export const VENTURE_STAGES = [
  {
    key: 'IDEA', title: 'Idea & Opportunity', artifact: 'Opportunity Brief',
    description: 'Clarify the problem, target user, urgency and opportunity worth pursuing.',
    tasks: ['Define the problem and why now', 'Identify target customer segments', 'Capture initial solution hypothesis'],
  },
  {
    key: 'VALIDATE', title: 'Customer Validation', artifact: 'Validation Report',
    description: 'Validate assumptions through interviews, evidence and customer insight.',
    tasks: ['Prepare interview guide', 'Complete customer interviews', 'Synthesize insights and assumptions'],
  },
  {
    key: 'MODEL', title: 'Business Model', artifact: 'Business Model & Pricing',
    description: 'Shape the value proposition, revenue model, channels and unit economics.',
    tasks: ['Define value proposition', 'Select business model and pricing', 'Estimate early unit economics'],
  },
  {
    key: 'MVP', title: 'MVP Design & Build', artifact: 'MVP Scope / Prototype',
    description: 'Build the smallest useful product that can validate value with real users.',
    tasks: ['Finalize MVP scope', 'Build clickable or working prototype', 'Prepare test plan and success metrics'],
  },
  {
    key: 'LAUNCH', title: 'Pilot & Go-to-Market', artifact: 'Launch Plan',
    description: 'Launch a controlled pilot, acquire early users and capture structured feedback.',
    tasks: ['Prepare pilot cohort', 'Define acquisition channels', 'Execute launch checklist'],
  },
  {
    key: 'MEASURE', title: 'Traction & Learning', artifact: 'Metrics & Feedback Review',
    description: 'Measure adoption, learning, revenue signals and product-market evidence.',
    tasks: ['Track agreed metrics', 'Review customer feedback', 'Prioritize iteration backlog'],
  },
  {
    key: 'SCALE', title: 'Scale & Production', artifact: 'Scale / Investor Readiness Deck',
    description: 'Prepare operations, technology, finance and growth systems for sustained scale.',
    tasks: ['Assess production readiness', 'Create operating and growth plan', 'Prepare investor / expansion narrative'],
  },
] as const

export const VENTURE_REVIEW_CRITERIA = [
  { key: 'problem_clarity', label: 'Problem Clarity', maxScore: 20 },
  { key: 'customer_relevance', label: 'Customer Relevance', maxScore: 20 },
  { key: 'solution_approach', label: 'Solution Approach', maxScore: 20 },
  { key: 'founder_readiness', label: 'Founder Readiness', maxScore: 20 },
  { key: 'scalability', label: 'Scalability Potential', maxScore: 20 },
] as const

export const STAGE_ARTIFACTS: Record<string, string[]> = {
  IDEA: ['Problem Statement', 'Opportunity Brief', 'Founder Profile'],
  VALIDATE: ['Customer Interview Notes', 'Persona Sheet', 'Validation Summary'],
  MODEL: ['Business Model Canvas', 'Pricing Hypothesis', 'Unit Economics'],
  MVP: ['MVP Prototype', 'MVP Demo Video', 'Technical Architecture Overview', 'Test Plan & Success Metrics'],
  LAUNCH: ['Launch Checklist', 'Go-to-Market Plan', 'Pitch Deck', 'Pilot Metrics Dashboard'],
  MEASURE: ['Traction Dashboard', 'Customer Feedback Review', 'Iteration Backlog'],
  SCALE: ['Scale Readiness Assessment', 'Financial Model', 'Operating Plan', 'Investor / Expansion Deck'],
}

export async function ensureVentureWorkspace(userId: string, enrollmentId: string, ventureName = 'My Venture', ideaSubmissionId?: string) {
  const enrollment = await prisma.enrollment.findFirst({
    where: { id: enrollmentId, userId }, include: { course: true },
  })
  if (!enrollment) throw new Error('ENROLLMENT_NOT_FOUND')
  if (enrollment.course.slug !== 'entrepreneurship') throw new Error('NOT_ENTREPRENEURSHIP_ENROLLMENT')

  const existing = await prisma.ventureWorkspace.findUnique({
    where: { enrollmentId },
    include: {
      stages: { orderBy: { stageOrder: 'asc' } }, artifacts: true,
      reviews: { orderBy: { createdAt: 'desc' }, include: { mentor: true, scores: true } },
      mentorAssignments: { where: { active: true }, include: { mentor: true } }, milestones: { orderBy: { dueAt: 'asc' } },
      ideaSubmission: true,
    },
  })
  if (existing) return existing

  const idea = ideaSubmissionId ? await prisma.ventureIdeaSubmission.findFirst({ where: { id: ideaSubmissionId, userId } }) : null
  const created = await prisma.ventureWorkspace.create({
    data: {
      enrollmentId, userId, courseId: enrollment.courseId, organizationId: enrollment.organizationId,
      ventureName: idea?.ventureName || ventureName,
      problemStatement: idea?.problemStatement,
      targetCustomer: idea?.targetCustomer,
      ideaSubmissionId: idea?.id,
      status: 'ACTIVE',
      stages: {
        create: VENTURE_STAGES.map((stage, index) => ({
          stageKey: stage.key, stageOrder: index + 1, title: stage.title,
          status: index === 0 ? 'IN_PROGRESS' : 'LOCKED', startedAt: index === 0 ? new Date() : undefined,
        })),
      },
      milestones: {
        create: [
          { title: 'Kickoff & orientation', stageKey: 'IDEA' },
          { title: 'MVP review', stageKey: 'MVP' },
          { title: 'Pilot launch window', stageKey: 'LAUNCH' },
          { title: 'Founder showcase / demo day', stageKey: 'SCALE' },
        ],
      },
    },
    include: { stages: { orderBy: { stageOrder: 'asc' } }, artifacts: true, reviews: true, milestones: true },
  })
  if (idea) await prisma.ventureIdeaSubmission.update({ where: { id: idea.id }, data: { status: 'CONVERTED_TO_WORKSPACE' } })
  return created
}

export async function getVentureWorkspaceForUser(userId: string, workspaceId?: string) {
  return prisma.ventureWorkspace.findFirst({
    where: { userId, ...(workspaceId ? { id: workspaceId } : {}) },
    include: {
      stages: { orderBy: { stageOrder: 'asc' }, include: { reviews: { orderBy: { createdAt: 'desc' }, take: 1 } } },
      artifacts: { orderBy: { updatedAt: 'desc' } },
      reviews: { orderBy: { createdAt: 'desc' }, include: { mentor: true, scores: true } },
      mentorAssignments: { where: { active: true }, include: { mentor: true } },
      milestones: { orderBy: { dueAt: 'asc' } },
      user: true, course: true, organization: true, ideaSubmission: true,
    },
    orderBy: { updatedAt: 'desc' },
  })
}

export function calculateWorkspaceReadiness(workspace: any) {
  const stages = workspace?.stages || []
  const artifacts = workspace?.artifacts || []
  const approvedStages = stages.filter((s: any) => s.status === 'APPROVED').length
  const stagePct = stages.length ? (approvedStages / stages.length) * 100 : 0
  const current = stages.find((s: any) => s.stageKey === workspace.currentStageKey)
  const required = STAGE_ARTIFACTS[current?.stageKey || 'IDEA'] || []
  const submitted = artifacts.filter((a: any) => a.stageKey === current?.stageKey && ['SUBMITTED','APPROVED'].includes(a.status)).length
  const artifactPct = required.length ? Math.min(100, (submitted / required.length) * 100) : 100
  return Math.round(stagePct * 0.7 + artifactPct * 0.3)
}

export async function submitVentureStage(userId: string, workspaceId: string, stageKey: string, payload: { title: string; artifactType: string; contentJson?: unknown; fileObjectKey?: string }) {
  const workspace = await prisma.ventureWorkspace.findFirst({ where: { id: workspaceId, userId } })
  if (!workspace) throw new Error('WORKSPACE_NOT_FOUND')
  const stage = await prisma.ventureStageProgress.findUnique({ where: { workspaceId_stageKey: { workspaceId, stageKey } } })
  if (!stage || ['LOCKED', 'APPROVED'].includes(stage.status)) throw new Error('STAGE_NOT_SUBMITTABLE')

  return prisma.$transaction(async tx => {
    const artifact = await tx.ventureArtifact.create({
      data: {
        workspaceId, stageKey, artifactType: payload.artifactType, title: payload.title,
        contentJson: payload.contentJson as any, fileObjectKey: payload.fileObjectKey,
        status: 'SUBMITTED', submittedAt: new Date(),
      },
    })
    await tx.ventureStageProgress.update({ where: { id: stage.id }, data: { status: 'MENTOR_REVIEW', submittedAt: new Date() } })
    await tx.outboxEvent.create({ data: { aggregateType: 'VentureWorkspace', aggregateId: workspaceId, eventType: 'VentureStageSubmitted', payload: { workspaceId, stageKey, artifactId: artifact.id } } })
    return artifact
  })
}

export async function reviewVentureStage(
  mentorUserId: string,
  workspaceId: string,
  stageKey: string,
  decision: 'APPROVED'|'CHANGES_REQUESTED'|'COMMENT_ONLY',
  feedback: string,
  scores?: Array<{ criterion: string; score: number; maxScore?: number; notes?: string }>,
) {
  const stage = await prisma.ventureStageProgress.findUnique({ where: { workspaceId_stageKey: { workspaceId, stageKey } } })
  if (!stage) throw new Error('STAGE_NOT_FOUND')

  return prisma.$transaction(async tx => {
    const review = await tx.ventureMentorReview.create({
      data: {
        workspaceId, stageProgressId: stage.id, mentorUserId, decision, feedback,
        scores: scores?.length ? { create: scores.map(s => ({ criterion: s.criterion, score: s.score, maxScore: s.maxScore || 20, notes: s.notes })) } : undefined,
      },
    })
    if (decision === 'APPROVED') {
      await tx.ventureStageProgress.update({ where: { id: stage.id }, data: { status: 'APPROVED', approvedAt: new Date() } })
      await tx.ventureArtifact.updateMany({ where: { workspaceId, stageKey, status: 'SUBMITTED' }, data: { status: 'APPROVED', approvedAt: new Date() } })
      const next = await tx.ventureStageProgress.findFirst({ where: { workspaceId, stageOrder: stage.stageOrder + 1 } })
      if (next) {
        await tx.ventureStageProgress.update({ where: { id: next.id }, data: { status: 'IN_PROGRESS', startedAt: new Date() } })
        await tx.ventureWorkspace.update({ where: { id: workspaceId }, data: { currentStageKey: next.stageKey } })
      } else {
        await tx.ventureWorkspace.update({ where: { id: workspaceId }, data: { status: 'COMPLETED', currentStageKey: stage.stageKey, readinessScore: 100 } })
      }
    } else if (decision === 'CHANGES_REQUESTED') {
      await tx.ventureStageProgress.update({ where: { id: stage.id }, data: { status: 'CHANGES_REQUESTED' } })
    }
    await tx.outboxEvent.create({ data: { aggregateType: 'VentureWorkspace', aggregateId: workspaceId, eventType: 'VentureStageReviewed', payload: { workspaceId, stageKey, reviewId: review.id, decision } } })
    return { ok: true, reviewId: review.id }
  })
}
