# SamkhyaAcademy — reference-led UX rebuild brief

Effective: 5 September 2026. This is the consolidated prompt requested for the new model and the working specification for this UX iteration.

## Objective

Rebuild every screen in the 95-screen review inventory and add the missing decision and continuation states. Deliver a connected, usable HTML/CSS/SVG customer prototype and freshly captured screenshots in one new review folder. This task is UX design and prototype behavior; it is not authorization for production deployment, live messages, payments or database migrations.

## Read before designing

1. `CODEX_HANDOFF_PROMPT.md` in the handoff root, interpreted alongside subsequent user decisions.
2. `03_Specification_Documents/SamkhyaAcademy_Functional_BRD_Consolidated_2026-09-02.docx` and `docs/BRD_SOURCE_OF_TRUTH.md`.
3. Actual images under `02_Approved_UX_References`, especially the academy, video lesson, Venture landing/intake/workflow/artifacts/review and organization dashboard masters. The user's attached Venture workspace and course lesson images extend these masters.
4. The old inventory for coverage only. Previously generated screenshots are rejected design output, not visual references.

## Visual contract

Use the references' white surfaces, navy headings, violet/indigo controls, green state indicators, thin neutral borders, restrained gradients, compact information groupings and consistent outlined icons. Use locally bundled Poppins. Brand wordmark retains the reference's serif treatment.

Desktop canvas: 1440px. Body: 13–15px. Metadata: at least 11px. Dense labels: at least 11px. Headings: 26–40px according to hierarchy. Never shrink essential copy to manufacture density. Sidebar rows use consistent spacing. Cards size to meaningful content. Use photograph regions only as individual visual assets, never flatten a whole screenshot into a fake page.

Application screens keep the navigation, active work surface, relevant context and next action together. Use actual lessons, curriculum, example code, evidence, activity, controls and useful explanatory content to fill the available space. Do not pad with oversized abstract diagrams, repeated empty cards or invented public success metrics. Preserve breathing space required for reading and grouping.

## Required behaviors

Prototype navigation must connect real decisions, not just increment screen numbers. Search/filter, curriculum expansion, lesson tabs, notes, comments, code editing and preview, downloads, simulation controls, intake validation, quiz selection/results and review decisions must respond. Locally saved demo state must be resettable. Every primary action must navigate, change state, validate input or produce a local artifact. Clearly distinguish front-end prototype behavior from production authentication, storage, payment and communication integrations in review documentation.

## Product constraints

- Pricing: FREE, FREEMIUM, PRICING. Delivery remains separate from lesson format and access visibility.
- C, C++ and JavaScript are free; DSA is a paid program with SVG node/edge simulations.
- Shared video/text/mixed/code/practice/project course shell. Blogs remain separate editorial discussion content.
- FDE supports Python, .NET, Java and TypeScript; retain full production/integration/adoption progression. Applied ML remains a separate complete program.
- No standalone SAP offering. SAP may appear only as one FDE integration example.
- Seven Venture stages with draft, submitted, review, changes, revised evidence and unlock states.
- Multiple named Content Admins and Super Admins. Content Admin submits; a different Super Admin approves protected settings and publishes. Show author identity, review history and learner version pinning.
- Organization roles never implicitly grant academy authoring rights.
- Brochure name/email/mobile gate with separate optional email and WhatsApp consent. Payments and campaigns are demo/test/console only.

## Coverage and evidence

Keep core IDs 1–95 traceable. Add authentication/recovery, filter results, previews/upgrades, hybrid/offline learning, all intake steps, artifact versions, mentor assignment, organization invitations/seats/reports, authoring review/return/publish and payment failure/retry states.

Build and inspect representative public, lesson, Venture, organization and authoring screens before batch capture. Capture every final route only after font loading, image loading and render checks. Audit text size, overflow, broken assets, links, screenshot freshness and major interaction flows. Compare actual output with supplied masters and report remaining visual differences honestly. Never equate a passing build, a large screen count or absence of runtime errors with design acceptance.
