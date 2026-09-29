import subprocess,json,pathlib
exe=r'C:/Users/gajap/AppData/Roaming/npm/node_modules/agent-browser/bin/agent-browser-win32-x64.exe'
def run(*a):
 r=subprocess.run([exe,'--session','academy-final',*a],capture_output=True,text=True,encoding='utf-8');return r.stdout.strip()
def ev(s):
 r=json.loads(run('eval',s));return json.loads(r) if isinstance(r,str) else r
paths=json.loads(subprocess.run(['node','--input-type=module','-e',"import {routes} from './site.config.mjs';console.log(JSON.stringify(routes))"],capture_output=True,text=True).stdout)
results=[]
for w in [320,390,768,1440]:
 run('set','viewport',str(w),'900')
 for path in paths:
  run('open','http://127.0.0.1:4322'+path)
  results.append(ev("JSON.stringify({path:location.pathname,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).length})"))
  if w in [390,1440] and path in ['/venture-studio/','/about/','/programs/','/programs/machine-learning/curriculum/','/programs/full-stack-development/curriculum/','/programs/space-technology/curriculum/','/programs/fde-for-leaders/curriculum/']:
   run('screenshot','artifacts/content-review-'+path.strip('/').replace('/','-')+'-'+str(w)+'.png')
 print('Checked',w,flush=True)
pathlib.Path('artifacts/content-review-responsive.json').write_text(json.dumps(results,indent=2));bad=[r for r in results if r['overflow'] or r['broken'] or r['h1']!=1];print('Checked',len(results),'Failures:',bad);assert not bad
for slug in ['machine-learning','full-stack-development','fde-for-leaders','space-technology']:
 run('open','http://127.0.0.1:4322/programs/'+slug+'/curriculum/')
 run('click','.explore-nav a:last-child')
 result=ev("JSON.stringify({path:location.pathname,hash:location.hash,open:document.querySelector(location.hash).open,active:document.querySelector('.explore-nav [aria-current]')?.getAttribute('href')})")
 print(result);assert result['open'] and result['hash']==result['active']
 run('screenshot','artifacts/curriculum-last-'+slug+'.png')
print(run('errors'))
