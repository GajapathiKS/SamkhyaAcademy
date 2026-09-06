import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const outDir = path.join(root, 'output', 'svg', 'fde-engineering')
const assetDir = path.join(root, 'apps', 'web', 'public', 'brochures', 'assets')
const svgAssetDir = path.join(assetDir, 'fde-svg')

const dataUri = async (file: string, mime: string) =>
  `data:${mime};base64,${(await readFile(file)).toString('base64')}`

const hero = await dataUri(path.join(assetDir, 'fde-ai-system-hero-v2.png'), 'image/png')
const build = await dataUri(path.join(assetDir, 'fde-reference', 'build-system.png'), 'image/png')
const secure = await dataUri(path.join(assetDir, 'fde-reference', 'secure-system.png'), 'image/png')
const iconFiles = ['multistack.svg', 'rag.svg', 'agents.svg', 'multimodal.svg', 'production.svg', 'integration.svg']
const icons = await Promise.all(iconFiles.map((name) => dataUri(path.join(svgAssetDir, name), 'image/svg+xml')))

const esc = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const text = (x: number, y: number, value: string, cls = 'body', anchor = 'start') =>
  `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(value)}</text>`
const lines = (x: number, y: number, values: string[], cls = 'body', gap = 20, anchor = 'start') =>
  values.map((value, index) => text(x, y + index * gap, value, cls, anchor)).join('')
const panel = (x: number, y: number, width: number, height: number, radius = 10, extra = '') =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" class="panel" ${extra}/>`
const neonPanel = (x: number, y: number, width: number, height: number, radius = 10) =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" class="neon-panel"/>`
const logo = `<g transform="translate(38 28)"><rect width="25" height="25" rx="7" fill="url(#accent)"/><text x="12.5" y="17" class="logo-mark" text-anchor="middle">S</text><text x="34" y="17" class="logo-text">Samkhya<tspan class="aqua">Academy</tspan></text></g>`
const logoRight = logo.replace('translate(38 28)', 'translate(930 22)')
const footer = (page: number) => {
  const left = page === 1
    ? text(38, 817, 'Applied AI learning for real enterprise outcomes', 'small')
    : page === 4
      ? `${text(38, 796, 'SamkhyaAcademy  ·  Applied AI learning for real enterprise outcomes', 'small')}${text(38, 814, 'PROGRAM CONCEPT BROCHURE · 2026', 'small')}`
      : ''
  return `<line x1="38" y1="780" x2="1114" y2="780" class="rule"/>${left}<text x="1114" y="817" class="page-no" text-anchor="end">${String(page).padStart(2, '0')}</text>`
}
const defs = `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#00101f"/><stop offset=".62" stop-color="#001a2e"/><stop offset="1" stop-color="#001423"/></linearGradient>
  <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#19e9df"/><stop offset="1" stop-color="#72ff9b"/></linearGradient>
  <linearGradient id="heroFade" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#00101f"/><stop offset=".3" stop-color="#00101f00"/></linearGradient>
  <filter id="glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <clipPath id="heroClip"><rect x="478" y="92" width="636" height="514" rx="10"/></clipPath>
  <style><![CDATA[
    .title{font:700 57px Poppins,Arial,sans-serif;fill:#eff9ff;letter-spacing:-1.4px}.title-accent{font:700 57px Poppins,Arial,sans-serif;fill:#2de6d7;letter-spacing:-1.4px}
    .h2{font:700 40px Poppins,Arial,sans-serif;fill:#eff9ff;letter-spacing:-.7px}.h3{font:700 16px Poppins,Arial,sans-serif;fill:#eff9ff}.card-title{font:700 12px Poppins,Arial,sans-serif;fill:#eff9ff}.card-copy{font:400 6px Poppins,Arial,sans-serif;fill:#9fb6c6}.body{font:400 13px Poppins,Arial,sans-serif;fill:#bfd0dc}.small{font:400 9px Poppins,Arial,sans-serif;fill:#aec2d0}.tiny{font:400 7px Poppins,Arial,sans-serif;fill:#9fb6c6}.kicker{font:700 8px Poppins,Arial,sans-serif;fill:#19efe0;letter-spacing:2px}.top-label{font:700 7px Poppins,Arial,sans-serif;fill:#19efe0;letter-spacing:1.8px}.logo-text{font:700 10px Poppins,Arial,sans-serif;fill:#eff9ff}.logo-mark{font:800 11px Poppins,Arial,sans-serif;fill:#042236}.aqua{fill:#19efe0}.panel{fill:#051d31;stroke:#17667a;stroke-width:2}.neon-panel{fill:#061d31;stroke:#19efe0;stroke-width:1.3}.rule{stroke:#174357;stroke-width:1}.footer{font:500 5px Poppins,Arial,sans-serif;fill:#6e8799;letter-spacing:1.8px}.page-no{font:700 8px Poppins,Arial,sans-serif;fill:#19efe0}.number{font:700 10px Poppins,Arial,sans-serif;fill:#72ff9b}.quote{font:400 24px Poppins,Arial,sans-serif;fill:#eff9ff}.quote-accent{font:700 24px Poppins,Arial,sans-serif;fill:#19efe0}
  ]]></style>
</defs>`

const page = (number: number, topLabel: string, content: string) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1152" height="864" viewBox="0 0 1152 864" role="img" aria-labelledby="title-${number}">
${defs}<title id="title-${number}">Forward Deployed AI Engineering brochure page ${number}</title><rect width="1152" height="864" fill="url(#bg)"/>${number === 1 ? logo : logoRight}${topLabel ? text(1114, 46, topLabel, 'top-label', 'end') : ''}${content}${footer(number)}</svg>`

const page1 = page(1, 'FORWARD DEPLOYED AI · ENGINEERING TRACK', `
  ${text(38, 184, 'BUILD · INTEGRATE · DEPLOY · OWN OUTCOMES', 'kicker')}
  ${lines(38, 245, ['From AI user to'], 'title', 62)}
  ${lines(38, 313, ['production AI', 'engineer.'], 'title-accent', 58)}
  ${lines(38, 427, ['Build reliable AI systems across the full engineering path,', 'then take them into real enterprise environments with', 'customer discovery, integration, adoption and measurable', 'outcome ownership.'], 'body', 21)}
  <g clip-path="url(#heroClip)"><image href="${hero}" x="420" y="80" width="730" height="548" preserveAspectRatio="xMidYMid slice"/><rect x="478" y="92" width="190" height="514" fill="url(#heroFade)"/></g>
  <rect x="478" y="92" width="636" height="514" rx="10" fill="none" stroke="#17667a"/>
  ${neonPanel(1014, 111, 83, 43, 7)}${text(1055, 136, 'AI → FDE', 'h3', 'middle')}${text(1055, 151, 'PRODUCTION PATH', 'tiny', 'middle')}
  ${['Practice-first learning', 'Enterprise use cases', 'Capstone deployment'].map((v, i) => `${panel(38 + i * 146, 500, 137, 66, 7)}${text(106 + i * 146, 536, v, 'small', 'middle')}`).join('')}
  <rect x="38" y="615" width="252" height="52" rx="6" fill="url(#accent)"/>${text(164, 647, 'Explore the program →', 'h3', 'middle')}
  ${panel(38, 682, 252, 52, 6)}${text(164, 714, 'Free webinar pathway', 'body', 'middle')}
  ${[
    ['</>', 'Build across|stacks', 'Python, .NET, Java|or Node.js'], ['AG', 'Engineer agent|systems', 'Tools, memory, MCP|and skills'],
    ['CI', 'Operate in|production', 'Evals, LLMOps, scale|and cost'], ['◎', 'Own business|outcomes', 'Discovery, adoption|and value']
  ].map((item, i) => { const x = 520 + i * 132; return `${panel(x, 570, 122, 166, 8)}${neonPanel(x + 36, 588, 50, 50, 10)}${text(x + 61, 619, item[0], 'h3', 'middle')}${lines(x + 61, 661, item[1].split('|'), 'card-title', 15, 'middle')}${lines(x + 61, 701, item[2].split('|'), 'card-copy', 10, 'middle')}` }).join('')}
`)

const capability = [
  ['Multi-stack AI|development', 'Enter through Python/FastAPI, C#/.NET,', 'Java/Spring or Node.js/TypeScript.'],
  ['RAG and enterprise|knowledge', 'Embeddings, vector stores, retrieval, document', 'AI and grounded answers.'],
  ['Agents and tool use', 'Function calling, tasks, memory, MCP, skills and', 'multi-agent coordination.'],
  ['Voice and multimodal|AI', 'STT, TTS, realtime conversations, vision and', 'document understanding.'],
  ['Production AI|engineering', 'Docker, cloud, CI/CD, evaluations, observability,', 'scaling and cost control.'],
  ['Enterprise integration', 'SSO, RBAC, APIs, databases, SharePoint, CRM,', 'SAP and legacy platforms.']
]
const page2 = page(2, '', `
  ${text(45, 121, 'SHARED FOUNDATION', 'kicker')}
  ${lines(45, 167, ['AI Essentials -', 'learned by', 'building,', 'not', 'memorising.'], 'h2', 42)}
  ${lines(45, 365, ['Engineering depth comes first. Learners build the', 'architecture underneath reliable AI products before', 'moving into enterprise delivery.'], 'body', 21)}
  ${capability.map((item, i) => { const col = i % 3; const row = Math.floor(i / 3); const x = 448 + col * 218; const y = 99 + row * 320; const titleLines = item[0].split('|'); return `${panel(x, y, 199, 306, 10)}<image href="${icons[i]}" x="${x + 14}" y="${y + 12}" width="171" height="92" preserveAspectRatio="xMidYMid meet"/>${lines(x + 14, y + 130, titleLines, 'h3', 19)}${lines(x + 14, y + 175 + (titleLines.length - 1) * 16, [item[1], item[2]], 'small', 18)}` }).join('')}
  ${panel(38, 732, 1076, 75, 8)}${text(52, 771, 'The learning journey', 'h3')}
  ${['AI-aware developer', 'AI app engineer', 'Agent engineer', 'Production AI', 'FDE'].map((item, i) => { const x = 265 + i * 184; return `<circle cx="${x}" cy="762" r="11" fill="#0b4e5c"/>${text(x, 766, String(i + 1), 'number', 'middle')}${text(x, 785, item, 'small', 'middle')}` }).join('')}
`)

const modules = [
  ['01', 'FDE & AIDLC Foundations', 'Discovery, business framing and outcome criteria.', '◎'], ['02', 'LLM Application Engineering', 'Model APIs, structured output, tools and robust patterns.', '</>'],
  ['03', 'RAG & Knowledge Systems', 'Ingestion, chunking, embeddings, retrieval and grounding.', 'DB'], ['04', 'Agentic AI', 'Tools, planning, memory, tasks, approvals and human control.', 'AG'],
  ['05', 'MCP Skills & Multi-Agent', 'Reusable skills, orchestration and coordination risk.', 'MCP'], ['06', 'Evaluation & Guardrails', 'Quality, safety, privacy, regression and policy controls.', '✓'],
  ['07', 'Production AI Engineering', 'Security, observability, cost, latency, caching and recovery.', 'CI'], ['08', 'Forward Deployment Capstone', 'Discovery through build, rollout, adoption and outcome review.', '◇']
]
const page3 = page(3, '', `
  ${text(38, 91, 'CORE PROGRAM', 'kicker')}${lines(38, 140, ['Forward', 'Deployed', 'AI Engineering'], 'h2', 46)}${text(38, 279, 'with AIDLC.', 'h2')}
  ${lines(38, 315, ['Each module produces a practical artifact: requirement,', 'architecture, prompt contract, RAG pipeline, agent workflow,', 'evaluation report or deployment evidence.'], 'body', 20)}
  ${panel(38, 387, 332, 228, 9)}<image href="${build}" x="39" y="388" width="330" height="226" preserveAspectRatio="xMidYMid slice" opacity=".88"/>${text(54, 417, 'What you build', 'h3')}
  ${modules.map((item, i) => { const col = i % 2; const row = Math.floor(i / 2); const x = 386 + col * 374; const y = 76 + row * 132; return `${panel(x, y, 365, 104, 8)}${neonPanel(x + 12, y + 14, 70, 70, 8)}${text(x + 47, y + 56, item[3], 'h3', 'middle')}${text(x + 94, y + 28, item[0], 'number')}${text(x + 94, y + 51, item[1], 'h3')}${text(x + 94, y + 72, item[2], 'tiny')}` }).join('')}
  ${panel(38, 620, 1076, 130, 8)}${text(52, 647, 'AI DEVELOPMENT LIFE CYCLE (AIDLC)', 'kicker')}
  ${['Discover', 'Design', 'Build', 'Evaluate', 'Deploy', 'Adopt'].map((item, i) => { const x = 137 + i * 178; return `<circle cx="${x}" cy="692" r="15" fill="none" stroke="#19efe0" stroke-width="2"/>${text(x, 696, String(i + 1), 'number', 'middle')}${text(x, 722, item, 'small', 'middle')}` }).join('')}
`)

const outcomes = ['Assess real AI needs', 'Design LLM, RAG and agent architectures', 'Connect enterprise systems and data', 'Create evaluation strategies', 'Deploy with guardrails and observability', 'Communicate decisions in business language']
const roles = ['Software developers', 'Tech leads', 'Architects', 'AI engineers', 'Data engineers', 'Engineering managers']
const page4 = page(4, '', `
  ${text(38, 89, 'OUTCOME-DRIVEN', 'kicker')}${lines(38, 136, ['What participants', 'should be able to', 'do.'], 'h2', 43)}
  ${outcomes.map((item, i) => { const y = 278 + i * 38; return `<circle cx="56" cy="${y}" r="10" fill="#0b4e5c"/>${text(56, y + 4, '✓', 'number', 'middle')}${text(75, y + 4, item, 'small')}<line x1="38" y1="${y + 20}" x2="402" y2="${y + 20}" class="rule"/>` }).join('')}
  ${panel(414, 78, 322, 382, 18)}${text(438, 126, '“Don’t just learn to', 'quote')}${text(438, 160, 'use AI tools.', 'quote-accent')}${text(438, 204, 'Engineer AI systems', 'quote-accent')}${lines(438, 238, ['for real enterprise', 'constraints.”'], 'quote', 34)}
  <image href="${secure}" x="746" y="78" width="368" height="272" preserveAspectRatio="xMidYMid slice"/>
  ${panel(340, 345, 774, 105, 9)}${text(354, 374, 'IDEAL PARTICIPANTS', 'kicker')}
  ${roles.map((item, i) => { const x = 414 + i * 126; return `${neonPanel(x - 18, 388, 36, 36, 0)}${text(x, 411, String(i + 1), 'number', 'middle')}${text(x, 437, item, 'tiny', 'middle')}` }).join('')}
  ${panel(38, 545, 1076, 194, 9)}${text(56, 579, 'FREE ENTRY WEBINAR', 'kicker')}${lines(56, 620, ['The Rise of the', 'Forward Deployed AI', 'Engineer'], 'h2', 38)}
  ${lines(56, 718, ['How engineers move from AI-assisted coding to owning production AI', 'outcomes.'], 'small', 15)}
  ${[['▣', 'Real enterprise use cases'], ['◎', 'Actionable frameworks'], ['♙', 'Q&A with practitioners']].map((item, i) => { const x = 487 + i * 174; return `${text(x, 637, item[0], 'quote-accent', 'middle')}${text(x, 671, item[1], 'small', 'middle')}` }).join('')}
  <rect x="897" y="625" width="193" height="43" rx="7" fill="url(#accent)"/>${text(993, 652, 'Register / Enquire →', 'h3', 'middle')}
`)

await mkdir(outDir, { recursive: true })
for (const [index, content] of [page1, page2, page3, page4].entries()) {
  await writeFile(path.join(outDir, `page-${String(index + 1).padStart(2, '0')}.svg`), content, 'utf8')
}
console.log(outDir)
