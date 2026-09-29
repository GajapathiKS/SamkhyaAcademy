import subprocess,json,pathlib
exe=r'C:/Users/gajap/AppData/Roaming/npm/node_modules/agent-browser/bin/agent-browser-win32-x64.exe'
def run(*a): return subprocess.run([exe,'--session','academy-final',*a],capture_output=True,text=True,encoding='utf-8').stdout.strip()
def ev(s):
 r=json.loads(run('eval',s));return json.loads(r) if isinstance(r,str) else r
results=[]
for k in ['internship','fde','space','ml','fullstack','leadership']:
 run('open','http://127.0.0.1:4322/enquire/?program='+k)
 results.append(ev("JSON.stringify({program:new URLSearchParams(location.search).get('program'),iframe:document.querySelector('iframe')?.src})"))
 run('open','http://127.0.0.1:4322/forms/internship-enquiry/?program='+k)
 results[-1]['selected']=ev("JSON.stringify([...document.querySelectorAll('input[name=interests]:checked')].map(e=>e.value))")
for slug in ['machine-learning','full-stack-development','fde-for-leaders']:
 run('open','http://127.0.0.1:4322/programs/'+slug+'/curriculum/')
 run('click','.explore-nav a:nth-of-type(2)')
 results.append(ev("JSON.stringify({path:location.pathname,expanded:document.querySelector('#module-2').open})"))
 run('click','.track-picker summary');run('press','Tab')
 results[-1]['switchFocus']=ev("JSON.stringify({tag:document.activeElement.tagName,href:document.activeElement.getAttribute('href'),count:document.querySelectorAll('.track-picker a').length})")
pathlib.Path('artifacts/new-interaction-checks.json').write_text(json.dumps(results,indent=2));print(json.dumps(results,indent=2))
