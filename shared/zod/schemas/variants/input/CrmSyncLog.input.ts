import { z } from 'zod';

// prettier-ignore
export const CrmSyncLogInputSchema = z.object({
    id: z.number().int(),
    meetingId: z.number().int(),
    status: z.string(),
    syncData: z.unknown().optional().nullable(),
    error: z.string().optional().nullable(),
    createdAt: z.date(),
    meeting: z.unknown()
}).strict();

export type CrmSyncLogInputType = z.infer<typeof CrmSyncLogInputSchema>;
