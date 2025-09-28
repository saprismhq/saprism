import { z } from 'zod';

// prettier-ignore
export const MeetingInputSchema = z.object({
    id: z.number().int(),
    userId: z.string(),
    clientId: z.number().int().optional().nullable(),
    clientName: z.string(),
    clientCompany: z.string().optional().nullable(),
    dealType: z.string(),
    status: z.string(),
    summary: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    client: z.unknown().optional().nullable(),
    notes: z.array(z.unknown()),
    coachingSuggestions: z.array(z.unknown()),
    crmSyncLogs: z.array(z.unknown()),
    callSessions: z.array(z.unknown())
}).strict();

export type MeetingInputType = z.infer<typeof MeetingInputSchema>;
