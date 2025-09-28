import { z } from 'zod';

// prettier-ignore
export const CoachingSuggestionModelSchema = z.object({
    id: z.number().int(),
    meetingId: z.number().int(),
    type: z.string(),
    content: z.unknown(),
    isUsed: z.boolean().nullable(),
    createdAt: z.date(),
    meeting: z.unknown()
}).strict();

export type CoachingSuggestionModelType = z.infer<typeof CoachingSuggestionModelSchema>;
