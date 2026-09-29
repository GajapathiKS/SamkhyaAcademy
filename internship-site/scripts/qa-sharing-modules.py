import subprocess,json
exe=r'C:/Users/gajap/AppData/Roaming/npm/node_modules/agent-browser/bin/agent-browser-win32-x64.exe'
def run(*a):return subprocess.run([exe,'--session','academy-final',*a],capture_output=True,text=True,encoding='utf-8').stdout.strip()
for w in [320,390,768,1440]:
 run('set','viewport',str(w),'900')
 for path in ['/programs/forward-deployment-engineer/curriculum/','/venture-studio/journey/']:
  run('open','http://127.0.0.1:4322'+path)
  print(run('eval',"JSON.stringify({path:location.pathname,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,icons:document.querySelectorAll('.share-actions .icon').length,navColor:document.querySelector('.fde-curriculum .module-nav a>span:not(.icon)')?getComputedStyle(document.querySelector('.fde-curriculum .module-nav a>span:not(.icon)')).color:null})"))
run('open','http://127.0.0.1:4322/programs/forward-deployment-engineer/curriculum/')
run('click','.module-nav a[href="#module-8"]')
print(run('eval',"JSON.stringify({open:document.querySelector('#module-8').open,top:document.querySelector('#module-8').getBoundingClientRect().top,current:document.querySelector('.module-nav [aria-current]')?.textContent})"))
run('screenshot','artifacts/fde-module-eight.png')
run('eval',"document.querySelector('.page-sharing').scrollIntoView({block:'center'})")
run('click','.copy-page-link');print(run('eval',"document.querySelector('.share-result').textContent"));run('screenshot','artifacts/sharing-controls.png');print(run('errors'))
