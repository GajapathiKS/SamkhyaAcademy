import {extendedPrograms} from './extendedPrograms';
export const catalog:Record<string,{label:string;facts:string[];tags:string[];cta:string;href:string}>={
'/programs/ai-engineering-internship/':{label:'STUDENTS & BEGINNERS',facts:['16-week learning journey','Four project milestones'],tags:['Python + React','RAG','Agentic AI','DSA'],cta:'Enquire about this program',href:'/enquire/?program=internship'},
'/programs/forward-deployment-engineer/':{label:'EXPERIENCED ENGINEERS',facts:['Eight curriculum modules','Three delivery projects'],tags:['RAG','LangGraph + MCP','Enterprise integration','Production AI'],cta:'Enquire about this program',href:'/enquire/?program=fde'},
'/programs/space-technology/':{label:'MULTIDISCIPLINARY COLLEGE TEAMS',facts:['Eight systems modules','Three project milestones'],tags:['Mission design','Telemetry','Python','Subsystems'],cta:'Enquire about space tech',href:'/enquire/?program=space'},
'/venture-studio/':{label:'FOUNDERS & EARLY BUILDERS',facts:['Seven advisory stages','Ideation to execution'],tags:['Startup advisory','Validation','MVP execution','Growth planning'],cta:'Share your idea',href:'/venture-studio/submit/'}
};

for(const p of extendedPrograms)catalog[`/programs/${p.slug}/`]={label:p.audience.toUpperCase(),facts:[`${p.modules.length} curriculum modules`,p.key==='leadership'?'Three leadership exercises':'Three portfolio projects'],tags:p.tags,cta:'Enquire about this program',href:'/enquire/?program='+p.key};

export const programOrder=["/programs/ai-engineering-internship/","/programs/machine-learning/","/programs/full-stack-development/","/programs/forward-deployment-engineer/","/programs/space-technology/","/programs/fde-for-leaders/","/venture-studio/"];
