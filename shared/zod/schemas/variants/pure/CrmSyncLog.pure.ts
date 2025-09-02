import { z } from 'zod';

// prettier-ignore
export const CrmSyncLogModelSchema = z.object({
    id: z.number().int(),
    meetingId: z.number().int(),
    status: z.string(),
    syncData: z.unknown().nullable(),
    error: z.string().nullable(),
    createdAt: z.date(),
    meeting: z.unknown()
}).strict();

export type CrmSyncLogModelType = z.infer<typeof CrmSyncLogModelSchema>;
