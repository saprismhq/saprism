import { z } from 'zod';

// prettier-ignore
export const CoachingSuggestionResultSchema = z.object({
    id: z.number().int(),
    meetingId: z.number().int(),
    type: z.string(),
    content: z.unknown(),
    isUsed: z.boolean().nullable(),
    createdAt: z.date().nullable(),
    meeting: z.unknown()
}).strict();

export type CoachingSuggestionResultType = z.infer<typeof CoachingSuggestionResultSchema>;
