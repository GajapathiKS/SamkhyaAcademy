import {chromium} from 'playwright';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const root=path.resolve(process.argv[2]),browser=await chromium.launch();
for(const width of [1440,768,390]){
 const page=await browser.newPage({viewport:{width,height:1100}});
 await page.goto(pathToFileURL(path.join(root,'pages/011.html')).href);
 await page.evaluate(()=>document.fonts.ready);
 const facts=page.locator('.rich-copy>.facts');
 const measurements=await facts.evaluate(el=>({gap:el.getBoundingClientRect().top-el.previousElementSibling.getBoundingClientRect().bottom,rows:[...el.children].map(e=>({display:getComputedStyle(e).display,gap:getComputedStyle(e).gap}))}));
 if(measurements.gap<18||measurements.rows.some(r=>r.display!=='flex'||r.gap!=='9px'))throw Error(JSON.stringify(measurements));
 await page.locator('.rich-copy').screenshot({path:path.join(root,`layout-qa/course-facts-${width}.png`)});
 console.log('PASS course facts',width,measurements);
 await page.close();
}
await browser.close();
