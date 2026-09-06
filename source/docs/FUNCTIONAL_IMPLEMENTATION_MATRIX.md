# Functional implementation matrix

This matrix maps the client-facing proposal to the monorepo implementation.

| Functional area | Implementation in monorepo |
|---|---|
| Academy homepage | `apps/web/app/page.tsx` |
| Course catalog | `apps/web/app/courses/page.tsx` |
| Individual course/program page | `apps/web/app/courses/[slug]/page.tsx` |
| Free tutorials | `CourseAccessType.FREE`, free seed courses, direct enrollment API |
| Paid/private courses | `CourseAccessType.PAID/PRIVATE/ORGANIZATION_ONLY`, CRM offer/payment flow |
| Internal CMS | Payload Content Studio under `/content-studio` |
| Course/module/lesson authoring | Payload collections: Courses, CourseModules, Lessons |
| Exams/question bank | Payload collections + Prisma read model + learner attempt APIs |
| Blogs/content CMS | Payload Blogs + public `/blog` routes |
| Faculty/webinars/media | Payload collections and CMS storage |
| CQRS publishing | `src/cms/publishCourse.ts` → immutable `CourseVersion` + `PublishedCourseProjection` |
| Learner login/registration | `/login`, `/register`, auth API/session cookie |
| Enrollment | `/api/courses/[courseId]/enroll` + CRM/Razorpay conversion |
| Lesson progress | `/api/progress` + `LessonProgress` |
| Exams / scoring | `/api/exams/...` routes and attempt models |
| Certificates | `/api/certificates` + public verification route |
| Organization management | `/organizations`, `/org-admin`, memberships/invite API |
| Brochure lead gate | `components/BrochureGate.tsx` + brochure lead API |
| Webinar leads | webinar lead API and CMS webinar content |
| Mini operational CRM | `/platform-admin/crm` and lead/activity/opportunity models |
| Email / WhatsApp campaigns | `/admin/crm/marketing`, communications services and webhooks |
| Discounted private offers | `/api/admin/offers`, `/o/[token]` |
| Razorpay | Payment Link integration + signed webhook handler |
| Entrepreneurship landing | `/entrepreneurship` |
| Entrepreneurship idea intake | `/venture-builder/idea` + `/api/venture/ideas` |
| Venture workspace | `/venture-builder` |
| Venture stage workflow | `/venture-builder/workspaces/[workspaceId]/workflow` |
| Venture artifacts/readiness | `/venture-builder/workspaces/[workspaceId]/artifacts` |
| Learner mentor feedback | `/venture-builder/workspaces/[workspaceId]/review` |
| Mentor review hub | `/platform-admin/venture-builder` |
| Idea review queue | `/platform-admin/venture-builder/ideas` |
| Structured stage scoring | `/platform-admin/venture-builder/[workspaceId]/[stageKey]` + review API |
| AWS Lightsail deployment | `docker-compose.production.yml`, `infra/lightsail/*` |
| Local object storage | MinIO via Docker Compose |
| Production object storage | S3-compatible configuration |
| AI service boundary | `services/ai-api` FastAPI service |

## Important scope boundary

The monorepo implements the Phase-1 functional platform foundation. Large-scale video DRM/adaptive streaming, AI proctoring, native mobile apps, advanced CRM automation, deep BI/report builders and external marketplace functionality remain future enhancements rather than implied Phase-1 commitments.
