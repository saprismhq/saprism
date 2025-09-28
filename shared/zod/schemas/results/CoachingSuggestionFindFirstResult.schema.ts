import { z } from 'zod';
export const CoachingSuggestionFindFirstResultSchema = z.nullable(z.object({
  id: z.number().int(),
  meetingId: z.number().int(),
  type: z.string(),
  content: z.unknown(),
  isUsed: z.boolean().optional(),
  createdAt: z.date(),
  meeting: z.unknown()
}));