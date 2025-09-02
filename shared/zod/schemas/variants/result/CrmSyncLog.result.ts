import { z } from 'zod';

// prettier-ignore
export const CrmSyncLogResultSchema = z.object({
    id: z.number().int(),
    meetingId: z.number().int(),
    status: z.string(),
    syncData: z.unknown().nullable(),
    error: z.string().nullable(),
    createdAt: z.date(),
    meeting: z.unknown()
}).strict();

export type CrmSyncLogResultType = z.infer<typeof CrmSyncLogResultSchema>;
