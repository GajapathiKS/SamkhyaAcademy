# Implementation Gaps

This document records remaining work after the handoff completion pass. It is intentionally strict so the repository is not represented as production-ready where provider or UI work remains.

## Release blockers

1. **Dependency security upgrade.** `npm audit --omit=dev` reports 6 high, 6 moderate and 1 low advisories. Next.js 15.5.25 resolves the current Next/PostCSS chain, but the installed Payload release constrains Next to 15.4.x. Upgrade Payload and Next together, retest import-map/admin behavior, and update Sharp before public production release.
2. **Production secrets and providers.** Real Razorpay, email, WhatsApp, object-storage domain and AI-provider credentials are intentionally absent. Complete provider review, secret rotation, webhook URL registration and go-live authorization before enabling external side effects.

## Context-dependent acceptance states

- Webinar registration confirmation requires a scheduled active webinar.
- CRM lead detail requires a created lead; the pipeline/list and follow-up infrastructure are implemented.
- Razorpay handoff and payment-success UI are implemented; real conversion still requires a signed test-provider return event.
- Communications are consent/suppression aware but remain console mode.

## Quality follow-ups

- Split the Payload route into a chrome-free admin root layout.
- Expand Playwright coverage from the current public/consent smoke suite to authenticated free, preview, paid, organization, Venture request-changes, CRM and webhook journeys.
- Add automated pixel-difference baselines after stakeholders approve the reference-locked landscape brochures and regenerated 52-screen capture set.
- Add PDF link annotations/QR destinations when the final production domain is confirmed.
- Replace demonstration prices and schedules through CMS before launch.

## Completed but intentionally non-production

- FastAPI is provider-independent and exposes healthy human-review stubs.
- Razorpay logic is test-mode only.
- Demo users use a documented local-only password and must never be carried into production data.
- The legacy SAP migration archives and unpublishes; it does not destructively delete enrollment, payment, certificate or audit history.
