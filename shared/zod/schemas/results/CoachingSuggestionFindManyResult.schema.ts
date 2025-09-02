import { z } from 'zod';
export const CoachingSuggestionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  meetingId: z.number().int(),
  type: z.string(),
  content: z.unknown(),
  isUsed: z.boolean().optional(),
  createdAt: z.date().optional(),
  meeting: z.unknown()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});