# Visual Fidelity Report

Verification date: 2 September 2026

## Implemented visual system

The public and authenticated application uses the approved Poppins-led language: indigo/violet action color, deep navy application surfaces, pale neutral content fields, cyan/green success accents, rounded cards and high-contrast state labels. Pages are responsive components; no approved screen was used as a page background.

The original 53-screen inventory is now a renumbered 52-screen set because standalone SAP Enterprise Consulting screen 13 is retired. Screens 14–53 from the BRD are mapped to 13–52. The capture contains exactly 52 numbered PNGs at a 1440px browser width plus dedicated mobile homepage and catalog captures.

Current screen status:

- 50 implemented screens.
- 2 context-dependent screens requiring an active webinar or a created CRM lead.
- 0 gap-shell screens. Exam instructions, question taking, results, Razorpay handoff and payment success are dedicated rendered states.

See `docs/ux/SCREEN_INVENTORY.md`, `docs/ux/MARVEL_PROTOTYPE_MAP.md`, and `docs/ux/MARVEL_PROTOTYPE_MAP.csv` for exact routes, roles and transitions.

## Brochure fidelity

All eight brochures were rebuilt as four-page landscape guides using the supplied masters' own page geometry: 4:3 for FDE Engineering, FDE Leadership and Entrepreneurship, and A4 landscape for the remaining program family. Their cover hierarchy, Helvetica-led typography, technical navy/cyan/mint and executive ivory/teal/gold palettes, card density, visual rhythm, curriculum architecture and CTA structure follow the corresponding approved source family. Only program content was rewritten from the canonical BRD-aligned catalog.

Suitable program imagery was isolated from the supplied brochures and reused only as individual cover assets for FDE Engineering, FDE Leadership, Full Stack, Cybersecurity, Space Tech and Venture Builder. Applied ML and Data Analytics use original vector/diagram treatments, avoiding unsupported dashboard metrics. Text, curriculum and claims come from the canonical catalog; unsupported ratings, learner counts, placement claims, partner claims and performance guarantees are absent.

PDF QA performed:

- Rendered all 32 final pages to PNG and inspected contact sheets.
- Verified clipping, page bounds, contrast, consistency and cover composition.
- Verified searchable text extraction and four pages per file.
- Verified metadata title and absence of standalone SAP marketing.
- Verified stable public download paths and lead-gated download UI.

## Remaining visual limitations

- Pixel-difference acceptance cannot be a literal zero because BRD content, text length and program counts intentionally changed. Fidelity is locked to the approved masters for icon language, structure, palette, typography and layout grammar; content regions are allowed to reflow within those structures.
- The homepage, catalog, program, video lesson, learner/exam, Venture landing, CMS and payment families were rebuilt directly against their approved masters. Organization, mentor-review and CRM transactional states retain some application-specific density differences because their displayed records depend on seeded runtime context.
- The supplied PDFs remain the visual source of truth; generated pages are real text/vector layouts and never use full-page reference screenshots as backgrounds.
