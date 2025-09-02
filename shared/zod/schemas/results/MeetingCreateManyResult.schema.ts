import { z } from 'zod';
export const MeetingCreateManyResultSchema = z.object({
  count: z.number()
});