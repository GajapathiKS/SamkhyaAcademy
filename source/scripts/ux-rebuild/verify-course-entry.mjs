import {chromium} from 'playwright';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {courseIds} from './data.mjs';
import {lessonUrl} from './course-lesson-routes.mjs';
const root=path.resolve(process.argv[2]),browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1440,height:1000}});
const go=n=>page.goto(pathToFileURL(path.join(root,'pages',String(n).padStart(3,'0')+'.html')).href);
const examples={86:[87],88:[89],6:[82],90:[91]};
for(const [n,targets] of Object.entries(examples)){
 await go(2);await page.locator('main a[href="'+String(n).padStart(3,'0')+'.html"]').first().click();
 for(const dest of targets){
  await page.locator('.rich-hero a[href="'+String(dest).padStart(3,'0')+'.html"]').click();
  if(!page.url().endsWith(String(dest).padStart(3,'0')+'.html'))throw Error('Wrong lesson');
  await go(n);
 }
 console.log('PASS catalog -> '+n+' -> '+targets.join(','));
}
for(const n of [4,5,11,12,13,14,15,16,17,86,88,90,6,102]){
 await go(n);await page.evaluate(()=>document.fonts.ready);
 if(await page.locator('.rich-hero .actions a:not([download])').count()!==1)throw Error('Expected one lesson CTA '+n);
 if(await page.locator('.rich-hero').getByRole('link',{name:'Go to lesson',exact:true}).count()!==1)throw Error('Expected neutral lesson label '+n);
 if(n!==86&&n!==88&&n!==90&&n!==6&&n!==102){
  await page.getByRole('link',{name:'Go to lesson',exact:true}).click();
  if(!page.url().endsWith(lessonUrl(courseIds[n])))throw Error('Missing dedicated lesson');
  await go(n);
 }
 await page.screenshot({path:path.join(root,'screens',String(n).padStart(3,'0')+'.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))throw Error('Mobile overflow '+n);
 await page.setViewportSize({width:1440,height:1000});
}
await browser.close();console.log('PASS 14 course pages: single Go to lesson CTA, correct destination and mobile width');
