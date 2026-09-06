# SamkhyaAcademy LMS — Next.js + Payload CMS + Prisma + PostgreSQL + FastAPI

Production-oriented starter for turning the approved SamkhyaAcademy UX into a real learning platform.

## What is implemented

### Public / learner platform — Next.js
- public course catalog and course detail pages
- learner registration / login
- enrollments
- lesson progress and video position
- exams / attempts / scoring
- certificate eligibility, issuance and public verification model
- comments and reactions data model
- brochure lead capture
- organization and learner dashboards
- learning paths
- public blog / Insights pages powered by Payload CMS

### Internal Content Studio — Payload CMS
Available at `/content-studio`.

Only SamkhyaAcademy-controlled internal accounts exist in Payload. Learners and customer organization users authenticate through the LMS user tables and **cannot become course authors**.

Content Studio manages:
- Courses
- Course Modules
- Lessons
- Question Bank
- Exams
- Learning Path Definitions
- Blogs / Insights
- Webinars
- Landing Pages
- Faculty / internal SMEs
- Media library

Roles:
- `platform_admin` — full CMS administration
- `content_admin` — author + publish
- `internal_sme` — author drafts, cannot publish
- `support` — read/support access, cannot author

The first CMS user can only be bootstrapped while `CMS_ALLOW_BOOTSTRAP=true` and only if no CMS account exists. Set it to `false` immediately after creating the first internal administrator.

## CQRS course publishing

Payload is the **write-side authoring system**. Prisma's `lms` schema is the **learner/read-side and transactional LMS**.

Publishing a Payload course triggers:

1. Load published course metadata
2. Load published modules
3. Load published lessons
4. Load published exams and questions
5. Validate and normalize the course tree
6. SHA-256 checksum the snapshot
7. Create an immutable LMS `CourseVersion`
8. Create normalized module / lesson / exam projections for learning transactions
9. Upsert `PublishedCourseProjection`
10. Atomically point `Course.publishedVersionId` to the new version
11. Add `CoursePublished` to the LMS outbox

If the checksum is unchanged, no new version is created.

Existing enrollments are pinned to the `versionId` they started with, so publishing a new course version does not mutate lessons/exams underneath active learners.

## PostgreSQL ownership

One PostgreSQL database, two schemas:

- `cms` — owned by Payload / Drizzle
- `lms` — owned by Prisma

Do not let Prisma manage Payload tables and do not let Payload mutate LMS tables directly except through the explicit projection service.

## Local development

### 1. Environment

```bash
cp .env.example .env
```

### 2. Infrastructure

```bash
docker compose up -d postgres redis minio
```

### 3. Install dependencies

```bash
npm install
```

### 4. Generate and migrate the LMS schema

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 5. Start Next.js / Payload

```bash
npm run dev
```

Visit:
- App: http://localhost:3000
- Internal Content Studio: http://localhost:3000/content-studio

Create the first CMS user, then set:

```env
CMS_ALLOW_BOOTSTRAP=false
```

### 6. Seed starter CMS course metadata (optional)

After migrations and the first CMS user exist:

```bash
npm run cms:seed -w @samkhya/web
```

### 7. Start FastAPI

```bash
cd services/ai-api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Internal authoring workflow

### New course
`Content Studio → Courses → Create New`

Configure title, category, delivery mode, faculty, outcomes, brochure, tools, prerequisites, certificate and completion rules.

### New lesson
`Content Studio → Lessons → Create New`

Attach to a module and choose VIDEO, ARTICLE, LIVE_SESSION, QUIZ, ASSIGNMENT, LAB or DOWNLOAD. Add media, rich text, resources, comments/reaction settings and completion mode.

### New exam
`Content Studio → Question Bank` first, then `Exams → Create New`.

Exams support pass percentage, attempt limits, time limit, randomization, practice/module/final/certification types and certificate triggers.

### Blogs
`Content Studio → Posts`

Blog CMS supports:
- rich Lexical editing
- media
- code blocks
- callouts
- image galleries
- related course CTAs
- webinar CTAs
- FAQ blocks
- SEO metadata
- drafts / versions / scheduled publishing

## Media

Local development can use Payload's local media storage. When `S3_BUCKET` is configured, Payload's S3 adapter is enabled. MinIO is included for local S3-compatible testing. Video/PDF downloads are configured to use signed URLs through the storage adapter.

## Core routes

- `/courses`
- `/courses/[slug]`
- `/learning-paths`
- `/blog`
- `/blog/[slug]`
- `/dashboard`
- `/org-admin`
- `/admin`
- `/platform-admin/content`
- `/content-studio`

## Important production work still required

This is a production-oriented foundation, not a completed commercial SaaS release. Before live launch add:
- verified email / password reset UI and transactional email
- MFA for platform and CMS admins
- SSO/OIDC for enterprise customers
- payment/subscription service if courses are sold online
- durable background worker for outbox events
- email/SMS/WhatsApp notification provider
- certificate PDF rendering and signing
- video transcoding / DRM / adaptive streaming if required
- antivirus scanning for uploads
- rate limiting and bot protection
- observability, tracing and alerting
- backups and DR drills
- privacy/retention workflows
- payment/legal/tax requirements
- automated integration/E2E/security tests

See `docs/ARCHITECTURE.md` and `docs/CMS_AND_CQRS.md`.

## Commercial operations added

The production starter now includes:

- Mini CRM for brochure/webinar/contact/demo leads.
- Internal `SALES_COUNSELLOR` platform role; external organization users cannot access CRM or author content.
- CRM activity timeline and follow-up management.
- Opportunities model for individual and organization sales.
- On-demand discounted/private offer URLs.
- Razorpay Payment Links created server-side.
- Recipient-bound offer validation using lead email/mobile when configured.
- Razorpay webhook signature validation using the raw request body.
- Paid webhook -> payment record -> lead conversion -> learner account/invitation -> course enrollment.
- AWS Lightsail 4 GB Docker production topology with Caddy, PostgreSQL, Redis and FastAPI.
- Nightly PostgreSQL backup helper.

See `docs/CRM_PAYMENTS_AND_LIGHTSAIL.md` for deployment and payment details.

## CRM marketing: Email + WhatsApp

The mini CRM now includes a consent-aware marketing module:

- `/admin/crm/marketing` — template and campaign console
- Amazon SES email provider
- Meta WhatsApp Cloud API provider
- WhatsApp delivery/read/failure webhook at `/api/whatsapp/webhook`
- lead-level direct Email / WhatsApp follow-up
- channel-specific opt-in consent
- unsubscribe/suppression handling
- audience segments by CRM status/program/type/source
- scheduled campaigns via `/api/internal/communications/run-scheduled`
- local console mode so development does not send real messages

For local testing keep:

```env
COMMUNICATIONS_MODE=console
```

After updating this version run:

```bash
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Then sign in as the seeded local admin and open:

- `http://localhost:3000/platform-admin/crm`
- `http://localhost:3000/admin/crm/marketing`

See `docs/CRM_WHATSAPP_EMAIL.md` for provider and Lightsail scheduling configuration.

## Entrepreneurship Venture Builder
The Entrepreneurship program now includes a transactional Venture Builder workspace in addition to standard course delivery. Enrolled participants can progress through Idea -> Validate -> Model -> MVP -> Launch -> Measure -> Scale, submit stage artifacts, receive mentor feedback and advance through approval gates. See `docs/VENTURE_BUILDER.md`.

## September 2026 consolidated scope

The monorepo now includes the latest Entrepreneurship Venture Builder workflows and supports free courses alongside paid/private/organization offerings. See `docs/RECENT_PLATFORM_CONSOLIDATION.md` and `docs/VENTURE_BUILDER.md`.

Key Entrepreneurship routes:

- `/entrepreneurship`
- `/venture-builder/idea`
- `/venture-builder/workspaces/[workspaceId]/workflow`
- `/venture-builder/workspaces/[workspaceId]/artifacts`
- `/venture-builder/workspaces/[workspaceId]/review`
- `/platform-admin/venture-builder`
- `/platform-admin/venture-builder/ideas`

The five approved Venture Builder UX images are retained under `docs/ux/entrepreneurship/` as visual acceptance references for final implementation refinement.

## September 2026 - Course Commercial & Delivery Model

The platform now supports admin-managed course commercial/delivery configuration:

- Pricing Category: **Free / Freemium / Pricing**
- Content Type: **Full Online Videos / Hybrid (Offline + Online Videos) / Full Offline**
- List Price / Current Price / Currency
- Freemium preview lesson count and lesson-level preview flags
- Enrollment access tiers: PREVIEW / FULL
- Razorpay success upgrades paid/freemium learners to FULL access

Seed data includes free C/C++/JavaScript tutorials, freemium Full-Stack / Applied ML / Data Analytics programs, and priced premium programs.

AI curriculum alignment has also been consolidated:

- Full-Stack / Backend Developer -> GenAI Developer -> Production AI Engineer -> AI FDE
- Python, C#/.NET, Java/Spring and Node.js/TypeScript are supported entry stacks for FDE
- Applied ML includes Deep Learning, CV/NLP, voice/multimodal AI, LLM fine-tuning, LoRA/QLoRA, SLMs, quantization, distillation and MLOps
- AI Leadership includes hosted LLM vs RAG vs fine-tuning vs SLM vs voice/vision decision framing

See `docs/COURSE_PRICING_AND_DELIVERY.md` and `docs/AI_CURRICULUM_ALIGNMENT.md`.
