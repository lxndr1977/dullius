import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// Note que agora o caminho inclui '/content/' pois o arquivo subiu um nível
import { courseSchema } from './content/schemas/courses';
import { teacherSchema } from './content/schemas/teachers';
import { companySchema } from './content/schemas/company';
import { scheduleSchema } from './content/schemas/schedules';

const courses = defineCollection({
  // O loader diz ao Astro exatamente onde buscar os arquivos e qual extensão usar
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/courses" }),
  schema: courseSchema,
});

const teachers = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/teachers" }),
  schema: teacherSchema,
});

const company = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/company" }),
  schema: companySchema,
});

const schedules = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/schedules" }),
  schema: z.array(scheduleSchema),
});

export const collections = { courses, teachers, company, schedules };