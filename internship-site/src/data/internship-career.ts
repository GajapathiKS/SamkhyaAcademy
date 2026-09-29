import { z } from 'astro/zod';
import source from '../content/internship-career.json';
const text=z.string().min(1);
export const career=z.object({foundations:z.array(z.object({icon:text,title:text,description:text})).length(3),interview:z.array(z.object({number:text,title:text,description:text})).length(3)}).parse(source);
