import { z } from 'zod';
export const SessionUpsertResultSchema = z.object({
  sid: z.string(),
  sess: z.unknown(),
  expire: z.date()
});