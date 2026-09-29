# SamkhyaAcademy static website

> **Platform handover:** the website is prepared independently of customer staffing, brochures and batch operations. Full-Stack Development includes MEAN/MERN and alternative backend paths within one program. Public intake remains disabled for customer integration. See [customer inputs](docs/customer-input-questionnaire.md) and the [validation report](docs/pre-production-validation-report.md).


Standalone Astro static academy marketing site. The homepage uses the customer-approved workshop hero, original logo/wordmark treatment, and original navy/purple palette. The academy serves a broader learning audience; the current active program is the college-student AI internship. The existing `../docs` UX preview and `../source` learning platform are preserved. There is no website backend, login, payment service, or runtime database. Python/React/PostgreSQL/LangGraph are the **taught stack**, not hosting requirements.

## Run and edit

Use Node.js 22.12+ (Node 24 recommended) and npm.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run verify
```

- `src/content/programs/ai-engineering.md`: program overview, entry requirements, outcomes. Validated by Astro content collections.
- `src/data/curriculum.ts`: public module outcomes and rich project stories. Exact scheduling and teaching exercises are not public.
- `teaching/detailed-curriculum.ts`: internal teaching outline; never imported by website code or shipped in the public output. The source ZIP is for the client/developer, not for uploading to the public website.
- `src/pages/`: 15 canonical content pages, four legacy fallback pages, 404, sitemap, and robots output.
- `src/styles/`: base styles, rich-content components, and final `approved-theme.css` matching the original academy identity. Self-hosted Poppins body text and Georgia wordmark.
- `ASSETS.md`: original asset provenance, image-generation prompts, icon license, and responsive-image preparation.
- `site.config.mjs`: domain, contact information, Google Form URLs, content verification flags. Public data only.

## Program content and navigation

The public catalogue is `/programs/`. Each program has four static sections: overview, curriculum, projects, and career preparation. The shared program layout keeps the selected track visible and switches to the equivalent section in the other track.

- `/programs/ai-engineering-internship/`: beginner overview; append `curriculum/`, `projects/`, or `career-preparation/` for the other sections.
- `/programs/forward-deployment-engineer/`: experienced-engineer overview, with the same section suffixes.
- `src/content/programs/*.md`: validated catalogue metadata and internship overview copy.
- `src/content/fde.json`: validated FDE modules, tools, practical work, review criteria, projects, and career activities. Edit content here rather than in page layouts.
- `src/data/curriculum.ts`: validated public internship modules and project stories; private teaching exercises remain in `teaching/`.
- `src/content/internship-career.json`: validated internship DSA and interview activity cards.
- `src/data/programs.ts`: track identities, section URLs, and enquiry availability. Both programs have enquiry links; the allowlisted query selects the corresponding program interest.

Content edits require rebuilding and uploading. The catalogue shows active programs before upcoming programs, excluding drafts. The program collection status describes publication/availability; enquiry state is separate. Both programs currently use the shared program enquiry form. Keep enquiry state separate from catalogue status.

`/internship/`, `/curriculum/`, `/projects/`, and `/career-preparation/` have exact Apache 301 redirects to their internship equivalents. Their generated fallback pages are noindex and provide destination links for static previews that do not process Apache rules. Only canonical destinations appear in the sitemap. The FDE overview URL is unchanged.

The original learning-platform source is reference material, not a live dependency. FDE content adapts its six-module engineering progression and permission-aware service-assistant example. Its historical prices, schedules, certification settings, and enrolment features are not imported.

## Enquiry setup

The custom form runs in Google Apps Script and saves validated rows to a private Google Sheet. The website remains entirely static. The connected deployment is owned by the academy and remains in sample-only mode until public launch sign-off. See `integrations/google-apps-script/README.md` for setup and editing. Private project, Sheet, deployment links and sample references are in `PRODUCTION-HANDOVER.md` in that folder, outside the public assets.

The form requires name, email, mobile, college/organisation, degree/course, career stage, experience, delivery preference and privacy consent. Interests and question are optional. Success follows a confirmed server save; uncertain saves retain the same request reference for retry. The website receives only scoped height/confirmation messages, never the entered personal fields. Missing production domain keeps the site noindex with a disallow-all robots file and empty sitemap.

The academy-owned deployment now uses invisible reCAPTCHA v2 and durable contact/global submission limits. Both programs passed signed-out background verification and their saved rows were checked. Confirm retention/privacy arrangements and disable sample mode at launch; Google quotas remain a platform limit.

## GoDaddy launch

1. Set the real HTTPS domain, verified public email, phone and WhatsApp, and the client-owned Apps Script URL. Verify organization and privacy content and set both verification flags. Set the client script SITE_ORIGIN and complete spam-control review; disable prototype mode only after handover.
2. Run `npm run launch:check`, then `npm run check`, `npm run build`, and `npm run verify`. A successful preview build alone does not mean launch inputs are complete.
3. Use cPanel Domains to confirm the domain's document root (often `public_html`, but addon domains can differ). Back up its existing files and `.htaccess` before replacement. Preserve unrelated application/email directories.
4. Upload **the contents of `dist`**, including `.htaccess`, into that root. Do not upload the source, `node_modules`, or the parent folder. The upload archive in `artifacts` contains only this output.
5. Ensure the domain points to this hosting account and a valid SSL certificate is installed. Enable cPanel's Force HTTPS Redirect. Configure the alternate www/non-www hostname to redirect to the configured domain using cPanel Redirects; preserve these host-specific rules if cPanel writes them into `.htaccess`. Do not enable an HTTPS redirect before SSL works.
6. Test `/`, all 15 canonical content routes, direct refreshes, slashless-to-directory redirects, CSS/fonts, and a nonexistent URL. `.htaccess` serves `404.html` with a 404 status and uses directory `index.html` pages for clean URLs. If hosting rejects `Options -Indexes`, remove that line and disable indexing in cPanel instead.
7. In a signed-out/private browser, submit a clearly labelled test enquiry with non-sensitive test data. Confirm the saved-reference dialog and matching row in the client Sheet. Verify the direct form fallback on mobile.
8. Confirm canonical URLs, robots allow rules, sitemap domain, HTTPS and www redirects before announcing launch. Live hosting and real form delivery cannot be verified until account details are supplied.

## Packaging

From PowerShell in this directory, after rebuilding:

```powershell
New-Item -ItemType Directory -Force artifacts
tar.exe -a -c -f artifacts/samkhya-godaddy-preview.zip -C dist .
```

The current archive is a **preview**, not a launch-ready production package, until `launch:check` passes. Rebuild and repackage after final configuration. Roll back by restoring the previous document-root backup and host rules.

## Teaching implementation notes

Use one primary model API in classroom examples; select its current supported model before teaching. Keep API keys in the student backend, not React or Git. Include recorded responses for repeatable low-cost tests. Sample documents must be suitable for sharing. Introduce single-agent baselines before multi-agent orchestration, cap steps/retries/token usage, and evaluate unsupported questions and failed tools. The website makes no provider-credit or job guarantee.

## Contact and enquiry updates

Set verified `email`, `phone`, and `whatsapp` values in site.config.mjs (numbers include country codes). Contact us and footer links use these values; blanks are not published as contact links. Edit grouped FAQ copy in src/data/faqs.ts. The new enquiry bridge removes fixed-height blank space after content changes; verify it against the deployed Apps Script iframe before launch.


## Public-launch protection status

Version 2 of the academy-owned form uses invisible reCAPTCHA v2: Send triggers background verification, and Google may show a challenge for suspicious requests. No checkbox is required on every enquiry. The compact button is content-sized with a 44px minimum touch target.

Both signed-out program samples saved on 11 September 2026 without a challenge, with matching private Sheet fields/references. Production boundary checks exercised rejection and durable rate caps; mocked tests cover failure/retry branches. `enquirySecurityVerified` is true. Sample mode remains enabled until contacts, organisation/privacy approval, retention arrangements and hosting checks are complete. At launch set Apps Script `PROTOTYPE_MODE=false` and website `customFormPrototype:false`, rebuild and recheck the final domain. The local resize bridge is allowed only in sample mode.

## Local academy expansion
See [LOCAL-REVIEW.md](LOCAL-REVIEW.md) for the four-direction academy review, new space-tech and venture pages, disconnected forms and deployment boundary. This work is not published to the test domain.

## Additional course editing
Edit validated local JSON in src/content/extended-programs for Machine Learning, Full-Stack Development and FDE for Leaders. Their public discovery metadata is in src/content/programs. Shared rendering is ExtendedCoursePage.astro. Update src/content/program-options.json and the matching Apps Script PROGRAM_OPTIONS_, Form.template.html and CRM_PROGRAMS_ when changing programme names. Run prepare-crm.mjs after CRM source changes, then build/check/verify and backend tests. New live form releases remain a separate approval step.
