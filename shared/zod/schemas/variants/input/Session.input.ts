import { z } from 'zod';

// prettier-ignore
export const SessionInputSchema = z.object({
    sid: z.string(),
    sess: z.unknown(),
    expire: z.date()
}).strict();

export type SessionInputType = z.infer<typeof SessionInputSchema>;
