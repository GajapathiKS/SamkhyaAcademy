import { z } from 'astro/zod';
import content from '../content/space.json';
const list=z.array(z.string()).min(1);
export const space=z.object({title:z.string(),headline:z.string(),intro:z.string(),roles:z.array(z.tuple([z.string(),z.string()])),modules:z.array(z.object({title:z.string(),icon:z.string(),summary:z.string(),topics:list,tools:list,practice:z.string(),deliverables:list,criteria:list})).length(8),projects:z.array(z.object({title:z.string(),problem:z.string(),flow:list,work:z.string(),failure:z.string(),evidence:z.string()})).length(3)}).parse(content);
