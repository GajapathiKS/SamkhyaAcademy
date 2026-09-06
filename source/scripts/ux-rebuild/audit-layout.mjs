import {chromium} from 'playwright';
import {readdir,writeFile,mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const root=path.resolve(process.argv[2]),browser=await chromium.launch();
const files=(await readdir(path.join(root,'pages'))).filter(n=>n.endsWith('.html')&&(!process.argv[3]||process.argv[3].split(',').includes(n))),issues=[];
await mkdir(path.join(root,'layout-qa'),{recursive:true});
for(const width of [1440,1280,768,390]){
 const page=await browser.newPage({viewport:{width,height:1000}});
 for(const file of files){
  await page.goto(pathToFileURL(path.join(root,'pages',file)).href);
  const findings=await page.evaluate(()=>{
   const bad=[];
   if(document.documentElement.scrollWidth>innerWidth+2){
    const els=[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.right>innerWidth+2&&!e.closest('.table-wrap,pre,.editor-pane,.intake-steps,.side nav');}).slice(0,5);
    bad.push('Page overflow: '+els.map(e=>e.tagName+'.'+e.className+' parent='+e.parentElement.className+' text='+e.textContent.slice(0,80)).join(', '));
   }
   const head=document.querySelector('.topbar'),r=head?.getBoundingClientRect();
   if(head)for(const el of head.children){const b=el.getBoundingClientRect();if(b.width&& (b.right>innerWidth+1||b.top<r.top-1||b.bottom>r.bottom+1))bad.push('Header escapes: '+el.className);}
   for(const el of document.querySelectorAll('input[type=radio],input[type=checkbox]')){const b=el.getBoundingClientRect();if(b.width&&(b.width>24||b.height>24))bad.push('Oversized selection control');}
   return bad;
  });
  if(findings.length)issues.push({file,width,findings});
  if(['001.html','010.html','031.html','096.html','147.html','lesson-space-tech.html'].includes(file)){
   await page.evaluate(()=>document.fonts.ready);
   await page.screenshot({path:path.join(root,'layout-qa',file.replace('.html','')+'-'+width+'.png'),fullPage:true});
  }
 }
 await page.goto(pathToFileURL(path.join(root,'pages','001.html')).href);
 if(width<=1350){await page.locator('.nav-toggle').click();if(!await page.locator('#primary-nav').isVisible())throw Error('Menu not visible '+width);await page.locator('.nav-dropdown summary').first().click();if(!await page.locator('.nav-panel').first().isVisible())throw Error('Dropdown not visible '+width);await page.keyboard.press('Escape');if(await page.locator('#primary-nav').isVisible())throw Error('Escape failed '+width);}
 await page.close();console.log('Audited '+files.length+' pages at '+width+'px');
}
await browser.close();
await writeFile(path.join(root,'layout-qa/results.json'),JSON.stringify({pages:files.length,widths:[1440,1280,768,390],issues},null,2));
console.log(JSON.stringify(issues,null,2));
if(issues.length)process.exitCode=1;
