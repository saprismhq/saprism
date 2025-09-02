import { z } from 'zod';

// prettier-ignore
export const NoteResultSchema = z.object({
    id: z.number().int(),
    meetingId: z.number().int(),
    content: z.string(),
    aiAnalysis: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    meeting: z.unknown()
}).strict();

export type NoteResultType = z.infer<typeof NoteResultSchema>;
