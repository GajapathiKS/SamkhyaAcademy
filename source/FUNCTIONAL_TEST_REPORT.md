# Functional Test Report

Verification date: 2 September 2026  
Runtime contract: Node 20 LTS for migration/seed/runtime; PostgreSQL 16, Redis 7, MinIO, FastAPI.

## Acceptance summary

| Check | Result | Evidence |
|---|---|---|
| Clean LMS database migration | PASS | Empty `lms` schema migrated with `20260902_initial_brd_baseline` under Node 20. |
| Prisma generation and schema validation | PASS | Prisma Client 6.19.3 generated; TypeScript validation passes. |
| LMS seed | PASS | 11 active courses, complete canonical modules/lessons, demo identities, organization, enrollments, Venture workspace, mentor assignment and private offer. |
| CMS seed and publish projection | PASS | One internal CMS admin, 2 faculty profiles and 11 courses; canonical CMS modules/lessons publish to immutable runtime versions and checksummed projections. |
| SAP retirement | PASS | Standalone offer absent from canonical/public content; migration archives legacy record and deletes only its public projection. Historical relations are not deleted. |
| Production web build | PASS | `next build` completes with 25 static-generation steps and all application routes emitted as dynamic server routes. |
| Unit/integration checks | PASS | Vitest: 2 files, 7 tests. Catalog enums/SAP, Venture transitions/readiness and Razorpay HMAC are covered. |
| Browser checks | PASS | Playwright: 4/4 across desktop Chromium and Pixel 7 profiles. Public discovery and brochure consent gate are covered. |
| PDF checks | PASS | Eight PDFs, four landscape pages each in the approved source ratios; readable PDF signature, searchable text, populated titles, no standalone SAP string. |
| FastAPI boundary | PASS | Container starts and `/health` returns `{status: ok, service: ai-api, version: 0.2.0}`. |
| Production Compose parse | PASS | `docker compose ... config --quiet` passes using `.env.production.example` via `PRODUCTION_ENV_FILE`; no live credentials were created. |

## Important scope notes

- Communications remain console/provider-stub mode, and Razorpay remains a test-mode boundary. No live messages or payments were sent.
- The browser suite is a focused acceptance smoke suite, not exhaustive coverage of every API branch. The regenerated 52-state capture provides broader route/context evidence in `docs/ux/generated`; 50 states are directly usable and 2 require live transactional context.
- `npm audit --omit=dev` reports 13 transitive/direct advisories: 1 low, 6 moderate and 6 high. The Next.js fix requires 15.5.x, which conflicts with the currently installed Payload peer range. This is a production-release blocker pending a coordinated Payload/Next upgrade; no forced dependency downgrade was applied.

## Commands verified

```text
npm test
npm run test:e2e
npm run brochures:qa
npx tsc -p apps/web/tsconfig.json --noEmit
npm run build
docker compose up -d postgres redis minio ai-api
docker compose --env-file .env.production.example -f docker-compose.production.yml config --quiet
```
