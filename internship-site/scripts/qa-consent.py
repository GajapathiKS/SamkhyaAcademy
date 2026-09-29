import subprocess,json,pathlib
exe=r'C:/Users/gajap/AppData/Roaming/npm/node_modules/agent-browser/bin/agent-browser-win32-x64.exe'
def run(*a):
 r=subprocess.run([exe,'--session','academy-final',*a],capture_output=True,text=True,encoding='utf-8');return r.stdout.strip()
run('open','http://127.0.0.1:4322/venture-studio/submit/')
print(run('eval',"JSON.stringify([...document.querySelectorAll('input[type=checkbox]')].map(e=>({name:e.name,required:e.required,checked:e.checked})))"))
data={'name':'Sample Founder','email':'sample@example.com','phone':'+12025550123','title':'Sample learning idea','problem':'A sample problem statement for local validation only.','users':'Example college teams','approach':'A sample proposed approach for local validation only.','support':'Customer discovery support'}
for k,v in data.items():run('fill','[name="'+k+'"]',v)
run('select','[name="stage"]','Exploring a problem');run('select','[name="team"]','Student team')
run('check','[name="termsAccepted"]');run('check','[name="consent"]');run('click','button[type="submit"]')
print(run('eval',"JSON.stringify({dialog:document.querySelector('dialog').open,text:document.querySelector('dialog').textContent.includes('nothing has been sent'),focus:document.activeElement.id})"))
run('press','Escape');print(run('eval',"JSON.stringify({closed:!document.querySelector('dialog').open,focus:document.activeElement.outerHTML.slice(0,100)})"))
run('open','http://127.0.0.1:4322/forms/internship-enquiry/')
print(run('eval',"JSON.stringify([...document.querySelectorAll('input[name=termsAccepted],input[name=consent],input[name=phone]')].map(e=>({name:e.name,required:e.required,checked:e.checked})))"))
print(run('errors'))
