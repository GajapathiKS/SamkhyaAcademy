import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({ title: z.string(), duration: z.string(), audience: z.string(), effort: z.string(), summary: z.string(), status: z.enum(['active', 'upcoming', 'draft']), href: z.string(), image: z.string() }),
});
export const collections = { programs };
