import {copyFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {courseCatalog} from '../../packages/catalog/src/index.ts';
import {marketing,conceptSvg} from './marketing.mjs';
const dest=path.resolve('output/UX_REVIEW_ASTRA_2026_09_05/assets/course-visuals');await mkdir(dest,{recursive:true});
const fresh=['applied-ml-engineering.png','data-analytics.png','programming-foundations.png','dsa-graph.svg'];
for(const file of new Set(Object.values(marketing).map(m=>m.image))){const source=path.resolve(fresh.includes(file)?'scripts/ux-rebuild/assets':'apps/web/public/brochures/assets',file);await copyFile(source,path.join(dest,file));}
for(const c of courseCatalog)await writeFile(path.join(dest,`${c.slug}-roadmap.svg`),conceptSvg(c));
await copyFile('scripts/ux-rebuild/assets/IMAGE_PROMPTS.md',path.join(dest,'IMAGE_PROMPTS.md'));
console.log('Course hero assets and twelve SVG roadmaps prepared.');
