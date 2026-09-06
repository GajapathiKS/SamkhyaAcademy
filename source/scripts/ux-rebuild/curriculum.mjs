import {createHash} from 'node:crypto';
import {moduleContent} from './module-content.mjs';
export const lessonFile=(slug,m=0,l=0)=>m===0&&l===0?'lesson-'+slug+'.html':`lesson-${slug}-m${String(m+1).padStart(2,'0')}-l${String(l+1).padStart(2,'0')}.html`;
export function curriculum(c){
 const units=moduleContent[c.slug];
 if(!units||units.length!==c.modules.length)throw Error('Module mismatch '+c.slug);
 const modules=c.modules.map((mod,m)=>{
  const content=units[m];
  if(content.concepts.length!==mod.lessons.length)throw Error('Lesson mismatch '+c.slug+' '+m);
  return {...mod,...content,lessons:mod.lessons.map((title,l)=>({title,explanation:content.concepts[l],file:lessonFile(c.slug,m,l),key:`${m+1}.${l+1}`}))};
 });
 const version=createHash('sha256').update(JSON.stringify({slug:c.slug,modules,outcomes:c.outcomes,delivery:c.deliveryMode,certificate:[c.certificateEnabled,c.requiresPassingExam]})).digest('hex').slice(0,12);
 return {modules,version,lessons:modules.flatMap(m=>m.lessons)};
}
export function moduleWorksheet(c,m){
 const mod=curriculum(c).modules[m];
 return '# '+c.title+'\n\n## Module '+(m+1)+': '+mod.title+'\n\n'+mod.context+'\n\n'+mod.lessons.map(l=>'### '+l.key+' '+l.title+'\n\n'+l.explanation).join('\n\n')+'\n\n## Worked lab\n\n'+mod.example+'\n\n'+mod.interpretation+'\n\n## Assignment\n\n'+mod.tasks.map((t,i)=>(i+1)+'. '+t+'\n   Your evidence: ').join('\n\n')+'\n\n## Evidence to submit\n\n'+mod.evidence+'\n\n## Review\n\n'+mod.question+'\n\nYour reasoning: \n';
}
