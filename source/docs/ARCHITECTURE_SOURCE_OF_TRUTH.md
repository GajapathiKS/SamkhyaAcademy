# SamkhyaAcademy Architecture - Codex Source of Truth

Authoritative architecture document: `SamkhyaAcademy_Technical_Architecture_CMS_CQRS.docx` / `.pdf`.

## Preserve these boundaries
- Next.js/TypeScript: product UI + server routes.
- Payload CMS: internal authoring only.
- Prisma/PostgreSQL: authoritative LMS, org, progress, exams, certificates, CRM, offers/payments, Venture Builder runtime.
- CQRS/versioned course publishing: draft CMS -> immutable learner projection.
- FastAPI: AI services only; do not become a second transactional LMS ORM.
- Redis: cache/jobs; non-authoritative.
- MinIO local / S3 production behind S3-compatible storage abstraction.
- Razorpay, SES, WhatsApp adapters behind service boundaries.
- Initial deployment: Docker on AWS Lightsail 4 GB + external object storage.
