import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('output/UX_REVIEW_ASTRA_2026_09_05'),screens=JSON.parse(await readFile(path.join(out,'manifest.json'),'utf8'));
const journeys=[
['Public discovery',[1,2,3,4,6,12,158]],
['Free learning',[85,86,87,112,88,89,113]],
['Video, text and mixed learning',[82,83,84,54,58,69,70]],
['Assessment and certification',[109,21,22,23,24,110,111]],
['Venture idea to review',[9,10,116,117,118,119,120,74,153,154,155,181,182]],
['Founder and investor',[81,25,26,27,146,147,148,149,150,151,157]],
['Organization',[40,41,126,127,128,129,130]],
['Content Admin and Super Admin',[31,62,131,132,95,134,135,94,133,136,137]],
['Operations and commerce',[45,46,47,140,141,50,51,52,138]],
['Community and delivery',[59,60,144,107,108,44,142]]];
const url=n=>'pages/'+String(n).padStart(3,'0')+'.html',name=n=>screens.find(s=>s.n===n)?.name||String(n);
const note='Client review index, separate from the product UI. These are static interactive prototypes, not a production LMS. Video is storyboard media; local demo data and approvals are not server-authorized. A localhost URL works only on the host computer. For remote review, serve this package on an agreed preview host and replace the base URL; no deployment has been performed.';
const md=['# Client UX handoff','',note,'','Local base URL: http://127.0.0.1:4310/','',...journeys.flatMap(([title,ids])=>['## '+title,'',...ids.map(n=>'- ['+name(n)+'](http://127.0.0.1:4310/'+url(n)+')'), '']),'## All screens','',...screens.map(s=>'- '+s.n+' · ['+s.name+'](http://127.0.0.1:4310/'+s.page+')')].join('\n');
await writeFile(path.join(out,'CLIENT_HANDOFF.md'),md);
await writeFile(path.join(out,'CLIENT_URLS.csv'),['screen,title,area,relative_url,local_url',...screens.map(s=>[s.n,s.name,s.area,s.page,'http://127.0.0.1:4310/'+s.page].map(v=>'"'+String(v).replaceAll('"','""')+'"').join(','))].join('\n'));
await writeFile(path.join(out,'CLIENT_HANDOFF.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Client UX handoff</title><link rel="stylesheet" href="assets/fonts.css"><link rel="stylesheet" href="assets/style.css"><main class="screen-gallery"><h1>Client UX handoff</h1><p class="section">${note}</p><div class="actions section"><a class="button primary" href="pages/001.html">Open academy homepage</a><a class="button" href="CLIENT_URLS.csv" download>Download all URLs (CSV)</a><a class="button" href="CLIENT_HANDOFF.md">Written handoff</a><a class="button" href="index.html">Screenshot gallery</a></div><div class="grid2 section">${journeys.map(([title,ids])=>`<section class="card"><h2>${title}</h2><ol>${ids.map(n=>`<li style="margin:8px 0"><a href="${url(n)}">${name(n)}</a> <small>· ${String(n).padStart(3,'0')}.html</small></li>`).join('')}</ol></section>`).join('')}</div></main></html>`);
console.log('Separate HTML, Markdown and CSV client handoffs generated.');
