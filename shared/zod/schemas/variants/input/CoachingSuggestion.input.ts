import { z } from 'zod';

// prettier-ignore
export const CoachingSuggestionInputSchema = z.object({
    id: z.number().int(),
    meetingId: z.number().int(),
    type: z.string(),
    content: z.unknown(),
    isUsed: z.boolean().optional().nullable(),
    createdAt: z.date(),
    meeting: z.unknown()
}).strict();

export type CoachingSuggestionInputType = z.infer<typeof CoachingSuggestionInputSchema>;
