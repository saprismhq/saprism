import { z } from 'zod';
export const SessionDeleteResultSchema = z.nullable(z.object({
  sid: z.string(),
  sess: z.unknown(),
  expire: z.date()
}));