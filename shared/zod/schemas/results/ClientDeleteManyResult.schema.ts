import { z } from 'zod';
export const ClientDeleteManyResultSchema = z.object({
  count: z.number()
});