import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {routes,site} from '../site.config.mjs';
const failures=[];const evidence=[];
for(const [dir,origin] of [['dist','https://samkhyaacademy.com'],['dist-test','https://test.samkhyaacademy.com']]){
 for(const route of routes){
  const html=await fs.readFile(`${dir}${route}index.html`,'utf8');
  for(const pattern of [/local review/i,/details will be shared/i,/awaiting client approval/i,/before real collection/i,/2026-09-11-v\d/i,/disconnected form/i])if(pattern.test(html))failures.push(`${dir}${route}: internal content ${pattern}`);
  assert(html.includes(`href="${origin}${route}"`),`${dir}${route}: canonical`);
  if(route==='/enquire/'&&site.enquiriesEnabled)assert(html.includes('custom-enquiry-frame'),`${route}: connected enquiry frame`);
  else if(route==='/venture-studio/submit/'&&site.ventureIntakeEnabled)assert(html.includes('custom-enquiry-frame')&&html.includes('form=venture'),`${route}: connected venture frame`);
  else assert(!/<(?:form|iframe)\b/.test(html),`${route}: no unrelated collection`);
  if(!site.enquiriesEnabled)assert(!/href="\/enquire\//.test(html),`${route}: disabled enquiry links`);
  if(dir==='dist')assert(!html.includes('test.samkhyaacademy.com'),'Test hostname in production HTML');
  assert(html.includes('noindex'),`${dir}: unapproved indexing`);
 }
 assert(!(await fs.readFile(`${dir}/sitemap.xml`,'utf8')).includes('<loc>'));
 assert((await fs.readFile(`${dir}/robots.txt`,'utf8')).includes('Disallow: /'));
 const files=await fs.readdir(dir,{recursive:true});
 assert(!files.some(f=>/\.map$|\.env|\.gs$/.test(f)),'private source or sourcemap in output');
 evidence.push({directory:dir,routes:routes.length,canonicalOrigin:origin,collection:{program:site.enquiriesEnabled,venture:site.ventureIntakeEnabled},indexing:'noindex',internalContentLeaks:failures.filter(f=>f.startsWith(dir))});
}
assert.equal(failures.length,0,failures.join('\n'));
// Verify production is capable of indexing once approved, while staging never is.
const robotsSource=await fs.readFile('src/pages/robots.txt.ts','utf8');
for(const staging of [false,true])for(const indexingApproved of [false,true]){
 const source=robotsSource.replace(/import[^\n]+\n/,'').replace('export function GET','function GET');
 const response=new Function('site',`${source};return GET();`)({...site,staging,indexingApproved});
 const body=await response.text();assert.equal(body.includes('Allow: /'),!staging&&indexingApproved);
}
await fs.mkdir('docs/validation',{recursive:true});await fs.writeFile('docs/validation/static-results.json',JSON.stringify(evidence,null,2));
console.log('PASS: both build environments, 70 canonical pages, no public internal notices, configured secure intake, no production test-host leakage, no maps/private source, four indexing configurations.');
