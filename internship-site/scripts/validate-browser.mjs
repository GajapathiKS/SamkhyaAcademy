import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import {routes,legacyRoutes} from '../site.config.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const axe=process.env.AXE_SCRIPT || require.resolve('axe-core/axe.min.js');
const base=process.env.VALIDATION_URL || 'http://127.0.0.1:4325';
const out='docs/validation';await fs.mkdir(out,{recursive:true});
const results=[];
const browser=await chromium.launch({channel:'chrome',headless:true});
console.log('Browser:',browser.version());
const ctx=await browser.newContext();const page=await ctx.newPage();
let errors=[];page.on('pageerror',e=>errors.push(e.message));
const tested=[...routes,...Object.keys(legacyRoutes),'/404.html'];
for(const width of [320,667,768,1366,1920]){
 await page.setViewportSize({width,height:width===667?375:900});
 for(const path of tested){
  errors=[];const response=await page.goto(base+path,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{for(const image of document.images){image.loading='eager';}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await document.fonts.ready;});
  const row=await page.evaluate(()=>({path:location.pathname,width:innerWidth,h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),forms:document.querySelectorAll('form,iframe').length,intakeLinks:[...document.querySelectorAll('a[href]')].filter(a=>/^\/(enquire\/|venture-studio\/submit\/)/.test(a.getAttribute('href'))).map(a=>a.getAttribute('href')),title:document.title,canonical:document.querySelector('link[rel=canonical]')?.getAttribute('href'),robots:document.querySelector('meta[name=robots]')?.getAttribute('content')}));
  row.status=response.status();row.errors=[...errors];
  if((width===320||width===1366)&&!Object.keys(legacyRoutes).includes(path)){
   await page.addScriptTag({path:axe});
   row.axe=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:r.incomplete.map(v=>({id:v.id,count:v.nodes.length}))};});
  }
  if([320,1366].includes(width)&&['/','/programs/','/programs/ai-engineering-internship/','/programs/forward-deployment-engineer/','/contact/','/enquire/','/privacy/','/venture-studio/submit/'].includes(path))await page.screenshot({path:`${out}/${path==='/'?'home':path.replaceAll('/','-')}-${width}.png`,fullPage:true});
  results.push(row);
 }
 console.log('Completed width',width,'routes',tested.length);
 await fs.writeFile(`${out}/browser-results.json`,JSON.stringify({browser:browser.version(),base,results},null,2));
}
const interactions=[];
await page.setViewportSize({width:390,height:844});await page.goto(base);
await page.keyboard.press('Tab');interactions.push({test:'First Tab is skip link',pass:await page.locator('.skip').evaluate(e=>e===document.activeElement)});
await page.keyboard.press('Enter');interactions.push({test:'Skip focuses main',pass:await page.locator('#main').evaluate(e=>e===document.activeElement)});
const summary=page.locator('.mobile-nav summary');await summary.focus();await page.keyboard.press('Enter');await page.waitForTimeout(50);
interactions.push({test:'Menu keyboard open and expanded',pass:await summary.getAttribute('aria-expanded')==='true'});
await page.keyboard.press('Tab');interactions.push({test:'Menu next Tab reaches first link',pass:await page.locator('.mobile-nav a').first().evaluate(e=>e===document.activeElement)});
await page.keyboard.press('Escape');await page.waitForTimeout(50);interactions.push({test:'Escape closes menu and returns focus',pass:await page.locator('.mobile-nav').evaluate(e=>!e.open&&document.activeElement===e.querySelector('summary'))});
await page.goto(base+'/faqs/');const faq=page.locator('main details').first();await faq.locator('summary').focus();await page.keyboard.press('Enter');interactions.push({test:'FAQ native disclosure Enter toggles',pass:await faq.evaluate(e=>e.open)});await page.keyboard.press('Space');interactions.push({test:'FAQ native disclosure Space toggles',pass:await faq.evaluate(e=>!e.open)});
await page.goto(base+'/programs/');await page.locator('.comparison').focus();interactions.push({test:'Comparison keyboard focus',pass:await page.locator('.comparison').evaluate(e=>document.activeElement===e)});
await page.emulateMedia({reducedMotion:'reduce'});interactions.push({test:'Reduced motion enabled',pass:await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches)});
await page.goto(base+'/enquire/?program=fde');await ctx.setOffline(true);interactions.push({test:'Offline enquiry has no submission controls',pass:await page.locator('form,iframe,input,button[type=submit]').count()===0});await ctx.setOffline(false);
await fs.writeFile(`${out}/interactions.json`,JSON.stringify(interactions,null,2));
// Chromium's CSS viewport at half desktop width is the reflow equivalent of 200% browser zoom.
await page.setViewportSize({width:683,height:450});for(const path of ['/','/programs/','/contact/','/enquire/']){await page.goto(base+path);interactions.push({test:'200% equivalent reflow '+path,pass:await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)});}
await fs.writeFile(`${out}/interactions.json`,JSON.stringify(interactions,null,2));
await browser.close();
const edge=await chromium.launch({channel:'msedge',headless:true});const ep=await edge.newPage();const edgeResults=[];
for(const path of tested){const r=await ep.goto(base+path);edgeResults.push({path,status:r.status(),h1:await ep.locator('h1').count()});}
await fs.writeFile(`${out}/edge-results.json`,JSON.stringify({browser:edge.version(),results:edgeResults},null,2));await edge.close();
const failures=results.filter(r=>r.status!==200||r.overflow||r.h1!==1||r.brokenImages.length||r.errors.length||r.intakeLinks.length||r.axe?.violations.length);
console.log(JSON.stringify({checks:results.length,failures:failures.length,failedInteractions:interactions.filter(x=>!x.pass)},null,2));
process.exitCode=failures.length||interactions.some(x=>!x.pass)?1:0;
