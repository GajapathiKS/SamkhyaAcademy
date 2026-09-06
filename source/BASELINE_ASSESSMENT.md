# SamkhyaAcademy Baseline Assessment

Assessment date: 2026-09-02

## Repository state

- `01_Latest_Code_Repo` is the only implementation source in this handoff.
- No `.git` directory or prior lockfile is present, so source history and change attribution are unavailable in this snapshot.
- The host currently exposes Node 24, while the architecture calls for Node 20 LTS. The application container will be pinned to Node 20 and the project engine range will enforce Node 20/22-compatible execution.
- Dependencies were not installed at assessment time.

## Working foundations

- Next.js App Router application with Payload Content Studio integration.
- Prisma schema covering identity, organizations, course projections, enrollments, progress, exams, certificates, CRM, communications, offers/payments, and Venture Builder state.
- Separate Payload authoring and Prisma transactional domains with a CQRS-style publishing service.
- Basic registration/login, course catalog, enrollment, progress, exam, certificate verification, organization, CRM, payment, and Venture Builder routes.
- Docker definitions for PostgreSQL, Redis, MinIO, FastAPI, Next.js, and Caddy.
- Razorpay signature verification, private offer flow, console/live communications adapters, and consent/suppression models.
- Approved UX masters and legacy brochure references are included in the handoff.

## Partial implementation

- Most application pages are compact first-pass screens rather than the approved dense, production-ready UX.
- Course seeds contain realistic top-level metadata but only a generic starter module in the Prisma learner projection.
- CMS and Prisma seeds duplicate course facts and can drift.
- Organization reporting, learner notes/resources, exam UI states, certificate output, and public information-architecture routes are incomplete.
- Venture Builder has core records and routes but requires stronger workflow validation, richer demo data, and visual refinement.
- FastAPI endpoints intentionally return governed-development placeholders.
- Existing FDE and leadership PDFs are text-accessible but visually inconsistent with the approved masters; most other served PDFs are unchanged legacy image PDFs.

## Missing or conflicting requirements

- Required reports, 52-screen inventory, browser screenshots, and Marvel manifests do not yet exist.
- No automated unit, integration, or Playwright test configuration exists.
- Prisma and CMS use legacy enum values `PRICED` and `HYBRID_OFFLINE_ONLINE_VIDEOS`; the BRD requires `PRICING` and `HYBRID_OFFLINE_ONLINE`.
- The standalone SAP Enterprise Consulting course remains in seeds, categories, learning paths, faculty marketing copy, documentation, and public brochure assets.
- Public routes for Programs, Webinars, About, and learner exam/result/certificate dashboard states are missing or incomplete.
- The repository has a single Prisma migration despite the much larger current schema, so clean-database migration validation is required.
- No password-reset flow, durable outbox worker, production bounce/complaint ingestion, upload malware scanning, or live provider credentials are present.

## Implementation order

1. Stabilize tooling, lock dependencies, align schema enums, and create safe SAP archival migration logic.
2. Centralize catalog content and seed realistic course, learner, organization, exam, certificate, Venture, CRM, and payment demo states.
3. Complete entitlement, learning, assessment, certificate, organization, Venture, CRM, communications, and payment flows.
4. Apply the approved design system across the 52 prototype states and public information architecture.
5. Generate and visually validate eight A4 portrait brochures.
6. Run clean-database, build, unit, integration, browser, visual, PDF, and production-compose checks; publish the required reports and mappings.

## Provider-dependent boundaries

- Keep email and WhatsApp in console mode until verified SES/Meta credentials are supplied.
- Keep Razorpay in test mode until live credentials and webhook configuration are explicitly supplied.
- Keep FastAPI responses provider-independent and human-review gated until an approved model provider is configured.
- Do not deploy or send live communications as part of local implementation validation.
