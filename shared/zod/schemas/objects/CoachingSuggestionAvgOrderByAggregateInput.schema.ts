import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional()
}).strict();
export const CoachingSuggestionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionAvgOrderByAggregateInput>;
export const CoachingSuggestionAvgOrderByAggregateInputObjectZodSchema = makeSchema();
