import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  meetingId: z.literal(true).optional(),
  type: z.literal(true).optional(),
  isUsed: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const CoachingSuggestionMinAggregateInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionMinAggregateInputType>;
export const CoachingSuggestionMinAggregateInputObjectZodSchema = makeSchema();
