import { z } from 'zod';
import { reference } from 'astro:content'; 

export const courseSchema = z.object({
  id: z.string(), 
  tag: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  imageSrc: z.string(),

  intro: z.object({
    eyebrow: z.string(),
    title: z.string(),
    paragraphs: z.array(z.string()),
  }),
  
  videoSection: z.object({
    eyebrow: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    videoUrl: z.string(),
  }).optional(),
  
  testimonials: z.array(z.object({
    name: z.string(),
    role: z.string(),
    text: z.string(),
    initials: z.string(),
    photo: z.string().optional(),
  })),

  gallery: z.array(z.object({
    src: z.string(),
    alt: z.string(),
    description: z.string(),
  })),

  cta: z.object({
    eyebrow: z.string(),
    title: z.string(),
    description: z.string(),
  }),

  methods: z.array(z.string()).optional(),
  ages: z.array(z.string()).optional(),

  related: z.array(reference('courses')).optional(),
});