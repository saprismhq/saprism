import { z } from 'zod';

// prettier-ignore
export const NoteInputSchema = z.object({
    id: z.number().int(),
    meetingId: z.number().int(),
    content: z.string(),
    aiAnalysis: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    meeting: z.unknown()
}).strict();

export type NoteInputType = z.infer<typeof NoteInputSchema>;
