(()=>{
 const key='samkhya-lesson-'+document.body.dataset.course;
 let state={};
 try{state=JSON.parse(localStorage.getItem(key)||'{}')||{};}catch{}
 const save=()=>{try{localStorage.setItem(key,JSON.stringify(state));return true;}catch{return false;}};
 const status=document.querySelector('#complete-status');
 const fields=[...document.querySelectorAll('#practice-form textarea,#reflection,#lesson-notes')];
 fields.forEach(el=>{const id=el.name||el.id;el.value=state[id]||'';el.addEventListener('input',()=>{state[id]=el.value;save();});});
 document.querySelector('#practice-form').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#practice-status').textContent=save()?'Practice saved on this browser.':'Storage unavailable. Download the worksheet to keep your work.';});
 const checks=[...document.querySelectorAll('[data-evidence]')];
 checks.forEach((el,i)=>{el.checked=!!state.checks?.[i];el.addEventListener('change',()=>{state.checks=checks.map(c=>c.checked);if(!checks.every(c=>c.checked))state.complete=false;save();paint();});});
 function paint(){document.querySelector('#completion-label').textContent=state.complete?'Lesson completed':'Not completed';document.querySelector('#lesson-progress').style.width=state.complete?'100%':'0%';document.querySelector('[role=progressbar]').setAttribute('aria-valuenow',state.complete?'100':'0');document.querySelector('#complete-lesson').textContent=state.complete?'Completed · review anytime':'Mark complete';}
 paint();
 document.querySelector('#complete-lesson').addEventListener('click',()=>{if(!checks.every(c=>c.checked)){status.textContent='Review and confirm each evidence criterion before marking complete.';return;}state.complete=true;status.textContent=save()?'Completion saved on this browser.':'Completed for this session; browser storage is unavailable.';paint();});
 document.querySelector('#copy-example').addEventListener('click',async e=>{const button=e.currentTarget;try{await navigator.clipboard.writeText(document.querySelector('#worked-example').textContent);button.textContent='Copied';}catch{document.querySelector('#worked-example').tabIndex=0;document.querySelector('#worked-example').focus();status.textContent='Select the example text and copy it, or download the worksheet.';}});
 function comments(){const list=document.querySelector('#discussion-list');list.replaceChildren();(state.comments||[]).forEach(text=>{const article=document.createElement('article');article.className='local-comment';const label=document.createElement('b');label.textContent='You · local discussion';const p=document.createElement('p');p.textContent=text;article.append(label,p);list.append(article);});}
 comments();
 document.querySelector('#discussion-form').addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#discussion-text'),text=input.value.trim();if(!text)return;state.comments=[...(state.comments||[]),text];save();input.value='';comments();});
})();
