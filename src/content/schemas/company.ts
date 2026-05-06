import { z } from 'astro:content';

export const companySchema = z.object({
  name: z.string(),
  whatsapp: z.object({
    number: z.string(), // Apenas números, ex: "5551999999999"
    display: z.string(), // O formato visual, ex: "(51) 99999-9999"
  }),
  email: z.string().email().optional(),
  socials: z.object({
    instagram: z.string().url(),
    facebook: z.string().url().optional(),
  }).optional()
});