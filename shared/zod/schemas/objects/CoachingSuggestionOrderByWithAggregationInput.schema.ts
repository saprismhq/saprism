import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CoachingSuggestionCountOrderByAggregateInputObjectSchema } from './CoachingSuggestionCountOrderByAggregateInput.schema';
import { CoachingSuggestionAvgOrderByAggregateInputObjectSchema } from './CoachingSuggestionAvgOrderByAggregateInput.schema';
import { CoachingSuggestionMaxOrderByAggregateInputObjectSchema } from './CoachingSuggestionMaxOrderByAggregateInput.schema';
import { CoachingSuggestionMinOrderByAggregateInputObjectSchema } from './CoachingSuggestionMinOrderByAggregateInput.schema';
import { CoachingSuggestionSumOrderByAggregateInputObjectSchema } from './CoachingSuggestionSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      meetingId: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      used: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => CoachingSuggestionCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => CoachingSuggestionAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => CoachingSuggestionMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => CoachingSuggestionMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => CoachingSuggestionSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();

export const CoachingSuggestionOrderByWithAggregationInputObjectSchema = Schema;
