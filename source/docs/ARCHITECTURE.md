# SamkhyaAcademy Architecture

## Components

```text
Browser / Mobile Web
        |
        v
Next.js 15 application
  | public academy
  | learner portal
  | org admin
  | platform admin
  | Payload Content Studio
  | BFF / API routes
        |
        +-------------------------+
        |                         |
        v                         v
PostgreSQL                    FastAPI AI
 cms schema                   assessment generation
 Payload/Drizzle              content enrichment
                              transcript processing
 lms schema                   recommendations
 Prisma                       future agents
        |
        +--> Redis / worker / outbox
        +--> S3-compatible media storage
```

## Bounded contexts

1. Identity & Access
2. Organizations
3. Content Authoring
4. Catalog & Publishing
5. Learning Delivery
6. Assessments
7. Certifications
8. Leads & Webinars
9. Blogs / Marketing CMS
10. Reporting & Analytics
11. AI Services

## Identity separation

Learners and organization users live in `lms.User`.

Internal CMS operators live in Payload's `cms-users` auth collection.

This intentionally prevents a customer organization's administrator from becoming a course author through organization role escalation.

## Authentication
The starter uses an HTTP-only signed LMS session cookie for learner/platform access and Payload's built-in auth for Content Studio. Production should add email verification, password recovery, MFA for privileged users and enterprise OIDC/SSO.

## Course lifecycle

```text
DRAFT
  -> internal review
  -> PUBLISHED
      -> immutable LMS version
      -> outbox CoursePublished
  -> new draft changes
  -> publish new immutable version
```

## Assessment lifecycle

```text
Question Bank
   -> Exam Definition
   -> Published into course version
   -> Learner starts Attempt
   -> Answers stored
   -> Score calculated server-side
   -> PASS / FAIL
   -> completion rules evaluated
   -> Certificate eligibility
```

## Certificate lifecycle
Certificate issuance is server-controlled. The learner cannot supply a `userId`; it is taken from the authenticated session. Eligibility checks lesson completion and required passing exams before issuing a verification code.

## Deployment direction
- Next.js + Payload: Vercel or Node container platform
- PostgreSQL: managed PostgreSQL
- Redis: managed Redis
- FastAPI: container service (Azure Container Apps, AWS ECS, Railway/Render, etc.)
- Media: S3/R2/Azure Blob via adapter
- Background worker: separate durable process reading the outbox
