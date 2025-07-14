import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { NoteCountOrderByAggregateInputObjectSchema } from './NoteCountOrderByAggregateInput.schema';
import { NoteAvgOrderByAggregateInputObjectSchema } from './NoteAvgOrderByAggregateInput.schema';
import { NoteMaxOrderByAggregateInputObjectSchema } from './NoteMaxOrderByAggregateInput.schema';
import { NoteMinOrderByAggregateInputObjectSchema } from './NoteMinOrderByAggregateInput.schema';
import { NoteSumOrderByAggregateInputObjectSchema } from './NoteSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NoteOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    meetingId: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    aiAnalysis: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => NoteCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => NoteAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => NoteMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => NoteMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => NoteSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const NoteOrderByWithAggregationInputObjectSchema = Schema;
