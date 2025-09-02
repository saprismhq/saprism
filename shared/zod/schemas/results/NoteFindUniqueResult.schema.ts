import { z } from 'zod';
export const NoteFindUniqueResultSchema = z.nullable(z.object({
  id: z.number().int(),
  meetingId: z.number().int(),
  content: z.string(),
  aiAnalysis: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  meeting: z.unknown()
}));