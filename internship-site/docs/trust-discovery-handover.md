# Trust and discovery review

## Delivered locally

Six course overview pages share a five-step learning journey. Curriculum, project and preparation pages are unchanged by that addition. Venture Launchpad retains its separate advisory workflow. Full-Stack technology paths and Space positioning are preserved.

The footer now describes the academy in natural language and keeps the existing program, support, contact and policy destinations. No keyword lists, city targeting, ranking claims or invented contacts were added.

Certificate artwork: src/assets/certificate-sample.svg. Local review: artifacts/trust-review/index.html. The sample uses fictional learner Alex Example, an unmistakable SAMPLE—NOT VALID watermark, no issue date or signature, and no accreditation claims. It is artwork only, not a credential.

The reusable CompletionRecognition component is attached to program overviews but controlled by src/data/completionRecognition.ts (published: false). The sample is imported as raw markup only inside the disabled branch, not copied into public assets. There is no public certificate route, issuance action, learner register or verification endpoint. Before enabling it, obtain and record owner approval for eligible programs, review criteria, final wording, signatory and artwork. Review each program’s eligibility before changing the shared gate.

## Release checklist — unchanged gates

Current site.config.mjs values remain indexingApproved: false, enquiriesEnabled: false and ventureIntakeEnabled: false. This design review does not enable any of them.

At a separately approved release: confirm the production domain, verified academy contacts and policies; connect and test the appropriate client-owned form destinations; validate consent, required fields, server-confirmed saves and failure handling; then enable approved intake. Confirm production canonicals, sitemap, robots and metadata before enabling production indexing and submitting the sitemap in Google Search Console. Keep staging noindex. Rebuild and verify after every release-gate change.

No hosting upload or private CRM changes are part of this delivery.

## Validation completed

Build and Astro check pass (95 files; zero diagnostics). Static verification passes for 35 content pages plus 404 and 1,611 internal asset/link targets. SEO checks pass for unique titles/descriptions, canonicals, JSON-LD, social previews and retained noindex/sitemap controls. All six overview pages pass at 320, 390, 768 and 1440 px with five steps and no horizontal overflow. Footer Tab navigation retains a visible focus outline. Journey/footer screenshots and certificate artwork were visually reviewed; the Venture overview has no shared course journey. No certificate artwork or fictional learner appears in generated public output.

Preview: http://127.0.0.1:4398/programs/ai-engineering-internship/

## Owner-authorised update

The user authorised displaying the redesigned illustrative certificate on course overview pages. CompletionRecognition is now enabled with each program title and a keyboard-accessible enlarged view. The artwork uses the exact website mark and wordmark with a small “Illustrative certificate only” footer. No certificate is issued, no signatures are fabricated and no verification service is introduced. Earlier notes about the sample being excluded from public build output are superseded. Hosting publication remains out of scope.
