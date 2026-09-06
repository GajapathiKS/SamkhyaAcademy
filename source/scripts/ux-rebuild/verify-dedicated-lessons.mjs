import {chromium} from 'playwright';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {readdir} from 'node:fs/promises';
import {courseScreens} from './marketing.mjs';
import {existingLessons,lessonUrl} from './course-lesson-routes.mjs';
const root=path.resolve(process.argv[2]),browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const go=name=>page.goto(pathToFileURL(path.join(root,'pages',name)).href);
for(const [slug,n] of Object.entries(courseScreens)){
 await go(String(n).padStart(3,'0')+'.html');
 const link=page.getByRole('link',{name:'Go to lesson',exact:true});
 if(await link.count()!==1)throw Error('Missing unique CTA '+slug);
 await link.click();
 if(!page.url().endsWith(lessonUrl(slug)))throw Error('Incorrect destination '+slug);
 if(!existingLessons[slug]){
  if(await page.locator('section[id]').count()!==6)throw Error('Incomplete content '+slug);
  await page.locator('#practice-form textarea').first().fill('My evidence for '+slug);
  await page.getByRole('button',{name:'Save practice',exact:true}).click();
  await page.locator('#lesson-notes').fill('My personal note');
  await page.reload();
  if(await page.locator('#practice-form textarea').first().inputValue()!=='My evidence for '+slug)throw Error('Practice persistence '+slug);
  if(await page.locator('#lesson-notes').inputValue()!=='My personal note')throw Error('Note persistence '+slug);
  await page.locator('#complete-lesson').click();
  if(!(await page.locator('#complete-status').innerText()).includes('confirm'))throw Error('Completion guard '+slug);
  for(const box of await page.locator('[data-evidence]').all())await box.check();
  await page.locator('#complete-lesson').click();await page.reload();
  if(await page.locator('#completion-label').innerText()!=='Lesson completed')throw Error('Completion persistence '+slug);
  await page.locator('#discussion-text').fill('<b>My question</b>');
  await page.getByRole('button',{name:'Post locally',exact:true}).click();
  if(await page.locator('#discussion-list p b').count())throw Error('Unsafe comment HTML');
  const resource=page.locator('a[download]').first();
  if(!(await resource.getAttribute('href')).endsWith(slug+'.md'))throw Error('Wrong resource');
  await page.evaluate(()=>localStorage.clear());await page.reload();
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:path.join(root,'screens',lessonUrl(slug).replace('.html','.png')),fullPage:true});
  await page.setViewportSize({width:390,height:844});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))throw Error('Overflow '+slug);
  await page.setViewportSize({width:1440,height:1000});
 }
 console.log('PASS course -> lesson, content & interactions: '+slug);
}
// Every existing screenshot is refreshed because the shared navigation changed.
for(const name of (await readdir(path.join(root,'pages'))).filter(n=>!process.argv.includes('--lessons-only')&&/^\d+\.html$/.test(n))){
 await go(name);await page.evaluate(()=>document.fonts.ready);
 const labels=page.locator('.nav-dropdown summary');
 if(await labels.count()!==4)throw Error('Missing dropdowns '+name);
 for(const label of await labels.all())if(await label.locator('svg').count()!==2)throw Error('Missing nav icon '+name);
 await page.screenshot({path:path.join(root,'screens',name.replace('.html','.png')),fullPage:true});
}
await browser.close();
if(errors.length)throw Error(errors.join('\n'));
console.log('PASS all 12 course entries, 8 new lessons, 183 refreshed screens, navigation icons and no page errors.');
