import { z } from 'zod';

// prettier-ignore
export const SessionResultSchema = z.object({
    sid: z.string(),
    sess: z.unknown(),
    expire: z.date()
}).strict();

export type SessionResultType = z.infer<typeof SessionResultSchema>;
