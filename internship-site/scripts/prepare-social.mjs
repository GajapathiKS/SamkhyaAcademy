import fs from 'node:fs/promises';import sharp from 'sharp';import {routes,site} from '../site.config.mjs';
const out=site.staging?'dist-test':'dist';
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
await fs.mkdir('public/images/social',{recursive:true});
await sharp('public/favicon.svg').resize(512,512).png().toFile('public/images/academy-logo.png');await fs.copyFile('public/images/academy-logo.png',`${out}/images/academy-logo.png`);
for(const path of [...routes,'/404/']){
 const file=path==='/404/'?`${out}/404.html`:`${out}${path}index.html`;const html=await fs.readFile(file,'utf8');const title=html.match(/<title>(.*?)<\/title>/)?.[1].replace(/ \| SamkhyaAcademy$/,'').replaceAll('&amp;','&')||'SamkhyaAcademy';
 const slug=path==='/'?'academy':path.replace(/^\/|\/$/g,'').replaceAll('/','-');
 const name=path.includes('space-technology')?'space-tech':path.includes('venture')?'venture-studio':path.includes('fde-for-leaders')?'ai-leadership':path.includes('machine-learning')?'machine-learning':path.includes('full-stack-development')?'full-stack':path.includes('forward-deployment')?'fde-learning':path.includes('ai-engineering')?'ai-engineering':'academy-workshop';
 const words=title.split(' '),lines=[];let line='';for(const w of words){if((line+' '+w).length>27){lines.push(line);line=w}else line+=(line?' ':'')+w}if(line)lines.push(line);
 const svg=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="fade"><stop stop-color="#102c56"/><stop offset=".52" stop-color="#102c56"/><stop offset=".85" stop-color="#102c56" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="630" fill="url(#fade)"/><path d="M0 570Q420 400 820 570T1400 420" stroke="#53a4df" stroke-opacity=".25" stroke-width="60" fill="none"/><text x="58" y="90" font-family="Arial" font-size="29" fill="#9fd9ff">SamkhyaAcademy</text>${lines.map((l,i)=>`<text x="58" y="${190+i*(lines.length>4?51:61)}" font-family="Arial" font-weight="bold" font-size="${lines.length>4?40:48}" fill="white">${esc(l)}</text>`).join('')}<text x="58" y="535" font-family="Arial" font-size="22" fill="#bfd9ee">Learn. Build. Make ideas work.</text><text x="58" y="584" font-family="Arial" font-size="20" fill="#bfd9ee">A Samkhya Technologies Initiative</text></svg>`);
 const mark=await sharp('public/favicon.svg').resize(64,64).png().toBuffer();
 const art=await sharp(`public/images/${name}-1200.webp`).resize(1200,630,{fit:'cover'}).composite([{input:svg},{input:mark,left:1078,top:45}]).toBuffer();await sharp(art).jpeg({quality:86}).toFile(`public/images/social/${slug}.jpg`);await sharp(art).webp({quality:84}).toFile(`public/images/social/${slug}.webp`);
}
await fs.cp('public/images/social',`${out}/images/social`,{recursive:true});
console.log('Generated unique 1200 × 630 JPEG sharing previews and WebP copies for every page.');
