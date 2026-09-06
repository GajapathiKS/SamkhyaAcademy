# SamkhyaAcademy — Recent Platform Consolidation

This revision consolidates the latest functional decisions into the production monorepo.

## Core learning platform

- Public academy homepage and catalog
- Free, paid, private/invite-only and organization-only courses
- Self-paced, live online, offline, hybrid and cohort delivery modes
- Payload CMS authoring for internal SamkhyaAcademy authors only
- Courses, modules, lessons, learning paths, question bank, exams, faculty, webinars, blogs and media
- CQRS-style course publishing into immutable learner read projections
- User registration/login, platform roles and organization memberships
- Enrollment, lesson progress, exams, scoring and certificate records
- Organization administration and learner tracking foundation
- Brochure lead capture and webinar leads

## Free learning / acquisition

`CourseAccessType` now supports:

- `FREE`
- `PAID`
- `PRIVATE`
- `ORGANIZATION_ONLY`

The seed includes sample free courses for:

- C Programming Fundamentals
- C++ Essentials
- JavaScript Foundations

This lets SamkhyaAcademy use free tutorials as an acquisition/trust layer while keeping premium learning paths and mentored programs in the same LMS.

## Entrepreneurship Venture Builder

Five approved UX experiences are now represented in code:

1. `/entrepreneurship` — Venture Builder landing page
2. `/venture-builder/idea` — structured Idea Submission & Opportunity Intake
3. `/venture-builder/workspaces/[workspaceId]/workflow` — seven-stage venture workflow and progress
4. `/venture-builder/workspaces/[workspaceId]/artifacts` — artifact library and stage readiness
5. `/venture-builder/workspaces/[workspaceId]/review` — learner-facing mentor review history

Mentor/admin experiences:

- `/platform-admin/venture-builder` — review queue / mentor hub
- `/platform-admin/venture-builder/ideas` — founder idea intake review queue
- `/platform-admin/venture-builder/[workspaceId]/[stageKey]` — structured stage review with scorecard and approve/request-changes decision

### Venture journey

Idea & Opportunity → Customer Validation → Business Model → MVP Design & Build → Pilot & Go-to-Market → Traction & Learning → Scale & Production

### Persisted venture data

- `VentureIdeaSubmission`
- `VentureWorkspace`
- `VentureStageProgress`
- `VentureArtifact`
- `VentureMentorAssignment`
- `VentureMentorReview`
- `VentureReviewScore`
- `VentureMilestone`

Stage submission and mentor decisions emit outbox events to support future notifications/analytics.

## Academy operations layer

Operational CRM is deliberately separate from the core learner product:

- Brochure/webinar/contact/demo leads
- Lead pipeline and activity history
- Counsellor follow-up
- Email and WhatsApp templates/campaigns
- Communication consent, opt-out and suppression
- Private/discounted offers
- Razorpay Payment Links and signed webhook confirmation
- Successful payment → CRM conversion → course enrollment

## Hosting direction

Initial production target:

- AWS Lightsail 4 GB instance
- Docker Compose
- Next.js + Payload CMS
- PostgreSQL
- Redis
- FastAPI AI service
- S3-compatible object storage (MinIO locally, S3 in production)
- Caddy reverse proxy / HTTPS

## Local validation

After changing the Prisma model run:

```powershell
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Local provider mode should remain:

```env
COMMUNICATIONS_MODE=console
```

until SES / WhatsApp credentials are intentionally enabled.
