# Course imagery, brochure and Venture navigation enrichment
Date: 5 September 2026

## Review entry points
- All 182 screens: http://127.0.0.1:4310/
- Homepage: http://127.0.0.1:4310/pages/001.html
- Brochure library: http://127.0.0.1:4310/pages/158.html
- Venture and investor hub: http://127.0.0.1:4310/pages/146.html

## Design and content authority
The seven supplied Downloads PDFs were used as visual references only: cinematic technology imagery, dark technical palettes, warm executive/venture treatments, clear marketing hierarchy and diagrams. Original PDFs and approved UX masters were not altered.

Course text is drawn from packages/catalog/src/index.ts, the consolidated Functional BRD and recent platform consolidation. Both FDE brochures use the current engineering/leadership curriculum rather than the legacy reference text. Engineering covers readiness, AI engineering, agents/voice/multimodal, production AI, enterprise integration and solution architecture. Leadership covers AI reality, prioritization/funding, governance/operations and a 90-day blueprint. No standalone SAP offering or unsupported endorsements, placement guarantees or fabricated learner metrics were added.

## Delivered
- Twelve four-page A4 HTML-to-PDF brochures, with editable HTML, shared CSS, embedded text, SVG iconography and course roadmaps.
- Course-specific required Name/Email/Mobile gates, separate optional unchecked channel consent, receipt pages, open-PDF links and actual PDF downloads.
- Illustrated homepage tiles and course landing pages with program-specific hero artwork, outcomes, curriculum, project briefs, delivery information and brochure CTAs.
- Working top-navigation menus for course discovery, Venture Builder, idea submission, investor participation and the brochure library.
- Thirty-seven additional prototype states (146–182): investor/access/introduction flows, idea-review branches, course-specific brochure states and an accepted-idea Stage 1 continuation.
- Curriculum preview dialogs preserve the selected course context. Full Stack and DSA retain dedicated lesson/simulation demonstrations.
- Original SVG roadmap and DSA graph artwork. Three new bitmap illustrations generated using built-in image generation; exact prompts and provenance are in assets/course-visuals/IMAGE_PROMPTS.md.

## Verification
All 48 PDF pages were rendered to PNG and visually inspected. The final DSA and Venture curriculum pages were rechecked after layout changes. PDF QA checks A4 format, four-page count, searchable text, title metadata, missing images, page overflow and absence of standalone SAP marketing. PDF size is approximately 0.17–3.38 MB per brochure.

See VERIFICATION_REPORT.md for the final desktop and browser interaction results, enrichment-results.json for all added download/navigation scenarios, and brochures/qa/PDF_QA.json for per-file PDF checks. The full capture replaces screenshots at their existing numbered paths, preventing stale gallery thumbnails.

## Important boundaries
This remains a customer-review front-end prototype. It does not implement production authentication, server-side approval enforcement, investor verification, real contact sharing, production lead storage or communications. Local form entries and demo decisions use browser storage. Founder/private-asset restrictions are demonstrated UI states, not a deployed authorization system.

Brochures are customer-preview editions. Enrollment links point back to the local review prototype; confirmed commercial terms, cohort availability and production enrollment URLs are still required before public distribution. PDFs were integrated in the review package; production application assets and backend services were not switched over.

Reference matching is a design review, not a claim of pixel identity or customer approval. The new compositions and some illustrations intentionally differ while retaining the approved visual language.

## Reproduction
From the latest repository:
1. npx tsx scripts/ux-rebuild/prepare-visuals.ts
2. npx tsx scripts/ux-rebuild/build.ts
3. npx tsx scripts/ux-rebuild/brochures.ts
4. node scripts/ux-rebuild/pdf-qa.mjs
5. node scripts/ux-rebuild/serve.mjs
6. node scripts/ux-rebuild/verify.mjs
7. node scripts/ux-rebuild/verify-enrichment.mjs
8. node scripts/ux-rebuild/capture.mjs
9. node scripts/ux-rebuild/report.mjs

Keep this server running while using the review links. No production credentials are needed.

