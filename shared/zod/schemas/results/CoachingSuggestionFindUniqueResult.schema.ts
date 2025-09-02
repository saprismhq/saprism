import { z } from 'zod';
export const CoachingSuggestionFindUniqueResultSchema = z.nullable(z.object({
  id: z.number().int(),
  meetingId: z.number().int(),
  type: z.string(),
  content: z.unknown(),
  isUsed: z.boolean().optional(),
  createdAt: z.date().optional(),
  meeting: z.unknown()
}));