import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.string(),
      type: z.enum(["个人", "工作"]),
      description: z.string().optional(),
      cover: image().optional(),
    }),
});

export const collections = { projects };
