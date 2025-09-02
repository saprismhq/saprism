import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional()
}).strict();
export const CoachingSuggestionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionSumOrderByAggregateInput>;
export const CoachingSuggestionSumOrderByAggregateInputObjectZodSchema = makeSchema();
