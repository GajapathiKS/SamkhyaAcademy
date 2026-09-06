import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const source = path.join(root, 'tmp', 'pdfs', 'source-references', 'forward-deployed-ai-engineering-1.png')
const outDir = path.join(root, 'output', 'svg-approval', 'fde-engineering')
const previewDir = path.join(outDir, 'previews')
const sourceData = `data:image/png;base64,${(await readFile(source)).toString('base64')}`
const heroData = `data:image/png;base64,${(await readFile(path.join(root, 'apps', 'web', 'public', 'brochures', 'assets', 'fde-ai-system-hero-v2.png'))).toString('base64')}`

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="840" height="630" viewBox="0 0 840 630" role="img" aria-labelledby="pageTitle pageDesc">
  <title id="pageTitle">Forward Deployed AI Engineering - brochure page 1</title>
  <desc id="pageDesc">Source-traced SVG derived exclusively from the approved Forward Deployed AI Engineering brochure PDF.</desc>
  <defs>
    <linearGradient id="pageBg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#021222"/><stop offset=".65" stop-color="#03192b"/><stop offset="1" stop-color="#04253a"/></linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#20d9e8"/><stop offset="1" stop-color="#7cf79f"/></linearGradient>
    <linearGradient id="titleAccent" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#28d7e9"/><stop offset=".75" stop-color="#32dfe0"/><stop offset="1" stop-color="#82f5a0"/></linearGradient>
    <filter id="softGlow"><feGaussianBlur stdDeviation="8"/></filter>
    <clipPath id="brandClip"><rect x="20" y="14" width="175" height="39" rx="4"/></clipPath>
    <clipPath id="heroClip"><path d="M355 61H824V414H355Z"/></clipPath>
    <clipPath id="benefit1"><rect x="38" y="372" width="30" height="34"/></clipPath>
    <clipPath id="benefit2"><rect x="148" y="372" width="30" height="34"/></clipPath>
    <clipPath id="benefit3"><rect x="251" y="372" width="31" height="34"/></clipPath>
    <image id="sourcePage" href="${sourceData}" x="0" y="0" width="840" height="630" preserveAspectRatio="none"/>
    <image id="heroArt" href="${heroData}" x="355" y="61" width="469" height="353" preserveAspectRatio="xMidYMid slice"/>
    <style><![CDATA[
      .title{font-family:Poppins,Arial,sans-serif;font-size:50px;font-weight:700;letter-spacing:-1.8px;fill:#f4f8fb}
      .titleAccent{font-family:Poppins,Arial,sans-serif;font-size:50px;font-weight:700;letter-spacing:-1.8px;fill:url(#titleAccent)}
      .body{font-family:Poppins,Arial,sans-serif;font-size:15.5px;font-weight:400;fill:#aebdca}
      .topLabel{font-family:Poppins,Arial,sans-serif;font-size:8px;font-weight:700;letter-spacing:1.5px;fill:#25d7e5}
      .chipTitle{font-family:Poppins,Arial,sans-serif;font-size:10px;font-weight:500;fill:#edf5f8}
      .button{font-family:Poppins,Arial,sans-serif;font-size:12px;font-weight:600;fill:#082232}
      .buttonSecondary{font-family:Poppins,Arial,sans-serif;font-size:12px;font-weight:500;fill:#dce8ee}
      .capTitle{font-family:Poppins,Arial,sans-serif;font-size:12px;font-weight:600;fill:#f0f6f9}
      .capBody{font-family:Poppins,Arial,sans-serif;font-size:9px;font-weight:400;fill:#9fb1bd}
      .footer{font-family:Poppins,Arial,sans-serif;font-size:8px;font-weight:400;fill:#7e919f}
      .pageNo{font-family:Poppins,Arial,sans-serif;font-size:10px;font-weight:600;fill:#dbe6ec}
    ]]></style>
  </defs>

  <rect width="840" height="630" fill="url(#pageBg)"/>
  <ellipse cx="696" cy="140" rx="230" ry="170" fill="#006c8b" opacity=".15" filter="url(#softGlow)"/>

  <!-- Approved individual artwork regions from the supplied PDF page. -->
  <g clip-path="url(#brandClip)"><use href="#sourcePage"/></g>
  <g clip-path="url(#heroClip)"><use href="#heroArt"/><rect x="355" y="61" width="90" height="353" fill="url(#pageBg)" opacity=".42"/></g>

  <text x="668" y="29" class="topLabel">FORWARD DEPLOYED AI</text>
  <text x="687" y="41" class="topLabel">ENGINEERING TRACK</text>

  <text x="27" y="124" class="title">From AI user to</text>
  <text x="27" y="179" class="titleAccent">production</text>
  <text x="27" y="233" class="titleAccent">AI engineer.</text>

  <text x="27" y="275" class="body">A practical FDE-style program that teaches</text>
  <text x="27" y="296" class="body">software professionals how to discover, design,</text>
  <text x="27" y="317" class="body">build, evaluate and deploy reliable AI systems</text>
  <text x="27" y="338" class="body">using an AI Development Life Cycle (AIDLC).</text>

  <!-- Benefit cards: original geometry, native SVG copy. -->
  <g>
    <rect x="25" y="364" width="111" height="56" rx="7" fill="#061a2d" stroke="#506373" stroke-width="1.2"/>
    <g clip-path="url(#benefit1)"><use href="#sourcePage"/></g>
    <text x="70" y="388" class="chipTitle">Practice-first</text><text x="70" y="403" class="chipTitle">learning</text>
  </g>
  <g>
    <rect x="140" y="364" width="101" height="56" rx="7" fill="#061a2d" stroke="#506373" stroke-width="1.2"/>
    <g clip-path="url(#benefit2)"><use href="#sourcePage"/></g>
    <text x="181" y="388" class="chipTitle">Enterprise</text><text x="181" y="403" class="chipTitle">use cases</text>
  </g>
  <g>
    <rect x="245" y="364" width="99" height="56" rx="7" fill="#061a2d" stroke="#506373" stroke-width="1.2"/>
    <g clip-path="url(#benefit3)"><use href="#sourcePage"/></g>
    <text x="286" y="388" class="chipTitle">Capstone</text><text x="286" y="403" class="chipTitle">deployment</text>
  </g>

  <rect x="25" y="454" width="184" height="48" rx="6" fill="url(#accent)"/>
  <text x="117" y="484" class="button" text-anchor="middle">Explore the program →</text>
  <rect x="25" y="513" width="184" height="43" rx="6" fill="#06182a" stroke="#546676" stroke-width="1.2"/>
  <text x="117" y="540" class="buttonSecondary" text-anchor="middle">Free webinar pathway</text>

  <!-- Four capability cards reconstructed at the PDF's original coordinates. -->
  <g transform="translate(380 414)">
    <rect width="87" height="123" rx="8" fill="#06192b" stroke="#526879" stroke-width="1.2"/>
    <circle cx="44" cy="31" r="19" fill="#073246" stroke="#21dbe6"/><path d="M37 31c0-8 4-13 7-13s7 5 7 13-4 13-7 13-7-5-7-13Zm7-13v26M37 25h14M37 37h14" fill="none" stroke="#50efb5" stroke-width="2"/>
    <text x="44" y="73" class="capTitle" text-anchor="middle">Understand</text><text x="44" y="91" class="capBody" text-anchor="middle">Business problem</text><text x="44" y="105" class="capBody" text-anchor="middle">&amp; AI feasibility</text>
  </g>
  <g transform="translate(473 414)">
    <rect width="87" height="123" rx="8" fill="#06192b" stroke="#526879" stroke-width="1.2"/>
    <ellipse cx="44" cy="24" rx="12" ry="6" fill="none" stroke="#58efa5" stroke-width="2.5"/><path d="M32 24v22c0 4 5 6 12 6s12-2 12-6V24M32 35c0 4 5 6 12 6s12-2 12-6" fill="none" stroke="#58efa5" stroke-width="2.5"/>
    <text x="44" y="73" class="capTitle" text-anchor="middle">Ground</text><text x="44" y="91" class="capBody" text-anchor="middle">RAG, data,</text><text x="44" y="105" class="capBody" text-anchor="middle">context &amp; memory</text>
  </g>
  <g transform="translate(566 414)">
    <rect width="87" height="123" rx="8" fill="#06192b" stroke="#526879" stroke-width="1.2"/>
    <rect x="31" y="21" width="26" height="25" rx="4" fill="none" stroke="#57efa7" stroke-width="2.5"/><path d="M37 35h4m4 0h5M44 16v5" stroke="#57efa7" stroke-width="2.5" stroke-linecap="round"/>
    <text x="44" y="73" class="capTitle" text-anchor="middle">Act</text><text x="44" y="91" class="capBody" text-anchor="middle">Agents, tools,</text><text x="44" y="105" class="capBody" text-anchor="middle">MCP &amp; workflows</text>
  </g>
  <g transform="translate(659 414)">
    <rect width="87" height="123" rx="8" fill="#06192b" stroke="#526879" stroke-width="1.2"/>
    <path d="M44 18 57 23v12c0 9-6 15-13 19-7-4-13-10-13-19V23l13-5Z" fill="none" stroke="#58efa6" stroke-width="2.5"/><path d="m37 35 5 5 9-11" fill="none" stroke="#58efa6" stroke-width="2.5"/>
    <text x="44" y="73" class="capTitle" text-anchor="middle">Validate</text><text x="44" y="91" class="capBody" text-anchor="middle">Evals, guardrails</text><text x="44" y="105" class="capBody" text-anchor="middle">&amp; human approval</text>
  </g>

  <line x1="25" y1="575" x2="808" y2="575" stroke="#173448"/>
  <text x="25" y="598" class="footer">Applied AI learning for real enterprise outcomes</text>
  <text x="797" y="598" class="pageNo" text-anchor="end">01</text>
</svg>`

await mkdir(previewDir, { recursive: true })
await writeFile(path.join(outDir, 'page-01.svg'), svg, 'utf8')
console.log(path.join(outDir, 'page-01.svg'))
