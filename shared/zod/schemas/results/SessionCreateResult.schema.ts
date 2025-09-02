import { z } from 'zod';
export const SessionCreateResultSchema = z.object({
  sid: z.string(),
  sess: z.unknown(),
  expire: z.date()
});