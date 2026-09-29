import subprocess,json,pathlib
exe=r'C:/Users/gajap/AppData/Roaming/npm/node_modules/agent-browser/bin/agent-browser-win32-x64.exe'
root=pathlib.Path.cwd();routes=json.loads((root/'outputs/academy-seo/seo-pages.json').read_text());out=[]
def run(*a):
 r=subprocess.run([exe,'--session','academy-final',*a],capture_output=True,text=True,encoding='utf-8');return r.stdout.strip()
for w in [320,390,768,1440]:
 run('set','viewport',str(w),'900')
 for row in routes:
  path=row[0].replace('https://samkhyaacademy.com','');run('open','http://127.0.0.1:4322'+path)
  result=run('eval',"JSON.stringify({path:location.pathname,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,broken:Array.from(document.images).filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),h1:document.querySelectorAll('h1').length})")
  try: v=json.loads(result);v=json.loads(v) if isinstance(v,str) else v;out.append(v)
  except:out.append({'path':path,'error':result})
  if path in ['/about/','/venture-studio/journey/','/programs/space-technology/projects/'] and w in [390,1440]:run('screenshot',str(root/'artifacts'/('refined-'+path.strip('/').replace('/','-')+'-'+str(w)+'.png')))
 print('Completed width',w,flush=True)
(root/'artifacts/refinement-qa.json').write_text(json.dumps(out,indent=2))
print(json.dumps([r for r in out if r.get('overflow') or r.get('broken') or r.get('error') or r.get('h1')!=1],indent=2),flush=True)
