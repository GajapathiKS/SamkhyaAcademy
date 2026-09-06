import {chromium} from 'playwright';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('output/UX_REVIEW_ASTRA_2026_09_05'),base='http://127.0.0.1:4310';
const browser=await chromium.launch();const page=await browser.newPage({acceptDownloads:true,viewport:{width:1440,height:1000}});const results=[];
const check=(v,m)=>{if(!v)throw Error(m);};const open=n=>page.goto(base+'/pages/'+String(n).padStart(3,'0')+'.html');
await open(158);
const downloads=page.locator('a[download][href$=".pdf"]');check(await downloads.count()===12,'Expected 12 direct PDFs');
for(let i=0;i<12;i++){const a=downloads.nth(i),href=await a.getAttribute('href');const event=page.waitForEvent('download');await a.click();const d=await event;check(!await d.failure(),'Download failed');const response=await page.request.get(new URL(href,page.url()).href);check((await response.body()).subarray(0,5).toString()==='%PDF-','Invalid PDF');results.push({name:href,status:'PASS'});}
const zipEvent=page.waitForEvent('download');await page.getByRole('link',{name:'Download all brochures (ZIP)',exact:true}).click();const zip=await zipEvent;check(!await zip.failure(),'ZIP download failed');results.push({name:'One-click all-brochures ZIP',status:'PASS'});
await open(183);
for(const n of [87,82,83,84,89,91,109,21,23,24,22,110,111]){const a=page.locator('main a[href="'+String(n).padStart(3,'0')+'.html"]').first();check(await a.count()>0,'Missing example '+n);await a.click();check(await page.locator('h1').count()>0,'No page heading '+n);await page.goBack();}results.push({name:'Learning format and certificate examples accessible',status:'PASS'});
await page.setViewportSize({width:390,height:844});for(const n of [183,158]){await open(n);check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Mobile overflow '+n);await page.screenshot({path:path.join(root,'responsive',n+'-direct-390.png'),fullPage:true});}results.push({name:'Library and experience hub mobile reflow',status:'PASS'});
await browser.close();await writeFile(path.join(root,'direct-access-results.json'),JSON.stringify(results,null,2));console.log(results.length+' direct-access checks passed');
