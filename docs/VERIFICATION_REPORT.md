# UX verification — 5 September 2026

## Delivered

- 183 working HTML routes and 183 freshly rendered PNGs, including a learning-format/certification hub, direct brochure downloads and Venture/investor continuation states.
- Searchable gallery, actual navigation hotspots with coordinates, design brief, reference comparisons and responsive samples in one folder.
- Source content uses the typed course catalog and consolidated BRD. Original implementation and previous review exports are preserved.
- This deliverable is an interactive front-end customer prototype, not a claim that the LMS backend or external integrations are complete.

## Measured checks

| Check | Result |
|---|---|
| Desktop captures at 1440px | 183 |
| Main-content text below 11px | 0 affected screens |
| Horizontal page overflow | 0 affected screens |
| Broken images | 0 affected screens |
| Browser runtime errors | 0 affected screens |
| Functional/reflow checks | 88 passed; 0 failed |
| Total desktop PNG size | 51.3 MB |

Local Poppins files are bundled. Source-level typography is 13px body, 11px metadata and 26–40px major headings. Full-page screenshots contain actual scrolling content; thumbnails are not a suitable way to judge text legibility.

## Interaction results

| Scenario | Result |
|---|---|
| Catalog search, access filtering and reset | PASS |
| No-results recovery | PASS |
| Course curriculum expands and links to a lesson | PASS |
| HTML editor updates sandboxed preview and exports code | PASS |
| Notes survive page reload | PASS |
| Discussion post is rendered safely | PASS |
| Practice error, correction and continuation | PASS |
| SVG graph step, previous and reset | PASS |
| Linked-list insertion, removal and reset | PASS |
| All six idea intake steps connect and submit | PASS |
| Intake validates required fields | PASS |
| Independent setting approval and publish receipt | PASS |
| Content Admin has no publishing button | PASS |
| Mentor approval unlocks next stage | PASS |
| Brochure gate validates and keeps consents optional | PASS |
| Payment failure and retry are connected | PASS |
| Organization invitation preview and acceptance | PASS |
| Operational table search, sort and export | PASS |
| No broken internal prototype links | PASS |
| Mobile reflow screen 1 | PASS |
| Mobile reflow screen 2 | PASS |
| Mobile reflow screen 7 | PASS |
| Mobile reflow screen 10 | PASS |
| Mobile reflow screen 25 | PASS |
| Mobile reflow screen 40 | PASS |
| Mobile reflow screen 54 | PASS |
| Mobile reflow screen 91 | PASS |
| Mobile reflow screen 95 | PASS |
| Top navigation opens, closes with Escape, and reaches idea intake | PASS |
| Idea review decision and requested-changes branch | PASS |
| Investor access request requires details and reaches pending review | PASS |
| Investor introduction is subject to founder decision | PASS |
| ai-engineering: correct course, optional consent, actual PDF download | PASS |
| ai-leadership: correct course, optional consent, actual PDF download | PASS |
| applied-ml-engineering: correct course, optional consent, actual PDF download | PASS |
| full-stack: correct course, optional consent, actual PDF download | PASS |
| data-analytics: correct course, optional consent, actual PDF download | PASS |
| cybersecurity: correct course, optional consent, actual PDF download | PASS |
| space-tech: correct course, optional consent, actual PDF download | PASS |
| entrepreneurship: correct course, optional consent, actual PDF download | PASS |
| c-programming-fundamentals: correct course, optional consent, actual PDF download | PASS |
| cpp-essentials: correct course, optional consent, actual PDF download | PASS |
| javascript-foundations: correct course, optional consent, actual PDF download | PASS |
| data-structures-algorithms: correct course, optional consent, actual PDF download | PASS |
| All course hero and roadmap assets load | PASS |
| Enriched mobile layout 1 | PASS |
| Enriched mobile layout 4 | PASS |
| Enriched mobile layout 6 | PASS |
| Enriched mobile layout 12 | PASS |
| Enriched mobile layout 43 | PASS |
| Enriched mobile layout 146 | PASS |
| Enriched mobile layout 147 | PASS |
| Enriched mobile layout 149 | PASS |
| Enriched mobile layout 152 | PASS |
| Enriched mobile layout 154 | PASS |
| Enriched mobile layout 158 | PASS |
| Enriched mobile layout 179 | PASS |
| Course outline preview stays in the selected course | PASS |
| Accepted idea starts at Stage 1 and has a review continuation | PASS |
| ../brochures/c-programming-fundamentals.pdf | PASS |
| ../brochures/cpp-essentials.pdf | PASS |
| ../brochures/javascript-foundations.pdf | PASS |
| ../brochures/data-structures-algorithms.pdf | PASS |
| ../brochures/ai-engineering.pdf | PASS |
| ../brochures/ai-leadership.pdf | PASS |
| ../brochures/applied-ml-engineering.pdf | PASS |
| ../brochures/full-stack.pdf | PASS |
| ../brochures/data-analytics.pdf | PASS |
| ../brochures/cybersecurity.pdf | PASS |
| ../brochures/space-tech.pdf | PASS |
| ../brochures/entrepreneurship.pdf | PASS |
| One-click all-brochures ZIP | PASS |
| Learning format and certificate examples accessible | PASS |
| Library and experience hub mobile reflow | PASS |
| Product homepage has no review directory | PASS |
| ai-engineering teaching example, knowledge check and mobile reflow | PASS |
| ai-leadership teaching example, knowledge check and mobile reflow | PASS |
| applied-ml-engineering teaching example, knowledge check and mobile reflow | PASS |
| full-stack teaching example, knowledge check and mobile reflow | PASS |
| data-analytics teaching example, knowledge check and mobile reflow | PASS |
| cybersecurity teaching example, knowledge check and mobile reflow | PASS |
| space-tech teaching example, knowledge check and mobile reflow | PASS |
| entrepreneurship teaching example, knowledge check and mobile reflow | PASS |
| c-programming-fundamentals teaching example, knowledge check and mobile reflow | PASS |
| cpp-essentials teaching example, knowledge check and mobile reflow | PASS |
| javascript-foundations teaching example, knowledge check and mobile reflow | PASS |
| data-structures-algorithms teaching example, knowledge check and mobile reflow | PASS |
| Separate handoff links and all 183 URLs | PASS |

## Visual review and remaining differences

The reference comparison page pairs nine governing masters with the new renderings. Representative homepage, catalog, video lesson, intake, Venture workflow, organization and publishing screens were visually inspected at desktop size. The first pass exposed invisible feature-card button labels, an incomplete catalog row, uneven curriculum row heights and mobile toolbar overflow; these were corrected.

The new pages use the supplied white/navy/violet visual language, serif brand treatment, Poppins product typography, outlined SVG icons, compact cards and contextual sidebars. The exact photographs, avatar portraits, some compositions and some reference ornamentation differ. These differences remain review items; the report does not assert 100% visual identity. No numeric visual-fidelity score has been fabricated.

The all-screen audit measures text size, image loading and overflow. It does not prove absence of every awkward gap or establish customer design approval. Check the full-size PNG or working HTML for each screen. Standard reading and grouping space remains intentional.

## Functional boundary

Working in-browser: routes, catalog filtering, list search/sort/column visibility/CSV export, expandable curriculum, HTML editing and sandboxed preview, code export/reset, notes, discussion posting, practice feedback, SVG graph steps, linked-list edits, form validation and locally saved drafts, all intake steps, demo invitations, mentor decisions and publishing transitions. Downloadable project ZIP contains actual starter files.

Prototype only: authentication/account creation, backend authorization, secure employee identity, database persistence, media streaming, native C/C++ compilation, production scoring and certificates, server-stored artifacts, real Razorpay processing and messages. Instructor video is a storyboard with responsive controls; no source video was supplied. Native code screens explicitly show a guided trace rather than claiming to compile edited code. Pricing, organizations, people, dates, progress and operational metrics are illustrative records. Publishing screens express the intended independent-review policy; they are not a security boundary.

Twelve six-page A4 brochures with new course-specific teaching samples are available directly from course pages and the brochure library without any form. A ZIP contains all twelve PDFs. Optional contact forms remain available as separate prototype examples. All 72 pages were rendered and inspected. PDF text, metadata, clipping, image loading and actual browser downloads were checked. Investor requests, founder decisions and admission reviews are local demonstration states, not connected production workflows. See CONTENT_DEPTH_UPDATE.md, CLIENT_HANDOFF.html and brochures/qa/PDF_QA.json. The homepage no longer contains a review directory. Full-course authoring and a comprehensive visual redesign remain unfinished; the added content is one teaching sample and assignment per program.

## Reproduce

Run `npx tsx scripts/ux-rebuild/prepare-visuals.ts` before the build; run `npx tsx scripts/ux-rebuild/brochures.ts` and `node scripts/ux-rebuild/pdf-qa.mjs` to regenerate and check PDFs. Run `node scripts/ux-rebuild/verify-enrichment.mjs` for the added journeys.

From the latest repository: run `npx tsx scripts/ux-rebuild/build.ts`, then `node scripts/ux-rebuild/serve.mjs`. Open https://gajapathiks.github.io/SamkhyaAcademy. Run `node scripts/ux-rebuild/verify.mjs`, `node scripts/ux-rebuild/capture.mjs`, and `node scripts/ux-rebuild/report.mjs` for verification and the review package. No database, production credentials or deployment are required.
