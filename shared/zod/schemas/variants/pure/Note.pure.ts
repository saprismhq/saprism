import { z } from 'zod';

// prettier-ignore
export const NoteModelSchema = z.object({
    id: z.number().int(),
    meetingId: z.number().int(),
    content: z.string(),
    aiAnalysis: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    meeting: z.unknown()
}).strict();

export type NoteModelType = z.infer<typeof NoteModelSchema>;
