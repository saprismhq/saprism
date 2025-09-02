import { z } from 'zod';

// prettier-ignore
export const CallSessionInputSchema = z.object({
    id: z.string(),
    meetingId: z.number().int(),
    liveKitRoomName: z.string(),
    liveKitToken: z.string().optional().nullable(),
    participants: z.unknown(),
    status: z.string(),
    startedAt: z.date().optional().nullable(),
    endedAt: z.date().optional().nullable(),
    transcription: z.unknown().optional().nullable(),
    sessionMetadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    meeting: z.unknown()
}).strict();

export type CallSessionInputType = z.infer<typeof CallSessionInputSchema>;
