import {readFile,writeFile,mkdir,copyFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),out=path.resolve('output/UX_REVIEW_ASTRA_2026_09_05');
const audit=JSON.parse(await readFile(path.join(out,'visual-audit.json'),'utf8'));
const checks=[...JSON.parse(await readFile(path.join(out,'interaction-results.json'),'utf8')),...JSON.parse(await readFile(path.join(out,'enrichment-results.json'),'utf8')),...JSON.parse(await readFile(path.join(out,'direct-access-results.json'),'utf8')),...JSON.parse(await readFile(path.join(out,'content-depth-results.json'),'utf8'))];
const manifest=JSON.parse(await readFile(path.join(out,'manifest.json'),'utf8'));
const pairs=[['Academy',1,'01_Platform/01_Academy_Homepage.png'],['Course lesson',7,'02_Courses_and_Learning/04_Video_Lesson.png'],['Venture landing',9,'03_Entrepreneurship/01_Venture_Builder_Landing.png'],['Idea intake',10,'03_Entrepreneurship/02_Idea_Submission.png'],['Venture workflow',25,'03_Entrepreneurship/03_Venture_Workflow.png'],['Artifact library',26,'03_Entrepreneurship/04_Artifacts_Launch_Readiness.png'],['Mentor review',27,'03_Entrepreneurship/05_Mentor_Review.png'],['Organization',40,'04_Organization_and_CRM/01_Organization_Dashboard.png'],['Operations',45,'04_Organization_and_CRM/02_CRM_Leads.png']];
await mkdir(path.join(out,'references'),{recursive:true});for(const [,n,file] of pairs)await copyFile(path.join(root,'../02_Approved_UX_References',file),path.join(out,'references',`${n}.png`));
await writeFile(path.join(out,'REFERENCE_COMPARISON.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Reference comparison · SamkhyaAcademy</title><link rel="stylesheet" href="assets/fonts.css"><link rel="stylesheet" href="assets/style.css"><style>.compare{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0 40px}.compare img{width:100%;border:1px solid #ddd;vertical-align:top}.compare figure{margin:0}.compare figcaption{padding:12px;font-size:13px;background:#f2f1fb}main{max-width:1900px;margin:auto;padding:28px}@media(max-width:760px){.compare{grid-template-columns:1fr}}</style></head><body><main><a href="index.html">Back to all screens</a><h1 class="section">Reference and new UX comparison</h1><p class="section">These are the supplied source images and the newly rendered pages. Layout, typography, content density and interactions can be reviewed together. This is an inspection aid; no pixel-perfect equivalence or approval is claimed. Reference browser chrome, obsolete marketing claims and unsupported endorsements have not been recreated.</p>${pairs.map(([title,n])=>`<h2>${title} · Screen ${n}</h2><div class="compare"><figure><figcaption>Supplied visual master</figcaption><a href="references/${n}.png"><img loading="lazy" src="references/${n}.png" alt="${title} supplied reference"></a></figure><figure><figcaption>New HTML/CSS/SVG screen · <a href="pages/${String(n).padStart(3,'0')}.html">Open working page</a></figcaption><a href="screens/${String(n).padStart(3,'0')}.png"><img loading="lazy" src="screens/${String(n).padStart(3,'0')}.png" alt="${title} newly rendered screen"></a></figure></div>`).join('')}</main></body></html>`);
const broken=audit.filter(r=>r.broken.length),overflow=audit.filter(r=>r.overflow.length),tiny=audit.filter(r=>r.tiny.length),errors=audit.filter(r=>r.errors.length),fails=checks.filter(r=>r.status!=='PASS');
const files=await Promise.all(manifest.map(async s=>({n:s.n,...await stat(path.join(out,s.screenshot))})));const totalBytes=files.reduce((a,s)=>a+s.size,0);
const report=`# UX verification — 5 September 2026

## Delivered

- ${manifest.length} working HTML routes and ${audit.length} freshly rendered PNGs, including a learning-format/certification hub, direct brochure downloads and Venture/investor continuation states.
- Searchable gallery, actual navigation hotspots with coordinates, design brief, reference comparisons and responsive samples in one folder.
- Source content uses the typed course catalog and consolidated BRD. Original implementation and previous review exports are preserved.
- This deliverable is an interactive front-end customer prototype, not a claim that the LMS backend or external integrations are complete.

## Measured checks

| Check | Result |
|---|---|
| Desktop captures at 1440px | ${audit.length} |
| Main-content text below 11px | ${tiny.length} affected screens |
| Horizontal page overflow | ${overflow.length} affected screens |
| Broken images | ${broken.length} affected screens |
| Browser runtime errors | ${errors.length} affected screens |
| Functional/reflow checks | ${checks.length-fails.length} passed; ${fails.length} failed |
| Total desktop PNG size | ${(totalBytes/1024/1024).toFixed(1)} MB |

Local Poppins files are bundled. Source-level typography is 13px body, 11px metadata and 26–40px major headings. Full-page screenshots contain actual scrolling content; thumbnails are not a suitable way to judge text legibility.

## Interaction results

| Scenario | Result |
|---|---|
${checks.map(c=>`| ${c.name} | ${c.status}${c.error?' — '+c.error.replaceAll('|','/'):''} |`).join('\n')}

## Visual review and remaining differences

The reference comparison page pairs nine governing masters with the new renderings. Representative homepage, catalog, video lesson, intake, Venture workflow, organization and publishing screens were visually inspected at desktop size. The first pass exposed invisible feature-card button labels, an incomplete catalog row, uneven curriculum row heights and mobile toolbar overflow; these were corrected.

The new pages use the supplied white/navy/violet visual language, serif brand treatment, Poppins product typography, outlined SVG icons, compact cards and contextual sidebars. The exact photographs, avatar portraits, some compositions and some reference ornamentation differ. These differences remain review items; the report does not assert 100% visual identity. No numeric visual-fidelity score has been fabricated.

The all-screen audit measures text size, image loading and overflow. It does not prove absence of every awkward gap or establish customer design approval. Check the full-size PNG or working HTML for each screen. Standard reading and grouping space remains intentional.

## Functional boundary

Working in-browser: routes, catalog filtering, list search/sort/column visibility/CSV export, expandable curriculum, HTML editing and sandboxed preview, code export/reset, notes, discussion posting, practice feedback, SVG graph steps, linked-list edits, form validation and locally saved drafts, all intake steps, demo invitations, mentor decisions and publishing transitions. Downloadable project ZIP contains actual starter files.

Prototype only: authentication/account creation, backend authorization, secure employee identity, database persistence, media streaming, native C/C++ compilation, production scoring and certificates, server-stored artifacts, real Razorpay processing and messages. Instructor video is a storyboard with responsive controls; no source video was supplied. Native code screens explicitly show a guided trace rather than claiming to compile edited code. Pricing, organizations, people, dates, progress and operational metrics are illustrative records. Publishing screens express the intended independent-review policy; they are not a security boundary.

Twelve six-page A4 brochures with new course-specific teaching samples are available directly from course pages and the brochure library without any form. A ZIP contains all twelve PDFs. Optional contact forms remain available as separate prototype examples. All 72 pages were rendered and inspected. PDF text, metadata, clipping, image loading and actual browser downloads were checked. Investor requests, founder decisions and admission reviews are local demonstration states, not connected production workflows. See CONTENT_DEPTH_UPDATE.md, CLIENT_HANDOFF.html and brochures/qa/PDF_QA.json. The homepage no longer contains a review directory. Full-course authoring and a comprehensive visual redesign remain unfinished; the added content is one teaching sample and assignment per program.

## Reproduce

Run \`npx tsx scripts/ux-rebuild/prepare-visuals.ts\` before the build; run \`npx tsx scripts/ux-rebuild/brochures.ts\` and \`node scripts/ux-rebuild/pdf-qa.mjs\` to regenerate and check PDFs. Run \`node scripts/ux-rebuild/verify-enrichment.mjs\` for the added journeys.\n\nFrom the latest repository: run \`npx tsx scripts/ux-rebuild/build.ts\`, then \`node scripts/ux-rebuild/serve.mjs\`. Open http://127.0.0.1:4310. Run \`node scripts/ux-rebuild/verify.mjs\`, \`node scripts/ux-rebuild/capture.mjs\`, and \`node scripts/ux-rebuild/report.mjs\` for verification and the review package. No database, production credentials or deployment are required.
`;
await writeFile(path.join(out,'VERIFICATION_REPORT.md'),report);
console.log(`Report: ${audit.length} desktop screens; ${checks.length-fails.length}/${checks.length} checks passed.`);
