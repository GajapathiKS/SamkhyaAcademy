import subprocess,json,pathlib
exe=r'C:/Users/gajap/AppData/Roaming/npm/node_modules/agent-browser/bin/agent-browser-win32-x64.exe'
root=pathlib.Path.cwd();results=[]
def run(*a):return subprocess.run([exe,'--session','academy-final',*a],capture_output=True,text=True,encoding='utf-8').stdout.strip()
paths=['/','/programs/']+['/programs/'+slug+'/'+section for slug in ['machine-learning','full-stack-development','fde-for-leaders'] for section in ['','curriculum/','projects/','career-preparation/']]
for w in [320,390,768,1440]:
 run('set','viewport',str(w),'900')
 for path in paths:
  run('open','http://127.0.0.1:4322'+path)
  r=run('eval',"JSON.stringify({path:location.pathname,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelector('h1')?.getBoundingClientRect().top,hero:document.querySelector('.hero-blend')?.getBoundingClientRect().top,nav:document.querySelector('.program-context')?.getBoundingClientRect().top,cards:document.querySelector('.catalog-grid')?.getBoundingClientRect().top,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).length})")
  try:r=json.loads(r);r=json.loads(r) if isinstance(r,str) else r;results.append(r)
  except:print(r)
  if w in [390,1440]:run('screenshot',str(root/'artifacts'/('hero-review-'+path.strip('/').replace('/','-')+'-'+str(w)+'.png')))
 print('Checked',w,flush=True)
(root/'artifacts/new-program-layout-checks.json').write_text(json.dumps(results,indent=2));print('Results:',len(results),'Failures:',[r for r in results if r['overflow'] or r['broken']])
