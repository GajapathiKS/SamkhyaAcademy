import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const slug = process.argv[2] || 'fde-engineering'
const svgDir = path.join(root, 'output', 'svg-approval', slug)
const outDir = path.join(root, 'output', 'html-approval', slug)
const pages: string[] = []

for (let page = 1; page <= 12; page += 1) {
  const file = path.join(svgDir, `page-${String(page).padStart(2, '0')}.svg`)
  try {
    const source = await readFile(file, 'utf8')
    pages.push(source.replace(/^<\?xml[^>]*>\s*/u, ''))
  } catch {
    break
  }
}

if (!pages.length) throw new Error(`No SVG approval pages found in ${svgDir}`)

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${slug} brochure approval</title>
  <style>
    @page { size: 12in 9in; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; background: #08111d; font-family: Poppins, Arial, sans-serif; }
    .approval-header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 14px 22px; color: #dff8ff; background: #08111df2; border-bottom: 1px solid #21445a; backdrop-filter: blur(14px); }
    .approval-header strong { font-size: 14px; }
    .approval-header span { color: #64e9d4; font-size: 12px; }
    main { display: grid; gap: 32px; justify-content: center; padding: 34px; }
    .sheet { width: min(1152px, calc(100vw - 68px)); aspect-ratio: 4 / 3; background: #021222; box-shadow: 0 18px 60px #0009; }
    .sheet svg { display: block; width: 100%; height: 100%; }
    @media print {
      html, body { background: transparent; }
      .approval-header { display: none; }
      main { display: block; padding: 0; }
      .sheet { width: 12in; height: 9in; box-shadow: none; break-after: page; page-break-after: always; }
      .sheet:last-child { break-after: auto; page-break-after: auto; }
    }
  </style>
</head>
<body>
  <header class="approval-header"><strong>SamkhyaAcademy · ${slug}</strong><span>HTML approval master · ${pages.length} pages · PDF not generated</span></header>
  <main>${pages.map((page, index) => `<section class="sheet" aria-label="Brochure page ${index + 1}">${page}</section>`).join('')}</main>
</body>
</html>`

await mkdir(outDir, { recursive: true })
await writeFile(path.join(outDir, 'index.html'), html, 'utf8')
console.log(path.join(outDir, 'index.html'))
