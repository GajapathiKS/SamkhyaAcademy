import {chromium} from 'playwright';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {courseScreens} from './marketing.mjs';
const out=path.resolve('output/UX_REVIEW_ASTRA_2026_09_05'),base='http://127.0.0.1:4310',browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1440,height:1000}}),results=[];
await page.goto(base+'/pages/001.html');if(await page.locator('.client-review').count())throw Error('Review directory remains on product homepage');
results.push({name:'Product homepage has no review directory',status:'PASS'});
for(const [slug,n] of Object.entries(courseScreens)){
 await page.goto(base+'/pages/'+String(n).padStart(3,'0')+'.html');const section=page.locator('#teaching-example');
 if((await section.innerText()).length<1000)throw Error('Sample too thin '+slug);
 await section.locator('summary').click();if(!await section.locator('details p').isVisible())throw Error('Knowledge check failed');
 await page.setViewportSize({width:390,height:844});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))throw Error('Mobile overflow '+slug);
 await page.setViewportSize({width:1440,height:1000});results.push({name:slug+' teaching example, knowledge check and mobile reflow',status:'PASS'});
}
await page.goto(base+'/CLIENT_HANDOFF.html');for(const a of await page.locator('a').all()){const u=new URL(await a.getAttribute('href'),page.url()).href;if(!(await page.request.get(u)).ok())throw Error('Broken handoff URL '+u);}
const csv=await readFile(path.join(out,'CLIENT_URLS.csv'),'utf8');if(csv.trim().split('\n').length!==184)throw Error('URL inventory count incorrect');
results.push({name:'Separate handoff links and all 183 URLs',status:'PASS'});await browser.close();await writeFile(path.join(out,'content-depth-results.json'),JSON.stringify(results,null,2));console.log(results.length+' checks passed');
