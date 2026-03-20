import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Handle tags as either array or comma-separated string
const tagsSchema = z.union([
  z.array(z.string()),
  z.string().transform(s => s.split(',').map(t => t.trim()).filter(Boolean)),
]).default([]);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: tagsSchema,
    image: z.string().optional(),
    layout: z.string().optional(),
    share: z.boolean().optional(),
  }),
});

const drafts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/drafts' }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

// Starlight docs collection for health content
const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

export const collections = { blog, drafts, docs };
