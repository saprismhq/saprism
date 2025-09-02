import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CoachingSuggestionCountOrderByAggregateInputObjectSchema } from './CoachingSuggestionCountOrderByAggregateInput.schema';
import { CoachingSuggestionAvgOrderByAggregateInputObjectSchema } from './CoachingSuggestionAvgOrderByAggregateInput.schema';
import { CoachingSuggestionMaxOrderByAggregateInputObjectSchema } from './CoachingSuggestionMaxOrderByAggregateInput.schema';
import { CoachingSuggestionMinOrderByAggregateInputObjectSchema } from './CoachingSuggestionMinOrderByAggregateInput.schema';
import { CoachingSuggestionSumOrderByAggregateInputObjectSchema } from './CoachingSuggestionSumOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  isUsed: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => CoachingSuggestionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CoachingSuggestionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CoachingSuggestionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CoachingSuggestionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CoachingSuggestionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CoachingSuggestionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionOrderByWithAggregationInput>;
export const CoachingSuggestionOrderByWithAggregationInputObjectZodSchema = makeSchema();
