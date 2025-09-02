import { z } from 'zod';

// prettier-ignore
export const SessionModelSchema = z.object({
    sid: z.string(),
    sess: z.unknown(),
    expire: z.date()
}).strict();

export type SessionModelType = z.infer<typeof SessionModelSchema>;
