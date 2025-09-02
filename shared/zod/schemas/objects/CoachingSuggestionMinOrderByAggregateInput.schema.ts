import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  isUsed: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const CoachingSuggestionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionMinOrderByAggregateInput>;
export const CoachingSuggestionMinOrderByAggregateInputObjectZodSchema = makeSchema();
