(()=>{
 const course=document.body.dataset.course,lesson=document.body.dataset.lesson,module=lesson.split('.')[0];
 const prefix='samkhya-curriculum-'+course;
 const read=key=>{try{return JSON.parse(localStorage.getItem(key)||'{}');}catch{return {};}};
 const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}};
 const state=read(prefix),notes=read(prefix+'-'+lesson),assignment=read(prefix+'-module-'+module);
 state.completed||=[];state.bookmarks||=[];state.resume=location.pathname.split('/').pop();write(prefix,state);
 const status=document.querySelector('#lesson-status'),tabs=[...document.querySelectorAll('[role=tab]')];
 function select(tab){tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',active);t.tabIndex=active?0:-1;document.querySelector('#'+t.getAttribute('aria-controls')).hidden=!active;});}
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;select(tabs[n]);tabs[n].focus();});});
 for(const id of ['reflection','lesson-notes']){const input=document.getElementById(id);input.value=notes[id]||'';input.addEventListener('input',()=>{notes[id]=input.value;write(prefix+'-'+lesson,notes);});}
 document.querySelectorAll('#practice-form textarea').forEach(input=>{input.value=assignment[input.name]||'';input.addEventListener('input',()=>{assignment[input.name]=input.value;write(prefix+'-module-'+module,assignment);});});
 document.querySelector('#practice-form').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#practice-status').textContent=write(prefix+'-module-'+module,assignment)?'Module assignment saved on this browser.':'Storage is unavailable. Download the worksheet to keep your work.';});
 function paint(){
  const pct=Math.round(100*state.completed.length/Number(document.body.dataset.total));
  document.querySelector('#progress-label').textContent=pct+'%';document.querySelector('#progress-fill').style.width=pct+'%';document.querySelector('[role=progressbar]').setAttribute('aria-valuenow',pct);
  document.querySelectorAll('[data-module-count]').forEach(el=>{const m=el.dataset.moduleCount;const count=state.completed.filter(x=>x.split('.')[0]===m).length;el.textContent=count+'/4';});
  document.querySelectorAll('[data-lesson-link]').forEach(a=>a.classList.toggle('done',state.completed.includes(a.dataset.lessonLink)));
  document.querySelector('#reviewed').checked=state.completed.includes(lesson);
  document.querySelector('#complete-lesson').textContent=state.completed.includes(lesson)?'Completed · review anytime':'Mark complete';
  document.querySelector('#bookmark').setAttribute('aria-pressed',state.bookmarks.includes(lesson));document.querySelector('#bookmark').textContent=state.bookmarks.includes(lesson)?'Bookmarked':'Bookmark';
 }paint();
 document.querySelector('#bookmark').addEventListener('click',()=>{state.bookmarks=state.bookmarks.includes(lesson)?state.bookmarks.filter(x=>x!==lesson):[...state.bookmarks,lesson];write(prefix,state);paint();});
 document.querySelector('#complete-lesson').addEventListener('click',()=>{
  if(!document.querySelector('#reviewed').checked){status.textContent='Confirm that you have worked through the lesson first.';return;}
  if(!state.completed.includes(lesson))state.completed.push(lesson);
  status.textContent=write(prefix,state)?'Lesson complete. Your course progress is saved on this browser.':'Completed for this session; storage is unavailable.';paint();
 });
 document.querySelector('#reviewed').addEventListener('change',e=>{if(!e.target.checked){state.completed=state.completed.filter(x=>x!==lesson);write(prefix,state);paint();}});
 document.querySelector('#copy-example').addEventListener('click',async e=>{const b=e.currentTarget;try{await navigator.clipboard.writeText(document.querySelector('#worked-example').textContent);b.textContent='Copied';}catch{status.textContent='Clipboard unavailable. Select the example or download the module worksheet.';}});
 function comments(){const target=document.querySelector('#discussion-list');target.replaceChildren();for(const text of notes.comments||[]){const item=document.createElement('p');item.className='local-comment';item.textContent='You: '+text;target.append(item);}}comments();
 document.querySelector('#discussion-form').addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#discussion-text'),text=input.value.trim();if(!text)return;notes.comments=[...(notes.comments||[]),text];write(prefix+'-'+lesson,notes);input.value='';comments();});
 document.querySelector('#export-notes').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([notes['lesson-notes']||''],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download=course+'-lesson-'+lesson+'-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
})();
