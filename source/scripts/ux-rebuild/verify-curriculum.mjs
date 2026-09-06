import {chromium} from 'playwright';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {courseScreens} from './marketing.mjs';
const root=path.resolve(process.argv[2]),plans=JSON.parse(await readFile(path.join(root,'CURRICULUM_ALIGNMENT.json'),'utf8'));
const browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
const go=file=>page.goto(pathToFileURL(path.join(root,'pages',file)).href);
let lessonCount=0;
for(const plan of plans){
 await go(String(courseScreens[plan.slug]).padStart(3,'0')+'.html');
 if(await page.locator('.rich-hero').getAttribute('data-curriculum-version')!==plan.version)throw Error('Landing version '+plan.slug);
 await page.getByRole('link',{name:'Go to lesson',exact:true}).click();
 if(!page.url().endsWith(plan.modules[0].lessons[0].file))throw Error('Entry '+plan.slug);
 const all=plan.modules.flatMap(m=>m.lessons);
 for(const [i,l] of all.entries()){
  await go(l.file);await page.evaluate(()=>document.fonts.ready);
  if(await page.locator('body').getAttribute('data-curriculum-version')!==plan.version)throw Error('Lesson version '+l.file);
  if(await page.locator('nav[aria-label="Course modules"] a').count()!==all.length)throw Error('Incomplete module nav');
  if(await page.locator('.module-workspace .module').count()!==plan.modules.length)throw Error('Module count');
  if(await page.locator('.lesson-lead').innerText()===''||!await page.getByRole('heading',{name:l.title,exact:true}).count())throw Error('Empty lesson');
  if(i+1<all.length&&await page.getByRole('link',{name:'Next lesson',exact:true}).first().getAttribute('href')!==all[i+1].file)throw Error('Wrong next');
  await page.screenshot({path:path.join(root,'screens',l.file.replace('.html','.png')),fullPage:true});
  await page.setViewportSize({width:390,height:844});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))throw Error('Overflow '+l.file);
  await page.setViewportSize({width:1440,height:1000});
  lessonCount++;
 }
 await go(all[0].file);await page.evaluate(()=>localStorage.clear());await page.reload();
 await page.getByRole('tab',{name:'Notes',exact:true}).click();await page.locator('#lesson-notes').fill('Lesson-specific note');
 await page.getByRole('tab',{name:'Assignment',exact:true}).click();await page.locator('#practice-form textarea').first().fill('Module evidence');await page.getByRole('button',{name:'Save assignment',exact:true}).click();
 await page.locator('#complete-lesson').click();if(!(await page.locator('#lesson-status').innerText()).includes('Confirm'))throw Error('Completion guard');
 await page.locator('#reviewed').check();await page.locator('#complete-lesson').click();
 await go(all[1].file);
 await page.getByRole('tab',{name:'Notes',exact:true}).click();if(await page.locator('#lesson-notes').inputValue()!=='')throw Error('Notes leaked across lessons');
 await page.getByRole('tab',{name:'Assignment',exact:true}).click();if(await page.locator('#practice-form textarea').first().inputValue()!=='Module evidence')throw Error('Module work not shared');
 await go(all[0].file);if(await page.locator('#progress-label').innerText()==='0%')throw Error('Progress lost');
 await page.getByRole('tab',{name:'Notes',exact:true}).click();if(await page.locator('#lesson-notes').inputValue()!=='Lesson-specific note')throw Error('Note lost');
 await page.getByRole('tab',{name:'Q&A',exact:true}).click();await page.locator('#discussion-text').fill('<b>My question</b>');await page.getByRole('button',{name:'Post locally'}).click();if(await page.locator('#discussion-list b').count())throw Error('Unsafe discussion');
 await page.evaluate(()=>localStorage.clear());
 console.log('PASS '+plan.slug+': '+plan.modules.length+' modules, '+all.length+' lessons and local interactions');
}
await browser.close();if(errors.length)throw Error(errors.join('\n'));
await writeFile(path.join(root,'CURRICULUM_TEST_RESULTS.json'),JSON.stringify({courses:plans.length,modules:plans.reduce((n,p)=>n+p.modules.length,0),lessons:lessonCount,errors},null,2));
console.log('PASS all curriculum pages and interactions');
