import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('output/UX_REVIEW_ASTRA_2026_09_05');
const types={'.pdf':'application/pdf','.svg':'image/svg+xml','.jpg':'image/jpeg','.zip':'application/zip','.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.woff2':'font/woff2','.png':'image/png','.md':'text/plain; charset=utf-8','.csv':'text/csv; charset=utf-8'};
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const p=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(p!==root&&!p.startsWith(root+path.sep)){res.writeHead(403).end();return;}const data=await readFile(p);res.writeHead(200,{'Content-Type':types[path.extname(p)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);}catch{res.writeHead(404).end('Not found');}}).listen(4310,'127.0.0.1',()=>console.log('UX review: http://127.0.0.1:4310'));
