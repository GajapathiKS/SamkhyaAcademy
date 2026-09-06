import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const sourceDir = path.join(root, 'tmp', 'pdfs', 'source-references')
const outDir = path.join(root, 'output', 'svg-approval', 'fde-engineering')
const source = async (page: number) => `data:image/png;base64,${(await readFile(path.join(sourceDir, `forward-deployed-ai-engineering-${page}.png`))).toString('base64')}`
const [p2src, p3src, p4src] = await Promise.all([source(2), source(3), source(4)])
const assetDir = path.join(root, 'apps', 'web', 'public', 'brochures', 'assets')
const buildArt = `data:image/png;base64,${(await readFile(path.join(assetDir, 'fde-build-system-v2.png'))).toString('base64')}`
const secureArt = `data:image/png;base64,${(await readFile(path.join(assetDir, 'fde-secure-system-v2.png'))).toString('base64')}`
const iconDir = path.join(assetDir, 'fde-svg')
const iconArt = await Promise.all(['multistack.svg','rag.svg','agents.svg','multimodal.svg','production.svg','integration.svg'].map(async name => `data:image/svg+xml;base64,${(await readFile(path.join(iconDir, name))).toString('base64')}`))

const esc = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const t = (x: number, y: number, value: string, cls: string, anchor = 'start') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(value)}</text>`
const multi = (x: number, y: number, values: string[], cls: string, gap: number, anchor = 'start') => values.map((value, i) => t(x, y + i * gap, value, cls, anchor)).join('')
const baseDefs = `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#021222"/><stop offset=".7" stop-color="#03192b"/><stop offset="1" stop-color="#04243a"/></linearGradient><linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#20d9e8"/><stop offset="1" stop-color="#7cf79f"/></linearGradient><style><![CDATA[
  .kicker{font:700 8px Poppins,Arial,sans-serif;letter-spacing:1.7px;fill:#22d7e6}.title{font:700 31px Poppins,Arial,sans-serif;letter-spacing:-.8px;fill:#f3f7fa}.titleAccent{font:700 31px Poppins,Arial,sans-serif;letter-spacing:-.8px;fill:#31dedb}.body{font:400 13px Poppins,Arial,sans-serif;fill:#aebdca}.cardTitle{font:700 14px Poppins,Arial,sans-serif;fill:#f1f6f9}.cardBody{font:400 9.5px Poppins,Arial,sans-serif;fill:#a9bdc9}.micro{font:400 8px Poppins,Arial,sans-serif;fill:#a9bdc9}.moduleBody{font:400 9.2px Poppins,Arial,sans-serif;fill:#a9bdc9}.smallTitle{font:700 11.5px Poppins,Arial,sans-serif;fill:#f2f7fa}.webTitle{font:700 22px Poppins,Arial,sans-serif;letter-spacing:-.4px;fill:#f3f7fa}.number{font:700 8px Poppins,Arial,sans-serif;fill:#22dbe3}.panel{fill:#061a2d;stroke:#38586b;stroke-width:1.1}.footer{font:400 8px Poppins,Arial,sans-serif;fill:#7e919f}.pageNo{font:600 10px Poppins,Arial,sans-serif;fill:#dbe6ec}.quote{font:400 21px Poppins,Arial,sans-serif;fill:#eff6f9}.quoteAccent{font:700 21px Poppins,Arial,sans-serif;fill:#27dedc}
]]></style>`
const pageBase = (n: number, defs: string, body: string, src: string) => `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="840" height="630" viewBox="0 0 840 630" role="img" aria-labelledby="title${n}"><title id="title${n}">Forward Deployed AI Engineering - brochure page ${n}</title><defs>${baseDefs}${defs}<image id="source${n}" href="${src}" x="0" y="0" width="840" height="630" preserveAspectRatio="none"/></defs><rect width="840" height="630" fill="url(#bg)"/>${body}</svg>`
const logo = (n: number) => { const x=n===2?674:n===3?696:684; return `<g transform="translate(${x} 19)"><rect width="25" height="25" rx="8" fill="url(#accent)"/><path d="M6 16c4 0 5-9 7-9s3 9 7 9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><text x="34" y="17" class="smallTitle">Samkhya<tspan fill="#21d9e4">Academy</tspan></text></g>` }
const footer = (n: number, extra = '') => n === 2
  ? t(817, 604, '02', 'pageNo', 'end')
  : `<line x1="25" y1="556" x2="812" y2="556" stroke="#173448"/>${extra}${t(797, 580, String(n).padStart(2, '0'), 'pageNo', 'end')}`

const p2Cards = [
  {x:327,y:72,w:146,h:225,title:['LLMs, prompts','& context'],body:['Model responses and limits,','context engineering,','structured output and','grounded generation.']},
  {x:481,y:72,w:154,h:225,title:['RAG & enterprise','knowledge'],body:['Chunking, embeddings,','vector retrieval, citations','and permission-aware','enterprise grounding.']},
  {x:643,y:72,w:154,h:225,title:['Agents, tools','& MCP'],body:['Tasks, tools, memory,','skills, MCP and controlled','multi-agent coordination.']},
  {x:327,y:306,w:146,h:218,title:['Voice &','multimodal AI'],body:['STT, TTS, realtime agents,','vision and document AI','for multimodal products.']},
  {x:481,y:306,w:154,h:218,title:['Evals, safety','& security'],body:['Quality, guardrails, privacy,','human approval and','regression controls.']},
  {x:643,y:306,w:154,h:218,title:['Production, cost','& observability'],body:['Cloud, CI/CD, latency,','scale, monitoring and','operating cost controls.']},
]
const p2Clips = p2Cards.map((c,i)=>`<clipPath id="p2art${i}"><rect x="${c.x+10}" y="${c.y+8}" width="${c.w-20}" height="65" rx="6"/></clipPath>`).join('')
const p2Body = `${logo(2)}${t(41,74,'SHARED FOUNDATION','kicker')}${t(41,112,'AI Essentials -','title')}${t(41,148,'learned by building,','titleAccent')}${t(41,183,'not memorising.','title')}${multi(41,222,['Build reliable AI from engineering foundations.','Learn models, retrieval and agent systems.','Add voice, vision and document workflows.','Operate with evaluation, security and observability.'],'body',18)}
${p2Cards.map((c,i)=>`<rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="10" class="panel"/><image href="${iconArt[i]}" x="${c.x+10}" y="${c.y+9}" width="${c.w-20}" height="70" preserveAspectRatio="xMidYMid meet"/>${multi(c.x+14,c.y+108,c.title,'cardTitle',17)}${multi(c.x+14,c.y+158,c.body,'cardBody',15)}`).join('')}
<rect x="41" y="302" width="250" height="160" rx="10" class="panel"/>${t(57,326,'SUPPORTED ENTRY STACKS','kicker')}${[['Python / FastAPI','01'],['C# / .NET','02'],['Java / Spring','03'],['Node.js / TypeScript','04']].map((v,i)=>`${t(57,354+i*25,v[1],'number')}${t(82,354+i*25,v[0],'cardBody')}`).join('')}${t(57,450,'Choose one implementation path; learn shared AI patterns.','micro')}
<rect x="40" y="530" width="754" height="83" rx="9" class="panel"/>${t(58,558,'The learning journey','cardTitle')}${multi(58,578,['Move from software engineering into','reliable enterprise AI delivery.'],'cardBody',13)}
<line x1="310" y1="566" x2="733" y2="566" stroke="#68e9a1" stroke-width="1.5"/>${['Developer','GenAI','Production AI','Enterprise','AI FDE'].map((label,i)=>{const x=310+i*106;return `<circle cx="${x}" cy="566" r="18" fill="#073246" stroke="#4be4b3" stroke-width="2"/><text x="${x}" y="570" class="number" text-anchor="middle">${i+1}</text>${t(x,596,label,'micro','middle')}`}).join('')}${footer(2)}`
const page2 = pageBase(2, `<clipPath id="logoClip2"><rect x="672" y="17" width="145" height="38"/></clipPath>${p2Clips}`, p2Body, p2src)

const p3Cards = [
  {x:298,y:51,w:231,h:91,n:'01',title:'Engineering Readiness Bridge',body:['Optional bridge across APIs, data,','testing, Git and cloud foundations.'],art:[305,58,55,61]},
  {x:539,y:51,w:250,h:91,n:'02',title:'AI Engineering Foundations',body:['LLMs, context engineering, structured','output, embeddings and tools.'],art:[545,58,61,61]},
  {x:298,y:147,w:231,h:88,n:'03',title:'RAG & Knowledge Systems',body:['Ingestion, chunking, vector retrieval,','grounding and permission-aware design.'],art:[305,154,55,61]},
  {x:539,y:147,w:250,h:88,n:'04',title:'Agents, Voice & Multimodal',body:['Tasks, memory, MCP, skills, realtime','voice, vision and document AI.'],art:[545,154,61,61]},
  {x:298,y:241,w:231,h:89,n:'05',title:'MCP, Skills & Multi-Agent',body:['Reusable tools, orchestration, handoffs','and coordination-risk controls.'],art:[305,248,55,61]},
  {x:539,y:241,w:250,h:89,n:'06',title:'Production AI Engineering',body:['Evals, guardrails, security, cloud,','observability, scale and cost.'],art:[545,248,61,61]},
  {x:298,y:335,w:231,h:92,n:'07',title:'Enterprise Integration',body:['SSO, RBAC, APIs, databases, SharePoint,','CRM, SAP and legacy platforms.'],art:[305,342,55,61]},
  {x:539,y:335,w:250,h:92,n:'08',title:'Forward Deployment Capstone',body:['Discovery through architecture, build,','adoption and measurable outcome review.'],art:[545,342,61,61]},
]
const p3ClipDefs = p3Cards.map((c,i)=>`<clipPath id="p3art${i}"><rect x="${c.art[0]}" y="${c.art[1]}" width="${c.art[2]}" height="${c.art[3]}"/></clipPath>`).join('')
const p3Body = `${logo(3)}${t(26,36,'CORE PROGRAM','kicker')}${multi(26,76,['Forward Deployed','AI Engineering'],'title',36)}${t(26,143,'with AIDLC.','titleAccent')}${multi(26,177,['A technology-agnostic progression from','software engineer to production AI engineer','and forward-deployed outcome owner.'],'body',19)}
<rect x="26" y="259" width="235" height="168" rx="8" class="panel"/><image href="${buildArt}" x="137" y="266" width="116" height="153" preserveAspectRatio="xMidYMid cover"/>${t(43,286,'What you build','smallTitle')}${multi(43,314,['✓ Enterprise-ready systems','✓ Code and evaluation evidence','✓ Production capstone','✓ Measurable outcomes'],'moduleBody',23)}
${p3Cards.map((c,i)=>`<rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="8" class="panel"/><image href="${iconArt[i%iconArt.length]}" x="${c.x+7}" y="${c.y+12}" width="54" height="58" preserveAspectRatio="xMidYMid meet"/>${t(c.x+66,c.y+21,c.n,'number')}${t(c.x+66,c.y+39,c.title,'smallTitle')}${multi(c.x+66,c.y+58,c.body,'moduleBody',13)}`).join('')}
<rect x="26" y="449" width="758" height="102" rx="9" class="panel"/>${t(39,469,'AI DEVELOPMENT LIFE CYCLE (AIDLC)','kicker')}${['Discover','Assess','Design','Build','Evaluate','Integrate','Deploy','Adopt','Measure','Improve'].map((label,i)=>{const x=56+i*72;return `<circle cx="${x}" cy="502" r="12" fill="#073246" stroke="#4be4b3"/>${t(x,506,String(i+1),'number','middle')}${t(x,529,label,'micro','middle')}${i<9?`<path d="M${x+15} 502h36" stroke="#4b8d8d"/>`:''}`}).join('')}${footer(3)}`
const page3 = pageBase(3, `<clipPath id="logoClip3"><rect x="693" y="17" width="126" height="35"/></clipPath><clipPath id="buildClip"><rect x="142" y="272" width="111" height="143" rx="7"/></clipPath>${p3ClipDefs}`, p3Body, p3src)

const outcomes = ['Assess whether AI is the right solution','Design LLM, RAG, agent and multimodal systems','Integrate identity, APIs, data and enterprise platforms','Define evaluations, guardrails and human controls','Deploy with security, observability, scale and cost control','Own adoption and measurable business outcomes']
const roles = ['Python','C#/.NET','Java','Node.js','Tech Leads','Architects']
const p4Body = `${logo(4)}${t(31,38,'OUTCOME-DRIVEN','kicker')}${multi(31,72,['What participants','should be able to do.'],'title',34)}${outcomes.map((value,i)=>{const y=120+i*40;return `<rect x="31" y="${y}" width="265" height="37" rx="7" class="panel"/><path d="m43 ${y+18} 5 5 9-11" fill="none" stroke="#27dfe4" stroke-width="2"/>${t(66,y+22,value,'micro')}`}).join('')}
<rect x="321" y="49" width="255" height="231" rx="22" class="panel"/>${t(343,91,'“','quoteAccent')}${multi(373,109,['Don’t just learn how','to use AI tools.'],'quote',31)}${multi(373,178,['Engineer AI','systems that survive','real enterprise','constraints.”'],'quoteAccent',27)}
<image href="${secureArt}" x="576" y="49" width="239" height="231" preserveAspectRatio="xMidYMid cover"/><rect x="321" y="285" width="489" height="101" rx="10" class="panel"/>${t(334,307,'IDEAL PARTICIPANTS','kicker')}${roles.map((role,i)=>{const x=368+i*79;return `<rect x="${x-17}" y="321" width="34" height="28" rx="5" fill="#08243a" stroke="#5d7382"/>${t(x,340,String(i+1),'number','middle')}${t(x,367,role,'cardBody','middle')}`}).join('')}
<rect x="31" y="399" width="783" height="141" rx="8" class="panel"/>${t(51,421,'FREE ENTRY WEBINAR','kicker')}${multi(51,453,['The Rise of the Forward','Deployed AI Engineer'],'webTitle',27)}${multi(51,506,['How engineers progress from AI-assisted development','to owning production AI outcomes.'],'cardBody',15)}
${[['▣','Real enterprise','use cases'],['◎','Actionable','frameworks'],['♙','Q&A with','practitioners']].map((item,i)=>{const x=385+i*110;return `${t(x,463,item[0],'quoteAccent','middle')}${multi(x,489,[item[1],item[2]],'micro',13,'middle')}`}).join('')}<rect x="662" y="435" width="132" height="72" rx="9" fill="url(#accent)"/>${multi(728,466,['Register /','Enquire →'],'cardTitle',19,'middle')}${footer(4, `${t(38,578,'SamkhyaAcademy  ·  Applied AI learning for real enterprise outcomes','footer')}${t(38,592,'PROGRAM CONCEPT BROCHURE · 2026','footer')}`)}`
const page4 = pageBase(4, `<clipPath id="logoClip4"><rect x="680" y="17" width="139" height="36"/></clipPath><clipPath id="secureClip"><rect x="576" y="49" width="239" height="231" rx="7"/></clipPath>`, p4Body, p4src)

await mkdir(path.join(outDir, 'previews'), { recursive: true })
for (const [n, content] of [[2, page2], [3, page3], [4, page4]] as const) {
  await writeFile(path.join(outDir, `page-${String(n).padStart(2, '0')}.svg`), content, 'utf8')
}
console.log(outDir)
