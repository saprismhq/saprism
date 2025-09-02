import { z } from 'zod';
export const ClientCreateManyResultSchema = z.object({
  count: z.number()
});