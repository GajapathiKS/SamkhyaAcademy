import { z } from 'astro/zod';
import {extendedPrograms} from './extendedPrograms';
const programSchema = z.object({ title: z.string(), shortTitle: z.string(), slug: z.string(), audience: z.string(), status: z.enum(['active','upcoming']), enquiry: z.discriminatedUnion('state', [z.object({state:z.literal('open'),href:z.string().startsWith('/enquire/')}),z.object({state:z.literal('closed')})]) });
const existingTracks = {
 internship: programSchema.parse({title:'AI Engineering Training Internship',shortTitle:'AI Engineering Internship',slug:'ai-engineering-internship',audience:'College students & beginners',status:'active',enquiry:{state:'open',href:'/enquire/?program=internship'}}),
 fde: programSchema.parse({title:'Forward Deployment Engineering',shortTitle:'Forward Deployment Engineering',slug:'forward-deployment-engineer',audience:'Experienced software engineers',status:'upcoming',enquiry:{state:'open',href:'/enquire/?program=fde'}}),
 space: programSchema.parse({title:'Space Technology & Satellite Systems',shortTitle:'Space Technology',slug:'space-technology',audience:'Multidisciplinary students & college teams',status:'upcoming',enquiry:{state:'open',href:'/enquire/?program=space'}}),
};
export const tracks={...existingTracks,...Object.fromEntries(extendedPrograms.map(p=>[p.key,programSchema.parse({title:p.title,shortTitle:p.shortTitle,slug:p.slug,audience:p.audience,status:'upcoming',enquiry:{state:'open',href:'/enquire/?program='+p.key}})]))} as Record<'internship'|'fde'|'space'|'ml'|'fullstack'|'leadership',z.infer<typeof programSchema>>;
export type Track = keyof typeof tracks;
export const sections = [{id:'overview',label:'Overview',icon:'compass'},{id:'curriculum',label:'Curriculum',icon:'book'},{id:'projects',label:'Projects',icon:'layers'},{id:'career-preparation',label:'Career preparation',icon:'message'}];
export function programUrl(track:Track, section='overview') { return `/programs/${tracks[track].slug}/${section === 'overview' ? '' : section+'/'}`; }
