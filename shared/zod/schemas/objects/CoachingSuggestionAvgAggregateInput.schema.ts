import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  meetingId: z.literal(true).optional()
}).strict();
export const CoachingSuggestionAvgAggregateInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionAvgAggregateInputType>;
export const CoachingSuggestionAvgAggregateInputObjectZodSchema = makeSchema();
