import fs from 'node:fs/promises';import sharp from 'sharp';
for(const file of await fs.readdir('assets/generated-photography')){if(!file.endsWith('.png'))continue;const name=file.slice(0,-4),path=`assets/generated-photography/${file}`;for(const size of [640,1200]){await sharp(path).resize(size).webp({quality:84}).toFile(`public/images/${name}-${size}.webp`);await sharp(path).resize(size).avif({quality:55}).toFile(`public/images/${name}-${size}.avif`);}}
console.log('Optimized local photography originals.');
