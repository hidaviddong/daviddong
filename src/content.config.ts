import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/projects" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    type: z.enum(["个人", "工作"]),
  }),
});

export const collections = { projects };
