import { z } from 'astro:content';

export const teacherSchema = z.object({
  name: z.string(),
  role: z.string(), // ex: "Diretora e Professora de Ballet"
  bio: z.string(),
  photo: z.string(),
  specialties: z.array(z.string()), // ex: ["Ballet Clássico", "Dança Moderna"]
  socials: z.object({
    instagram: z.string().url().optional(),
    facebook: z.string().url().optional(),
  }).optional(),
  order: z.number().default(0), // Para controlar a ordem de exibição
});