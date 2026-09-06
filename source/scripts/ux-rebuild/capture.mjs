import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('output/UX_REVIEW_ASTRA_2026_09_05');
const manifest=JSON.parse(await readFile(path.join(out,'manifest.json'),'utf8'));
const ids=process.argv.find(a=>a.startsWith('--screens='))?.split('=')[1].split(',').map(Number);
const selected=ids?manifest.filter(s=>ids.includes(s.n)):manifest;
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const results=[],hotspots=[];
for(const s of selected){const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(`http://127.0.0.1:4310/${s.page}`,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 const audit=await page.evaluate(()=>{const broken=[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src);const nodes=[...document.querySelectorAll('main *')];const tiny=nodes.filter(el=>el.children.length===0&&el.textContent.trim()&&!el.closest('svg')&&el.getBoundingClientRect().width&&parseFloat(getComputedStyle(el).fontSize)<11).map(el=>({text:el.textContent.trim().slice(0,50),size:getComputedStyle(el).fontSize}));const overflow=[...document.querySelectorAll('main *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+2||r.left< -2)&&!el.closest('.table-wrap,.tabs,.toplinks');}).slice(0,10).map(el=>({tag:el.tagName,class:el.className}));return{h1:document.querySelector('h1')?.textContent,height:document.documentElement.scrollHeight,width:document.documentElement.scrollWidth,broken,tiny,overflow,font:getComputedStyle(document.body).fontFamily};});
 const hs=await page.evaluate(()=>[...document.querySelectorAll('a[data-destination]')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0;}).map(el=>{const r=el.getBoundingClientRect();return{label:el.textContent.trim()||el.getAttribute('aria-label'),destination:el.dataset.destination,x:Math.round(r.x),y:Math.round(r.y+scrollY),width:Math.round(r.width),height:Math.round(r.height)};}));hotspots.push(...hs.map(h=>({screen:s.n,...h})));
 await page.screenshot({path:path.join(out,s.screenshot),fullPage:true});results.push({screen:s.n,...audit,errors});await page.close();console.log(`${s.n}: ${audit.height}px · ${audit.tiny.length} tiny · ${audit.overflow.length} overflow · ${errors.length} errors`);
}
await browser.close();await writeFile(path.join(out,ids?'sample-audit.json':'visual-audit.json'),JSON.stringify(results,null,2));
if(!ids){const csv=['screen,control,destination,x,y,width,height',...hotspots.map(h=>[h.screen,h.label,h.destination,h.x,h.y,h.width,h.height].map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(','))];await writeFile(path.join(out,'MARVEL_PROTOTYPE_MAP.csv'),csv.join('\n'));await writeFile(path.join(out,'MARVEL_PROTOTYPE_MAP.md'),'# Connected prototype hotspots\n\nCoordinates refer to the 1440px full-page PNG. Production services are not connected.\n\n| Screen | Control | Destination | Position |\n|---:|---|---:|---|\n'+hotspots.map(h=>`| ${h.screen} | ${h.label} | ${h.destination} | ${h.x}, ${h.y}, ${h.width} × ${h.height} |`).join('\n'));}
if(results.some(r=>r.errors.length||r.broken.length||r.tiny.length||r.overflow.length))process.exitCode=1;
