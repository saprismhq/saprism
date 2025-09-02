import { z } from 'zod';
export const MeetingDeleteManyResultSchema = z.object({
  count: z.number()
});