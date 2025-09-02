import { z } from 'zod';

// prettier-ignore
export const MeetingResultSchema = z.object({
    id: z.number().int(),
    userId: z.string(),
    clientId: z.number().int().nullable(),
    clientName: z.string(),
    clientCompany: z.string().nullable(),
    dealType: z.string(),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    client: z.unknown().nullable(),
    notes: z.array(z.unknown()),
    coachingSuggestions: z.array(z.unknown()),
    crmSyncLogs: z.array(z.unknown()),
    callSessions: z.array(z.unknown())
}).strict();

export type MeetingResultType = z.infer<typeof MeetingResultSchema>;
