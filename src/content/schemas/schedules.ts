import { z } from 'zod';

export const scheduleSchema = z.object({
  age:    z.string(),
  method: z.string(),
  time:   z.string(),
  day:    z.string(),
});
