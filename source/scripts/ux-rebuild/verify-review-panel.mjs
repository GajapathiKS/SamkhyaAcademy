import {chromium} from 'playwright';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('output/UX_REVIEW_ASTRA_2026_09_05'),base='http://127.0.0.1:4310',browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1440,height:1000},acceptDownloads:true});const results=[];
for(const route of ['/','/pages/001.html']){
 await page.goto(base+route,{waitUntil:'networkidle'});const panel=page.locator('.client-review');if(await panel.count()!==1)throw Error('Review panel missing');
 for(const a of await panel.locator('a').all()){const url=new URL(await a.getAttribute('href'),page.url()).href;const response=await page.request.get(url);if(!response.ok())throw Error('Broken link '+url);}
 const event=page.waitForEvent('download');await panel.getByRole('link',{name:'Download all 12 PDFs',exact:true}).click();const d=await event;if(await d.failure())throw Error('ZIP download failed');
 await panel.screenshot({path:path.join(out,'screens',route==='/'?'gallery-review-links.png':'homepage-review-links.png')});
 await page.setViewportSize({width:390,height:844});await page.reload();if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))throw Error('Mobile overflow '+route);
 await panel.screenshot({path:path.join(out,'responsive',route==='/'?'gallery-review-links-390.png':'homepage-review-links-390.png')});
 await page.setViewportSize({width:1440,height:1000});results.push({route,status:'PASS',checks:'All review links resolve; ZIP downloads; mobile layout fits'});
}
await browser.close();await writeFile(path.join(out,'client-review-results.json'),JSON.stringify(results,null,2));console.log(results);
