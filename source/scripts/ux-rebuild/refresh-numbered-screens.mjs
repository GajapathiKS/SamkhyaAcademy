import {chromium} from 'playwright';
import {readdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const root=path.resolve(process.argv[2]),browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1440,height:1000}});
for(const file of (await readdir(path.join(root,'pages'))).filter(f=>/^\d+\.html$/.test(f))){
 await page.goto(pathToFileURL(path.join(root,'pages',file)).href);await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:path.join(root,'screens',file.replace('.html','.png')),fullPage:true});
}
await browser.close();console.log('Refreshed 183 numbered screenshots');
