import { z } from 'astro/zod';
import source from '../content/fde.json';
const text = z.string().min(1);
const list = z.array(text).min(1);
export const fde = z.object({
 modules: z.array(z.object({title:text,icon:text,label:text,summary:text,topics:list,tools:list,practice:text,deliverables:list,criteria:list,question:text})).length(8),
 tools: z.array(z.object({icon:text,title:text,purpose:text,description:text})).min(1),
 projects: z.array(z.object({id:text,title:text,icon:text,image:text,tag:text,summary:text,problem:text,user:text,flow:list,journey:list,responsibilities:list,failures:list,evidence:list,review:text})).length(3),
 career: z.array(z.object({icon:text,title:text,subtitle:text,practice:text,evidence:text})).length(6),
}).parse(source);
