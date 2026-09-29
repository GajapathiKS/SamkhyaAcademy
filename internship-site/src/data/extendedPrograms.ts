import {z} from 'astro/zod';
import ml from '../content/extended-programs/ml.json';
import fullstack from '../content/extended-programs/fullstack.json';
import leadership from '../content/extended-programs/leadership.json';
const text=z.string().min(1),list=z.array(text).min(1);
const schema=z.object({key:z.enum(['ml','fullstack','leadership']),slug:text,title:text,shortTitle:text,image:text,headline:text,curriculumTitle:text,curriculumIntro:text,intro:text,audience:text,bridge:text,scope:text,tags:list,paths:z.array(z.tuple([text,text])),modules:z.array(z.object({title:text,icon:text,summary:text,topics:list,tools:list,practice:text,deliverables:list,criteria:list})).min(4),projects:z.array(z.object({title:text,icon:text,problem:text,flow:list,practice:text,failures:list,evidence:list})).length(3),preparation:z.array(z.tuple([text,text])).min(4)});
export const extendedPrograms=[ml,fullstack,leadership].map(p=>schema.parse(p));
export type ExtendedProgram=(typeof extendedPrograms)[number];
