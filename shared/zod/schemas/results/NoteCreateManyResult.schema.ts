import { z } from 'zod';
export const NoteCreateManyResultSchema = z.object({
  count: z.number()
});