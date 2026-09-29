import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
await mkdir('public/images', {recursive:true});
for (const file of await readdir('assets-originals')) {
 if (!file.endsWith('.png')) continue;
 const name = file.replace(/\.png$/, '');
 for (const width of [640,1200]) {
  for (const format of ['webp','avif']) {
   const dest = `public/images/${name}-${width}.${format}`;
   await sharp(`assets-originals/${file}`).resize(width, Math.round(width*2/3), {fit:'cover', position:'centre'}).toFormat(format, {quality:format === 'avif' ? 48 : 78}).toFile(dest);
   console.log(`${dest}: ${Math.round((await stat(dest)).size/1024)} KB`);
  }
 }
}
