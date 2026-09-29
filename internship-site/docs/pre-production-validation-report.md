## 14 September 2026 — verified program enquiry production update

Program Apps Script is now deployed as version 4 under the official academy account. PROTOTYPE_MODE=false; public website configuration customFormPrototype=false. Three fictional saves were matched to the private spreadsheet, covering all six program categories and the website popup/resize bridge. Required mobile and consent checks passed; all QA records were then labelled Prototype in source and Pipeline for sample exclusion. Public sample notices were removed from the rendered website. Build, link, SEO, Astro and mocked backend/CRM checks pass. See the private integrations/google-apps-script/PRODUCTION-HANDOVER.md for references and deployment evidence (exclude from public uploads).

This supersedes earlier sample-intake blockers only. Venture intake, private operations portal deployment, final factual/legal approval flags, indexing release and hosted main-domain acceptance remain separate. No GoDaddy upload performed. Chrome embedded form verified; in-app nested Google embed needed the direct-link fallback.

# SamkhyaAcademy pre-production validation

**2026-09-14 status: NOT READY for production release. Live enquiry transition and verification are now owned by the task “Build Samkya AI internship site”. No deployment was performed by this validation task.**

The September 12 evidence below is historical and does not certify subsequent edits. Public enquiries have since been restored in sample mode. Owner-provided contacts are now contact@samkhyaacademy.com and +91 9739399900; samkhyaacademy.com is confirmed. Completion certificate promotion is owner-approved and must not be removed based on the older audit. Policy, privacy, organization and indexing approvals remain unconfirmed. Venture intake has no endpoint and its page honestly states that online submissions are unavailable.

On September 14, Git still showed the application as pre-existing untracked content. This task preserved other changes, corrected the obsolete unconditional “intake disabled” launch-check error, and retained the actual release gates. Google account access initially failed with a personal account; the user subsequently reported completing official-account sign-in. Before verification, the originating task explicitly took ownership of Google deployment and live browser tests. No remote mutation or intake configuration change was made here. Do not use the older package or browser matrix as evidence for the final live service; append the new task's deployment and saved-row results before release.

## Historical September 12 platform handover

### September 14 local revalidation (before live transition)

| Requirement | Result | Evidence / remaining action |
|---|---|---|
| Build/type safety | Pass | `npm run check`: 96 files, zero errors/warnings/hints. `npm run build`: 40 static pages. |
| Internal routes/assets | Pass | `npm run verify`: 35 canonical pages plus 404, 1,762 internal asset/link targets. |
| Form server logic | Pass in mocks only | `npm run test:enquiry`: required mobile and consent, all program categories, CAPTCHA fail closed, contact/global limits, duplicate-safe retries and separate venture save path. Live Google saved-row evidence remains with the deployment task. |
| SEO/social artifacts | Pass | `npm run test:seo`: unique metadata, canonicals, JSON-LD, 1200×630 JPEG/WebP images, legacy noindex and environment protections. |
| Release gates | Blocked as expected | `npm run launch:check` exits 1: prototype mode, organization/privacy/indexing/policies approval, business identity/contact handling details and venture activation remain unresolved. Domain and supplied public contacts pass. |
| Current browser/responsive/accessibility/live forms | Pending | No fresh full browser matrix performed here; ownership transferred to the deployment task. Historical matrix below is not current live-form proof. |

The originating task subsequently confirmed the official Academy Google account is accessible. Account access is resolved; deployment and end-to-end acceptance remain pending that task's results.

The website can be prepared and handed over without waiting for future instructors, brochures, operational schedules or program proof. Public enquiry collection remains disabled until the customer connects its service. The original production-launch audit below is retained for traceability; its operational/legal items are not all blockers to platform delivery.

## Latest revision validation

Astro check: zero diagnostics. Production and staging builds, static verification and SEO tests passed. Targeted browser checks cover 11 affected routes at 320px and 1366px: **22 checks, zero accessibility violations or overflow** (`validation/content-revision.json`). The staging archive includes only generated public output, has noindex protection, and includes the revised Full Stack content. Its SHA-256 is recorded in `validation/content-package.json`. This revision has **not been uploaded**.

`launch:check` remains a check for an operational public intake launch; it is not the acceptance gate for static platform handover.

## Updated delivery decisions

The user clarified the scope after the original audit: make the platform attractive and ready, let the customer own teaching operations and integrations, and ask only for facts we cannot supply.

- Full-Stack Development is one multi-path program: MEAN, MERN, Angular, React, Python, .NET and Java. Overview, curriculum, project examples, preparation and FAQ now reflect that decision; no separate course proliferation is needed.
- Space copy is aspirational and focused on useful educational work. Future instructor sourcing and supporting brochures are operational follow-ups, not engineering blockers. No ISRO affiliation or named instructor is asserted from a hypothetical example.
- Mentor photos, staffing, proof material, fees and batch schedules are optional content additions when available. We can prepare hosting output without them.
- Customer facts are consolidated in `customer-input-questionnaire.md`. Enquiry integration and final policies belong to the customer/team handling collection.
- The user confirmed `samkhyaacademy.com` and authorized staging publication at `test.samkhyaacademy.com`. The existing task “Build Samkya AI internship site” confirmed its current scope is private CRM only. This task prepared the staging upload; browser-control initialization failed, so publication has not been performed.
- The browser matrix below records the earlier comprehensive UI audit; this content revision has separate build and targeted browser evidence in `validation/content-revision.json`.

## Scope and baseline

- Requirement source: the complete owner-supplied `SamkhyaAcademy_Codex_PreProduction_Handoff(1).md` in Downloads, including all P0/P1 criteria and the final response format.
- Date: 12 September 2026, Asia/Calcutta.
- Git repository: `github-publication`, baseline commit `5544d32` (tracked tree clean). The entire existing `internship-site/` directory was already untracked. No commit, push, reset, deployment, credential change or external message was made.
- Actual target: the standalone Astro marketing application in `github-publication/internship-site`, matching the rendered staging website. The older `source/` platform, public GitHub Pages `docs/` export and separate clean-handoff copy were preserved.
- Framework/runtime: Astro 7.3.2, Node 24.13.0, static output for Apache/cPanel. No application API runs in the website. The separate Apps Script integration remains outside the public build.
- Baseline source check, production build, enquiry mocks, CRM mocks and SEO tests passed. Nevertheless, browser inspection of staging confirmed contact placeholders, public policy approval notes, and preview-only intake. Passing older tests did not meet the new acceptance criteria.
- Source backups and baseline hashes are retained privately under `artifacts/preproduction-baseline/`. Final source hashes and changed-file evidence are under `docs/validation/`. This report is outside `public/` and is not included in the site output.

## Requirement traceability

“Pass” below applies only to the stated evidence. “Blocked” means the acceptance criteria are not fully satisfied, even where safe engineering work is complete.

| ID | Requirement | Status | Evidence | Remaining action |
|---|---|---|---|---|
| P0.1 | Verified contacts/entity/parent link | **Blocked** | ContactLinks omits empty contacts; contact and About placeholder prose removed. Public-source/output scans pass. Empty owner fields remain in `site.config.mjs`. | Supply verified email, phone, WhatsApp, address, exact entity/relationship wording and parent URL. Contact-link operation and consistency cannot pass with missing values. Historical private engineering records are preserved, so a literal whole-repository absence claim is not made. |
| P0.2 | Remove public internal language | **Pass for prepared output** | `test-preproduction.mjs` scans 70 production/staging canonical pages. Preview form output replaced with a non-collecting page; draft/version/approval notices removed from public policies and FAQ. | Existing live staging remains unchanged until a separately authorized upload. Legitimate curriculum uses of “prototype” and “draft” are retained; private historical integration records are not customer copy. |
| P0.3 | Truthful operational enquiries | **Blocked; safe disabled state passes** | Shared `SiteLink.astro` renders intake destinations as disabled text. Program and venture routes contain no forms, inputs or iframes; the direct `/forms/internship-enquiry/` URL also collects nothing. No saved/success claims remain. Browser/static tests verify no active intake links. | Approve handling, restore the approved integration, verify real CAPTCHA, save destination, reference/acknowledgement and failure paths. No live submission or matching destination row was verified in this task. |
| P0.4 | Approved Privacy and Terms | **Blocked** | Public approval notes and speculative 90-day retention/processor claims removed. Privacy describes only the current non-collecting pages and sharing controls. Existing necessary advisory limitations retained; footer links remain. | Owner/legal must provide complete approved policies. Current limited website information is not a finalized privacy policy or legal approval. See decision table below. |
| P0.5 | Environment-aware indexing | **Pass engineering; release gate remains** | Staging noindex meta, disallow-all robots and empty sitemap; host-conditioned X-Robots-Tag in `.htaccess`; staging build adds response-wide protection. Production URLs use the production origin. `indexingApproved` is independent of staging. Four robots configurations tested. Existing live staging returns noindex headers and meta. | Confirm hostname and approve indexing after other release gates. Production remains deliberately noindex until then. Verify real production Apache headers/redirects after approved deployment. |
| P0.6 | SEO/social metadata and 1200×630 image | **Pass locally; public release validation blocked** | Unique server-rendered titles/descriptions/canonicals/OG/Twitter values on all 35 canonical routes; 1200×630 JPEG plus WebP images. Generation now targets the correct build directory. Original logo mark and parent-initiative line added. Local HTTP MIME checks and visual review recorded. | Approve card content/design and validate new publicly hosted cards on actual sharing clients after a permitted upload. Existing staging cards are reachable, but are older assets; no claim is made that the changed assets are already public or that platform caches were refreshed. |
| P0.7 | Brand/logo gate | **Owner follow-up; not a platform blocker** | Original linked-chain mark remains in header/footer/favicon and share images. Apple touch icon added from the same SVG. Logo is labelled/accessibly linked; no clearance claim added. | Owner/legal trademark clearance, commercial-use terms and cleaned vector/print masters. No legal clearance can be established by this code change. |
| P1.1 | Clear audience pathways | **Implemented; owner usability review pending** | New `AudiencePaths.astro`: Learn (students/engineers), Lead (decision-makers), Build (college teams/founders), with direct links and no extra navigation depth. | Owner/user testing before launch; no user-study claim is made. |
| P1.2 | Shorter homepage | **Pass engineering** | Removed repeated seven-direction evidence grid while preserving detailed program pages and the adjacent practical-learning narrative. Main-content word count fell from 1,189 to 786 (33.9%); `homepage-copy.json`. | Owner editorial approval before launch. |
| P1.3 | Responsive comparison | **Partially implemented** | `ProgramComparison.astro` uses existing audiences and planned outputs for all seven offerings; caption, row/column headers and keyboard-focusable horizontal-scroll region. | Starting level, format and availability columns require verified facts. Omitted rather than displaying “Confirm” or invented values. |
| P1.4 | Availability/buying facts | **Optional operational content** | Unsupported homepage upcoming/current labels replaced by learning-path labels; initial internship identified as flagship per handoff. Existing curriculum facts preserved. | Confirm fees/range or explicit enquiry-only pricing decision; batch, mode, timing, seats, eligibility, certificate, duration and mentor format, and availability for each program. Existing 16-week/12–15-hour figures still need owner reconfirmation. |
| P1.5 | Mentors/parent trust | **Optional profiles; parent URL is a customer input** | Existing “A Samkhya Technologies Initiative” relationship retained; configuration fields prepared for owner data. | Approved practitioner profiles/photos/links and experience statements; verified parent URL and legal relationship. No guessed URL, staff, credentials or metrics added. |
| P1.6 | Authentic imagery | **Partially implemented** | Concise “Illustrative imagery” labels replace repeated generated-image captions. Hero illustration is now visibly labelled. Original imagery/alt descriptions retained. | Supply 4–6 authentic photographs with permission and accurate captions; none invented or represented as real academy participants. |
| P1.7 | Consistent context-aware CTAs | **Partially implemented; intake blocked** | Central server-rendered guard disables every enquiry/venture destination, including dynamic catalogue/header links. Original query selections remain in source. | When real intake is connected, implement and test intent-specific labels and all program/audience preselection through final save. Current disabled labels intentionally do not invite submission. |
| P1.8 | Program positioning | **Safe elements preserved; other facts blocked** | Internship remains flagship; FDE enterprise depth preserved; leadership pathway uses suggested customer-facing wording; comparison names Startup Advisory. Full Stack source/FAQ now covers **MEAN and MERN**, plus Python/.NET/Java paths, as explicitly directed by the user. Space remains educational demonstrators; venture investment/selection/scope protections retained. | The academy owns path selection and teaching operations. Add verified people, affiliations or facilities only when supplied; their absence does not block the current Space learning page. |
| P1.9 | Concentrate disclaimers | **Partially implemented** | Removed repetitive homepage evidence block and shortened illustration labels. Necessary venture, educational-demonstrator and no-guarantee limitations remain in program/legal content. | Owner/legal review remaining repetition after approved policies; no broad rewrite or removal of necessary limitations. |

## Executed validation

| Check | Result / scope |
|---|---|
| `npm run check` | Pass: 0 errors, warnings or hints. Serves as Astro/TypeScript/template check. No separate lint command exists. |
| `npm run build` | Pass: production-mode static build, 40 HTML pages plus robots/sitemap; unique cards generated after HTML. This is a build, not a deployment. |
| `npm run verify` | Pass: 35 canonical pages + 404; 1,611 internal asset/link references; responsive image files, dimensions, anchors, private-syllabus exclusion and equivalent program-section navigation. |
| `npm run test:seo` | Pass: unique metadata, canonical/JSON-LD identity, JPEG/WebP dimensions, legacy noindex and protected robots/sitemap. |
| `npm run build:test` | Pass: separate `dist-test` origin, generated social files, static verification and staging headers. |
| `node scripts/test-preproduction.mjs` | Pass: both environments, 70 canonical pages, public leakage checks, no active intake, no production test-host references, no source maps/private server source, and four indexing combinations. |
| `npm run test:enquiry` | Pass with Google services mocked: validation, consent/policy versions, CAPTCHA rejection/hostname/expiry, save errors, duplicate-safe retries, payload binding, limits and secret exclusion. **Not live end-to-end proof.** |
| `npm run test:crm` | Pass mocked CRM/Sheets adapter: reconciliation, repeat handling, source-column preservation and disabled destructive retention. Not evidence that proposed retention is operating. |
| `npm audit` | Pass: zero vulnerabilities across the full audited dependency set; `validation/dependency-audit.json`. |
| `npm run launch:check` | **Expected failure**: missing owner inputs and intentionally disabled public integration. Changing booleans alone cannot activate the prepared site. |
| Browser suite | Chrome route/viewport/axe matrix, Edge route smoke, keyboard and reflow results saved separately below. Final result: **200/200 Chrome route/viewport checks pass; 72 axe scans with zero violations; 40/40 Edge route checks pass; 14/14 keyboard/offline/reflow checks pass**. A subsequent disabled-menu text-color adjustment is covered by `final-menu-check.json` (foreground rgb(82,97,123) on rgb(237,240,246), expanded state true, no overflow), a fresh screenshot and the final production/static rebuild. |

The initial browser matrix identified only contrast violations (no page overflow, broken images, enabled intake links or uncaught page errors). Supporting text colors, project labels and navy-panel text received targeted fixes; the final matrix supersedes `browser-before-contrast-fix.json`.

### Browser evidence and limits

- Reproducible suite: `scripts/validate-browser.mjs`. Local static production output served at `http://127.0.0.1:4325` using `python -m http.server 4325 --bind 127.0.0.1 --directory dist`.
- Chrome 152.0.7977.83: all 35 canonical routes, four legacy fallback routes and `/404.html`, at 320×900, 667×375, 768×900, 1366×900 and 1920×900. axe-core 4.11.2 runs WCAG A/AA tags at 320 and 1366 for canonical routes and 404.
- Edge 152.0.4191.66: all 40 route smoke checks. No Safari/iOS or Firefox installation was available; those tests are **not performed**.
- Playwright 1.62.1 and axe were reused from installed workspace tools, using `PLAYWRIGHT_MODULE` and `AXE_SCRIPT`; no new runtime dependencies were added.
- Keyboard: first Tab/skip-to-main; mobile menu Enter, Tab, Escape/focus return; FAQ native disclosure Enter/Space; comparison keyboard focus. Native details/summary supplies disclosure semantics; mobile summary also reflects `aria-expanded`.
- Reflow: 683px viewport provides the 200%-zoom-equivalent layout of a 1366px desktop, checked on home/catalogue/contact/enquiry. This is not a manual physical-device zoom or screen-reader certification.
- Reading order and landmarks checked through rendered accessibility trees/axe. Actual assistive-technology testing remains a manual release check. axe “incomplete” records, including image-background contrast requiring human judgment, are retained rather than described as a complete WCAG conformance audit.
- Screenshots: `validation/home-mobile-viewport.png`, `validation/home-320.png`, `validation/home-1366.png`, and route-specific catalogue, internship, FDE, contact, enquiry, privacy and venture screenshots. Program overview sections and comparison retain the approved visual layout.
- Live staging HTTP checks: `validation/live-staging-http.json`. Home/robots/sitemap and two existing JPEG cards return 200; cards use `image/jpeg`; no redirects/authentication needed. A nonexistent URL returns 404. These are observations of the unchanged live site.
- Read-only live staging redirects also passed: HTTP to HTTPS, slashless `/programs` to `/programs/`, and `/internship/` to its canonical program route (`validation/live-redirects.json`).
- Local Python hosting does not execute Apache `.htaccess`. The generated useful 404 page was browser-tested directly, and legacy fallback destinations were verified. Production/custom-404 wiring, HTTP→HTTPS, www/non-www and Apache 301 behavior must be checked on the actual hosting configuration. No server-error fault was induced on live hosting.

### Forms and data boundaries

Current flow: **browser → static information page → no collection**. Program and venture intake links are non-interactive, and the old direct public form path has no submission controls or scripts. Offline inspection confirms no controls that could imply a successful save. There are no public loading/success/duplicate/network-error states to exercise while collection is disabled.

Prepared historical integration: browser/Apps Script HTML → reCAPTCHA verification → Apps Script validation/rate limits → Sheet save → reference/acknowledgement. Source and mock tests support that design, but this task did not observe a current approved destination, access ownership, notification, retention/deletion behavior or real receipt. Slow network, interruption, timeout, duplicate click, server error and bot challenge must be repeated against the approved live form after connection. No personal data was submitted, no notification was sent and no CRM record was changed.

### SEO, social, performance and resilience

- Canonical/OG origins are build-specific; production HTML does not contain the test hostname. Until release approval both builds remain noindex with empty sitemaps. Once approved, production robots can allow indexing while staging remains blocked. Course schema is withheld until organization verification; no unsupported prices, ratings or schedules were added to structured data.
- All card files are 1200×630 JPEG, with optional WebP copies. Representative absolute production URL: `https://samkhyaacademy.com/images/social/academy.jpg`; program card example: `https://samkhyaacademy.com/images/social/programs-forward-deployment-engineer.jpg`. These describe prepared output, not a claim that this revision is publicly deployed.
- `social-http.json` records local JPEG HTTP/MIME responses. Homepage and leadership cards were visually inspected for legibility/crop; actual WhatsApp, LinkedIn, Teams, Facebook and X cache/client rendering remains unverified pending public availability and owner approval.
- Original responsive AVIF/WebP image sets, width/height attributes, lazy loading and eager/high-priority hero handling remain. Fonts are self-hosted with fallbacks. Static verifier checks images against the existing 250 KiB budget; no external font or analytics service was introduced.
- `.htaccess` retains nosniff/referrer controls and adds Permissions-Policy, SAMEORIGIN framing and staging-host indexing protection. Actual host application of newly added headers is unverified because nothing was deployed. A restrictive CSP was not guessed for the complex existing inline-script site.
- No `.env`, `.gs` or source-map files occur in generated output. Public integration URLs are not secrets; private credentials were not inspected or copied into evidence. Dependency audit is a point-in-time check, not a guarantee of future safety.
- Local-browser timing is not production performance evidence. No Lighthouse/field Core Web Vitals score, physical-device layout shift guarantee or load/quotas test is claimed.

## Blocked owner decisions and follow-up

The table preserves the original audit categories. For the current delivery scope, use the customer questionnaire: contacts/entity and collection-policy facts are customer inputs; staffing, proof, photography, detailed curricula and commercial scheduling are operational follow-ups without a platform-delivery deadline.

| Required exact input / approval | Severity | Owner / needed for |
|---|---|---|
| Verified public academy email; phone and WhatsApp with country codes; business address; approved map link if wanted | P0 | Academy owner — contact/footer/policies/schema and working contact routes |
| Exact operating/legal entity and approved academy–parent relationship wording; verified Samkhya Technologies URL | P0 | Owner/legal — trust and controller identity; do not assume “Pvt. Ltd.” |
| Approved complete Privacy and Terms: controller, purpose/fields, lawful/consent basis, processors, hosting/access, retention determination, deletion/correction process, verified privacy contact, cookies/analytics/CAPTCHA, children/student handling, real effective date, updates, jurisdiction/governing law and applicable payment/refund/disclaimer terms | P0 | Owner/legal — replace limited current information before enabling collection |
| Approved actual enquiry and venture destinations, access owner, production/sample decision, retention/deletion handling, acknowledgements and notifications; credentials only through approved private setup | P0 | Owner + integration engineer — restore intake and demonstrate a matching saved test reference |
| Final production hostname/canonical/www strategy, hosting rule confirmation and indexing approval; Search Console ownership | P0/SEO | Owner + hosting administrator |
| Approved social-card design/copy and permission to publish/test the prepared cards | P0 | Owner + release engineer — actual sharing-client previews |
| Trademark clearance for handoff name variants; applicable AI-service commercial-use terms; designer-cleaned vector/mono/horizontal/vertical/favicon/spacing/print/color masters; professional advice on word/device filings and applicable classes | P0 external | Owner/legal/designer — major promotion, printing and certificate rollout remain external gates |
| Every program’s real availability; internship fee/range or explicit enquiry-only decision, batch, delivery mode, timing, seats, eligibility, certificate, duration/effort and mentor format | P1 | Program owner — accurate buying facts and complete comparison |
| Full Stack multi-path positioning | Resolved by user | MEAN/MERN and other backend paths are now included within one program; teaching operations select the project path |
| Approved mentor names/titles/experience/specialties/profile links/photos and 4–6 authentic photos with consents | P1 | Academy/content owner — practitioner and image trust |
| Space program named credentials, actual lab capability/partners and demonstrator/simulation evidence | P1 | Space program owner — proof before stronger promotion |
| User review of Learn/Lead/Build, homepage reduction, comparison and remaining disclaimers; final intent-specific enquiry labels after activation | P1 | Product/content owner — no unrequested redesign or invented availability |

## Route-by-route final results

Each Chrome row covers all five widths. “Axe pass” means zero violations in the two configured scans, not a complete manual accessibility certification. Metadata/canonical checks apply to the expected canonical or legacy destination.

| Route | Chrome responsive / assets / H1 | axe | Edge |
|---|---|---|---|
| `/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/about/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/enquire/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/privacy/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/terms/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/contact/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/faqs/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/venture-studio/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/venture-studio/journey/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/venture-studio/submit/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/ai-engineering-internship/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/ai-engineering-internship/curriculum/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/ai-engineering-internship/projects/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/ai-engineering-internship/career-preparation/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/forward-deployment-engineer/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/forward-deployment-engineer/curriculum/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/forward-deployment-engineer/projects/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/forward-deployment-engineer/career-preparation/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/space-technology/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/space-technology/curriculum/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/space-technology/projects/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/space-technology/career-preparation/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/machine-learning/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/machine-learning/curriculum/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/machine-learning/projects/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/machine-learning/career-preparation/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/full-stack-development/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/full-stack-development/curriculum/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/full-stack-development/projects/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/full-stack-development/career-preparation/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/fde-for-leaders/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/fde-for-leaders/curriculum/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/fde-for-leaders/projects/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/programs/fde-for-leaders/career-preparation/` | Pass (5 widths) | Pass (2 scans) | Pass |
| `/internship/` | Pass (5 widths) | Not scanned (legacy fallback) | Pass |
| `/curriculum/` | Pass (5 widths) | Not scanned (legacy fallback) | Pass |
| `/projects/` | Pass (5 widths) | Not scanned (legacy fallback) | Pass |
| `/career-preparation/` | Pass (5 widths) | Not scanned (legacy fallback) | Pass |
| `/404.html` | Pass (5 widths) | Pass (2 scans) | Pass |

## Files changed by purpose

- **Public truthfulness and safe intake:** `site.config.mjs`, `SiteLink`, `ContactLinks`, enquiry/contact/privacy/terms/FAQ/venture pages, and shared components/layouts that route intake links through the guard. Existing integration source is preserved; `prepare-enquiry.mjs` now publishes only the non-collecting fallback.
- **Information architecture and content:** `AudiencePaths`, `ProgramComparison`, homepage/catalogue, illustration captions and small About/FAQ copy corrections.
- **SEO and release protection:** Layout/SEO/robots/sitemap, `.htaccess`, social-image preparation, staging build, launch check and Apple touch icon; regenerated JPEG/WebP cards in both outputs.
- **Accessibility:** menu focus/Escape/expanded state, focus/reduced-motion styles, contrast corrections in existing shared/scoped styles and project labels.
- **Verification and handoff:** static/SEO/pre-production/browser tests, TypeScript build-output exclusions, README status, this report and JSON/text/screenshot evidence.

See `validation/changed-files.json` for the exact source list and `validation/source-sha256.json` for source/lock/config identity. Generated output is intentionally not committed. Git’s tracked diff remains empty because this marketing directory was already untracked; the private baseline comparison supplies the file-change evidence.

## Exact next action

Send the concise customer questionnaire for contact/entity and enquiry-handover inputs. Complete hosting handover against the agreed destination. The customer’s integration team can activate enquiries and confirm its policies independently of staffing, brochures and program operations. The staging package is `artifacts/samkhya-test-upload.zip`, validated and ready for the confirmed test document root in `STAGING.md`. Upload is pending because browser control fails to initialize (OS error 3), including after a reset. No production deployment is authorized or performed.
