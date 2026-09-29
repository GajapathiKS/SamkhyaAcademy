import {programOrder} from './catalog';
import {extendedPrograms} from './extendedPrograms';
import {site,routes} from '../../site.config.mjs';
export const socialSlug=(path:string)=>path==='/'?'academy':path.replace(/\.html$/,'').replace(/^\/|\/$/g,'').replaceAll('/','-');
export function pageSchema(path:string,title:string,description:string){
 const names:Record<string,string>={...Object.fromEntries(extendedPrograms.map(p=>[`/programs/${p.slug}/`,p.title])),'/programs/ai-engineering-internship/':'AI Engineering Training Internship','/programs/forward-deployment-engineer/':'Forward Deployment Engineering','/programs/space-technology/':'Space Technology & Satellite Systems'};
 const base=site.domain,url=new URL(path,base).href,org=base+'/#academy';
 const graph:any[]=[{'@type':'EducationalOrganization','@id':org,name:site.name,url:base+'/',logo:{'@type':'ImageObject',url:base+'/images/academy-logo.png'},description:'Practical learning in software, machine learning, AI delivery, space systems and executive leadership, with startup advisory through Venture Launchpad.'},{'@type':'WebSite','@id':base+'/#website',url:base+'/',name:site.name,publisher:{'@id':org}},{'@type':'WebPage','@id':url+'#page',url,name:title,description,inLanguage:'en',isPartOf:{'@id':base+'/#website'},publisher:{'@id':org},primaryImageOfPage:{'@type':'ImageObject',url:base+'/images/social/'+socialSlug(path)+'.jpg'}}];
 if(path!=='/'){const parents=routes.filter(p=>p!=='/'&&p!==path&&path.startsWith(p)).sort((a,b)=>a.length-b.length);graph.push({'@type':'BreadcrumbList',itemListElement:[{url:base+'/',name:'Home'},...parents.map(p=>({url:base+p,name:p==='/programs/'?'Programs':names[p]||(p.startsWith('/venture-studio/')?'Venture Launchpad':p)})),{url,name:title}].map((p,i)=>({'@type':'ListItem',position:i+1,name:p.name,item:p.url}))});}

 if(site.organizationVerified && names[path])graph.push({'@type':'Course',name:names[path],description,url,provider:{'@id':org},inLanguage:'en'});
 if(path==='/programs/')graph.push({'@type':'ItemList',name:'SamkhyaAcademy learning programs',itemListElement:programOrder.filter(path=>names[path]).map((path,i)=>({'@type':'ListItem',position:i+1,url:base+path,name:names[path]}))});
 if(path==='/venture-studio/')graph.push({'@type':'Service',name:'Venture Launchpad',serviceType:'Startup advisory from idea to execution',description,url,provider:{'@id':org}});
 return {'@context':'https://schema.org','@graph':graph};
}
