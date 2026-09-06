# SamkhyaAcademy Functional BRD - Codex Source of Truth

The authoritative human-readable BRD is
`../03_Specification_Documents/SamkhyaAcademy_Functional_BRD_Consolidated_2026-09-02.docx`.
It preserves the original BRD and adds the approved 2026 UX, learning-format,
programming-pathway, SAP-retirement, and two-person publishing-governance decisions.
The original `SamkhyaAcademy_Functional_BRD.docx` / `.pdf` remain historical inputs.

## Non-negotiable product decisions
- Core product: learning platform. CRM is operational support only.
- Internal-only content authors via Payload CMS. No outsider author marketplace.
- Course pricing category: `FREE | FREEMIUM | PRICING`.
- Content type: `FULL_ONLINE_VIDEOS | HYBRID_OFFLINE_ONLINE | FULL_OFFLINE`.
- Free/freemium/paid access must be enforced server-side.
- Initial free courses: C Programming, C++ Essentials, JavaScript Foundations.
- Paid programming extension: Data Structures & Algorithms with code-native SVG/HTML simulations.
- One course shell supports video, structured text, mixed examples, code labs, simulations, practice, projects, resources, exams, discussions, and certificates.
- Blogs are separate public/editorial discussion content and never count toward course progress or certification.
- FDE progression: Full-Stack/Backend Developer -> GenAI Developer -> Production AI Engineer -> AI FDE.
- FDE implementation is tech agnostic: Python, C#/.NET, Java/Spring, Node.js/TypeScript.
- Applied ML is a separate path and includes ML, DL, CV, NLP, Voice/Multimodal, Transformers, fine-tuning, LoRA/QLoRA, SLMs, model serving, MLOps.
- Entrepreneurship Venture Builder is persisted workflow: Idea -> Customer Validation -> Business Model -> MVP -> Pilot -> Traction -> Scale/Production, with artifacts and mentor gates.
- Approved Venture golden masters include landing, intake, workflow, artifacts, mentor review, and the daily venture workspace.
- Organizations: schools/universities, businesses/teams, bootcamps/training.
- Brochure lead gate requires name/email/mobile.
- Operations: mini CRM, WhatsApp/email, private offers, Razorpay.
- UX masters in `02_Approved_UX_References` are authoritative.
- Visual acceptance must match the approved masters' composition, density, typography, iconography, palette, spacing, and real-estate use while keeping BRD-accurate content.
- Empty real estate is a rejection condition: no oversized blank bands, sparse desktop canvases, artificially tall module cards, or unused decision areas are acceptable.
- Dashboards use a consistent accessible line-icon system for navigation, KPI cards, search, filter, sort, columns, export, row actions, sections, approvals and publishing; Unicode pseudo-icons are not accepted.
- Content Admin authors and submits but cannot publish or directly change protected settings. Super Admin approves protected changes and publishes immutable versions. Multiple named employees may hold either role; shared logins and self-approval are prohibited.
- The standalone SAP Enterprise Consulting offering is retired. SAP remains only as an FDE integration example.

## Required prototype inventory
The original 53-screen inventory is a historical baseline. Removing the standalone SAP
screen produces a renumbered 52-screen core. The current acceptance inventory is the
extensible 95-screen catalog in `docs/ux/SCREEN_INVENTORY.md`, including multi-format
learning, C/C++, paid DSA simulations, complete Venture continuation states, and
Content Admin -> Super Admin approval/publishing screens.
