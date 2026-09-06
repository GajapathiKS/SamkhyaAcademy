import {
  copyFile,
  mkdir,
  readdir,
  readFile,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "docs", "ux", "generated");
const review = path.join(root, "output", "UX_SCREEN_REVIEW_95");
const screensDir = path.join(review, "screens");

await mkdir(screensDir, { recursive: true });

const pngs = (await readdir(source))
  .filter((file) => /^\d{2}-.+\.png$/i.test(file))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

for (const file of pngs) {
  await copyFile(path.join(source, file), path.join(screensDir, file));
}

const companionFiles = [
  "SCREEN_INVENTORY.md",
  "MARVEL_PROTOTYPE_MAP.md",
  "MARVEL_PROTOTYPE_MAP.csv",
  "VISUAL_MASTER_CONTRACT.md",
];
for (const file of companionFiles) {
  await copyFile(path.join(root, "docs", "ux", file), path.join(review, file));
}

const cards = pngs
  .map((file) => {
    const number = Number(file.slice(0, 2));
    const title = file
      .replace(/^\d{2}-/, "")
      .replace(/\.png$/i, "")
      .replaceAll("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
    return `<article class="card" data-screen="${number}" data-title="${title.toLowerCase()}">
      <a href="screens/${file}" target="_blank"><img src="screens/${file}" loading="lazy" alt="Screen ${number}: ${title}"></a>
      <div><b>${String(number).padStart(2, "0")} · ${title}</b><a href="screens/${file}" target="_blank">Open full size ↗</a></div>
    </article>`;
  })
  .join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SamkhyaAcademy · 95 Screen Review</title>
  <style>
    :root{font-family:Inter,Segoe UI,sans-serif;color:#071b4a;background:#f4f6fb}*{box-sizing:border-box}
    body{margin:0}.bar{position:sticky;top:0;z-index:3;background:rgba(255,255,255,.96);border-bottom:1px solid #dbe1ef;padding:18px 28px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
    h1{font-size:20px;margin:0 auto 0 0}.count{color:#52617e;font-size:13px}.tools{display:flex;gap:8px;flex-wrap:wrap}input,button,a.doc{border:1px solid #cbd3e5;border-radius:9px;background:#fff;padding:9px 12px;color:#17245f;text-decoration:none;font:inherit}button{cursor:pointer}.active{background:#3130d8!important;color:#fff!important}
    main{padding:24px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px}.card{background:#fff;border:1px solid #dbe1ef;border-radius:13px;overflow:hidden;box-shadow:0 10px 24px rgba(12,31,74,.07)}
    .card>a{display:block;height:210px;overflow:hidden;background:#eef1f8}.card img{width:100%;height:100%;object-fit:cover;object-position:top}.card>div{display:flex;gap:12px;align-items:center;padding:13px}.card b{font-size:13px;line-height:1.35;margin-right:auto}.card div a{font-size:12px;color:#3432d9;white-space:nowrap}.hidden{display:none}
    @media(max-width:650px){.bar{padding:14px}main{padding:14px}.grid{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <header class="bar">
    <h1>SamkhyaAcademy UX Screen Review</h1><span class="count">${pngs.length} files</span>
    <div class="tools">
      <input id="search" placeholder="Search screens…" aria-label="Search screens">
      <button id="all" class="active">All 95</button><button id="top">Top 10</button>
      <a class="doc" href="SCREEN_INVENTORY.md">Inventory</a><a class="doc" href="MARVEL_PROTOTYPE_MAP.md">Marvel map</a>
    </div>
  </header>
  <main><section class="grid">${cards}</section></main>
  <script>
    const cards=[...document.querySelectorAll('.card')], search=document.querySelector('#search');let topOnly=false;
    function filter(){const q=search.value.trim().toLowerCase();cards.forEach(c=>c.classList.toggle('hidden',(topOnly&&Number(c.dataset.screen)>10)||!c.dataset.title.includes(q)))}
    search.addEventListener('input',filter);document.querySelector('#all').onclick=()=>{topOnly=false;all.classList.add('active');top.classList.remove('active');filter()};document.querySelector('#top').onclick=()=>{topOnly=true;top.classList.add('active');all.classList.remove('active');filter()};
  </script>
</body>
</html>`;

await writeFile(path.join(review, "index.html"), html);
await writeFile(
  path.join(review, "README.md"),
  `# SamkhyaAcademy UX review folder\n\nOpen \`index.html\` for the searchable visual gallery. Full-resolution PNGs are in \`screens\`. Inventory and Marvel mapping files are included beside it.\n\nGenerated screenshots: ${pngs.length}.\n`,
);
await writeFile(
  path.join(review, "REVIEW_STATUS.md"),
  `# Review status\n\n- Screens 01–10: remapped where necessary and recaptured from the current implementation.\n- Screens 11–52: retained for visibility, but belong to the earlier capture generation and require the same full visual audit before approval.\n- Screens 53–95: later experience expansion; each still requires reference-by-reference acceptance rather than automatic approval.\n\nA file appearing in this folder means it is available for review, not that it has been approved.\n`,
);

console.log(`Review folder created: ${review}`);
console.log(`Screens copied: ${pngs.length}`);
