import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  meetingId: z.literal(true).optional(),
  type: z.literal(true).optional(),
  isUsed: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const CoachingSuggestionMaxAggregateInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionMaxAggregateInputType>;
export const CoachingSuggestionMaxAggregateInputObjectZodSchema = makeSchema();
