# CMS + CQRS Design

## Why Payload is not the learner database
Payload is optimized for internal editorial workflows: drafts, versions, rich text, media and publishing. Learner transactions have different consistency and reporting needs.

Therefore:

```text
Internal Content Team
       |
       v
 Payload CMS (cms schema)
 Courses / Modules / Lessons / Exams / Blogs / Media
       |
       | Publish command
       v
 Course Projection Builder
       |
       v
 Prisma LMS (lms schema)
 immutable version + learner optimized projection
       |
       +--> enrollments
       +--> progress
       +--> exam attempts
       +--> certificates
       +--> organization reporting
```

## Write side
Payload owns editable content.

Authors can create drafts. Internal SMEs cannot publish. Content Admin / Platform Admin publishes.

Payload's native versions/drafts are used for editorial history. The LMS never reads drafts.

## Read side
When a course is published, the projection builder creates:
- `CourseVersion`
- `CourseModule`
- `Lesson`
- `Exam`
- `ExamQuestion`
- `PublishedCourseProjection`

The JSON projection supports fast course-tree delivery. Normalized projections support progress, exams and reporting.

## Enrollment version pinning
An enrollment stores `versionId`. A learner that starts v3 continues on v3 even if v4 is published. Upgrade policies can later be added explicitly.

## Child content updates
Publishing a module, lesson or exam rebuilds the parent course projection. In high scale production, replace the synchronous hook with an outbox/job event such as `CourseProjectionRebuildRequested`.

## Blog publishing
Blogs do not use LMS CQRS. They use Payload drafts/versions directly because they are editorial content and have no learner transaction consistency requirement.

## Authorization boundaries

### Payload / internal CMS
- platform_admin
- content_admin
- internal_sme
- support

### LMS platform users
- PLATFORM_ADMIN
- CONTENT_ADMIN
- SUPPORT
- normal users with no platform role

### Organization roles
- ORG_OWNER
- ORG_ADMIN
- MANAGER
- LEARNER

There is deliberately **no external instructor/author role** in organization membership.
