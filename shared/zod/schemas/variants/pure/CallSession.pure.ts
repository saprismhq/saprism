import { z } from 'zod';

// prettier-ignore
export const CallSessionModelSchema = z.object({
    id: z.string(),
    meetingId: z.number().int(),
    liveKitRoomName: z.string(),
    liveKitToken: z.string().nullable(),
    participants: z.unknown(),
    status: z.string(),
    startedAt: z.date().nullable(),
    endedAt: z.date().nullable(),
    transcription: z.unknown().nullable(),
    sessionMetadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    meeting: z.unknown()
}).strict();

export type CallSessionModelType = z.infer<typeof CallSessionModelSchema>;
