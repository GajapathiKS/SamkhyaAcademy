import { readFile, access, readdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
import { routes, site, legacyRoutes } from '../site.config.mjs';
const root = resolve(site.staging ? 'dist-test' : 'dist');
let internalLinks = 0;
for (const route of [...routes, '/404.html']) {
 const filename = route.endsWith('.html') ? route.slice(1) : `${route.slice(1)}index.html`;
 const html = await readFile(join(root, filename), 'utf8');
 assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: one h1`);
 assert.match(html, /<title>[^<]+<\/title>/);
 assert.match(html, /name="description"/);
 assert.match(html, /id="main"/);
 assert(!/\.html["']/.test(html.replaceAll('/404.html','')), `${route}: no public .html links`);
 if (!site.domain || site.staging) assert.match(html, /noindex, nofollow/);
 else if (route !== '/404.html') assert(html.includes(`href="${site.domain}${route}"`), `${route}: canonical`);
 for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
  const path = decodeURIComponent(match[1]);
  await access(join(root, path.endsWith('/') ? `${path}index.html` : path));
  internalLinks++;
 }
 for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(html.includes(`id="${id}"`), `${route}: missing anchor ${id}`);
 assert(!/₹|\bINR\b|guaranteed placement|100% placement|lorem ipsum/i.test(html), `${route}: content review`);
 assert(!/weeks\s+\d{2}[–-]\d{2}/i.test(html), `${route}: no public weekly syllabus`);
 for (const [, entries] of html.matchAll(/srcset="([^"]+)"/g)) {
  for (const entry of entries.split(',')) {
   const target = entry.trim().split(/\s+/)[0];
   if (target.startsWith('/')) await access(join(root,target));
  }
 }
 for (const [img] of html.matchAll(/<img\b[^>]+>/g)) {
  assert(/\balt(?:=|\s|>)/.test(img), `${route}: image alt text`);
  assert(/\bwidth=/.test(img) && /\bheight=/.test(img), `${route}: image dimensions`);
 }
}
const enquiry = await readFile(join(root, 'enquire/index.html'),'utf8');
if(site.enquiriesEnabled){assert(enquiry.includes('<iframe'));assert(enquiry.includes(site.customFormUrl));assert(enquiry.includes('form-skeleton'));}else{assert(!enquiry.includes('<iframe') && !enquiry.includes('<form'));}
const publicForm=await readFile(join(root,'forms/internship-enquiry/index.html'),'utf8');
assert(!publicForm.includes('<form') && !publicForm.includes('<script'));
await access(join(root,'.htaccess'));
await access(join(root,'sitemap.xml'));
await access(join(root,'robots.txt'));
const home = await readFile(join(root, 'index.html'), 'utf8');
const fde = await readFile(join(root, 'programs/forward-deployment-engineer/index.html'), 'utf8');
assert(home.includes('FLAGSHIP LEARNING PATH'));
assert(fde.includes(site.enquiriesEnabled?'Enquire about FDE':'Online enquiries unavailable'));
const curriculum = await readFile(join(root, 'programs/forward-deployment-engineer/curriculum/index.html'),'utf8');
assert.equal((curriculum.match(/class="fde-module"/g)||[]).length,8);
for (const label of ['Tools and their purpose','Practical','PRACTICAL WORK','Deliverables','Review criteria','LangGraph','MCP','Langfuse']) if (label !== 'Practical') assert(curriculum.includes(label));
const programSlugs=['ai-engineering-internship','forward-deployment-engineer','space-technology','machine-learning','full-stack-development','fde-for-leaders'];
for (const slug of programSlugs) for (const section of ['', 'curriculum/', 'projects/', 'career-preparation/']) {
 const html=await readFile(join(root,`programs/${slug}/${section}index.html`),'utf8');
 for(const other of programSlugs.filter(s=>s!==slug)) assert(html.includes(`href="/programs/${other}/${section}"`), `Equivalent track switch: ${slug}/${section}`);
 const tabs=html.match(/<nav class="program-tabs"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
 assert(tabs && (tabs.match(/aria-current="page"/g)||[]).length===1);
 for (const suffix of ['', 'curriculum/', 'projects/', 'career-preparation/']) assert(tabs.includes(`/programs/${slug}/${suffix}`));
 if(slug==='forward-deployment-engineer') {
  assert(html.includes(site.enquiriesEnabled?'/enquire/':'Online enquiries unavailable'));
  const body=html.match(/<div data-program="fde"[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert(body && body.includes(site.enquiriesEnabled?'/enquire/':'Online enquiries unavailable') && !/DSA|campus knowledge copilot|Think in Python/.test(body));
 }
}
const sitemap=await readFile(join(root,'sitemap.xml'),'utf8');
const htaccess=await readFile(join(root,'.htaccess'),'utf8');
for (const [old, destination] of Object.entries(legacyRoutes)) {
 const html=await readFile(join(root,old,'index.html'),'utf8');
 assert(html.includes('noindex, nofollow') && html.includes(`href="${destination}"`));
 assert(htaccess.includes(`^${old.slice(0,-1)}/?$ ${destination}`));
 if(site.domain) assert(!sitemap.includes(`<loc>${site.domain}${old}</loc>`));
}

assert(!fde.includes('<iframe') && !fde.includes('<form'));
const upcomingCard = (home.match(/<article class="active-program"[^>]*>[\s\S]*?<\/article>/g) || []).find(card => card.includes('Forward Deployment Engineering'));
assert(upcomingCard && !upcomingCard.includes('/enquire/'));
assert(home.indexOf('FLAGSHIP LEARNING PATH') < home.indexOf('>LEARNING PATH<'));
const draftPrograms = [];
for (const filename of await readdir('src/content/programs')) {
 const markdown = await readFile(join('src/content/programs', filename), 'utf8');
 if (/^status: draft$/m.test(markdown)) draftPrograms.push({title: markdown.match(/^title: (.+)$/m)?.[1], href: markdown.match(/^href: (.+)$/m)?.[1]});
}
const teaching = await readFile('teaching/detailed-curriculum.ts','utf8');
const privateExercises = [...teaching.matchAll(/exercise: '([^']+)'/g)].map(m => m[1]);
async function reviewOutput(dir) {
 for (const item of await readdir(dir, {withFileTypes:true})) {
  const file = join(dir,item.name);
  if (item.isDirectory()) { assert(item.name !== 'teaching'); await reviewOutput(file); }
  else if (/\.(html|js|json|xml|txt)$/.test(item.name)) {
   const text = await readFile(file,'utf8');
   for (const draft of draftPrograms) for (const value of [draft.title, draft.href]) if (value) assert(!text.includes(value), `Draft program leaked: ${file}`);
   for (const exercise of privateExercises) assert(!text.includes(exercise), `Private teaching exercise leaked: ${file}`);
  }
 }
}
await reviewOutput(root);
for (const image of await readdir(join(root,'images'))) assert((await stat(join(root,'images',image))).size < 250*1024, `${image}: image budget`);
for (const file of await readdir(join(root,'_astro'))) if (file.endsWith('.css')) {
 const css = await readFile(join(root,'_astro',file),'utf8');
 for (const [, font] of css.matchAll(/url\(["']?(\/fonts\/[^)"']+)/g)) await access(join(root,font));
}
console.log(`PASS: ${routes.length} pages + 404; ${internalLinks} internal asset/link targets; responsive images, metadata, hosting files, private syllabus exclusion, and draft program exclusion.`);

const space=await readFile(join(root,'programs/space-technology/curriculum/index.html'),'utf8');
assert.equal((space.match(/class="fde-module"/g)||[]).length,8);
for(const term of ['Tools and their purpose','Deliverables','Review criteria','Telemetry','telemetry','Python']) assert(space.includes(term));
const idea=await readFile(join(root,'venture-studio/submit/index.html'),'utf8');
if(site.ventureIntakeEnabled&&site.ideaFormUrl){assert(idea.includes('custom-enquiry-frame')&&idea.includes('form=venture'));assert(idea.includes('non-confidential')&&idea.includes('/privacy/')&&idea.includes('/terms/'));}else{assert(!idea.includes('custom-enquiry-frame')&&!idea.includes('<form'));}
assert(!idea.includes('action="https:'));
for(const link of ['/programs/space-technology/','/venture-studio/']) assert(home.includes(link));
console.log('PASS: Space modules, all track switches, status-aware secure venture route and discovery links.');
